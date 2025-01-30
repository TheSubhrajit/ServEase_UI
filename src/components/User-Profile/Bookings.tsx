
import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import axiosInstance from '../../services/axiosInstance';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { RootState } from '../../store/userStore';  // Adjust according to your folder structure
type UserState = {
  value?: {
    role?: string;
    customerDetails?: {
      customerId: number;
      firstName: string;
      lastName: string;
      // Add any other fields if necessary
    };
  } | null;
};
interface Booking {
  id: number;
  name: string;
  role:string;
  timeSlot: string;
  date: string;
}
const currentBookings: Booking[] = [
  { id: 1, name: 'John Doe', role: 'Maid', timeSlot: '10:00 AM - 11:00 AM', date: '2024-12-28' },
  { id: 2, name: 'Jane Smith', role: 'Nanny', timeSlot: '12:00 PM - 1:00 PM', date: '2024-12-30' },
];

const futureBookings: Booking[] = [
  { id: 1, name: 'Charlie Green', role: 'Nanny', timeSlot: '9:00 AM - 10:00 AM', date: '2025-01-05' },
  { id: 2, name: 'Diana Prince', role: 'Cook', timeSlot: '3:00 PM - 4:00 PM', date: '2025-01-10' },
];
 

const Booking: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]); // State for past bookings
 // Get user data from Redux store
 const user = useSelector((state: RootState) => state.user as UserState);

 // Fetch customer ID safely
 const customerId = user?.value?.customerDetails?.customerId ?? null;  // Use optional chaining to handle null or undefined

 console.log("Booking user name is:", user);
 console.log("Customer ID is:", customerId); // Log the customer ID

 useEffect(() => {
  if (customerId !== null) { // Ensure customerId is valid
    // Fetch past bookings data from the backend using axiosInstance
    axiosInstance
      .get('http://localhost:8080/api/customer/get-booking-history')
      .then((response) => {
        // Filter the booking data where customerId matches
        const filteredBookings = response.data.past.filter((item: any) => item.customerId === customerId);
        
        const pastData = filteredBookings.map((item: any) => ({
          id: item.requestId,
          name: item.customerId.toString(), // Or you can map it to a customer name if available
          role: item.housekeepingRole,
          timeSlot: item.timeSlotlist,
          date: new Date(item.startDate).toLocaleDateString(),
        }));

        setPastBookings(pastData); // Set the filtered data into state
      })
      .catch((error) => {
        console.error('Error fetching booking history:', error);
      });
  }
}, [customerId]); // Run again if customerId changes

const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  setSelectedTab(newValue);
};

  const renderBookings = (bookings: Booking[]) => (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      {bookings.map((booking) => (
        <Card key={booking.id} elevation={3} sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {booking.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Role: {booking.role}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Time Slot: {booking.timeSlot}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {booking.date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 800 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          My Bookings
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Current Bookings" />
          <Tab label="Past Bookings" />
          <Tab label="Future Bookings" />
        </Tabs>
        <Box sx={{ marginTop: 2 }}>
          {selectedTab === 0 && renderBookings(currentBookings)}
          {selectedTab === 1 && renderBookings(pastBookings)} {/* Displaying fetched past bookings */}
          {selectedTab === 2 && renderBookings(futureBookings)}
        </Box>
      </Paper>
    </Box>
  );
};

export default Booking;