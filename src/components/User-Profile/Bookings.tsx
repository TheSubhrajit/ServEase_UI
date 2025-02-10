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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/userStore';

type UserState = {
  value?: {
    role?: string;
    customerDetails?: {
      customerId: number;
      firstName: string;
      lastName: string;
    };
  } | null;
};

interface Booking {
  id: number;
  name: string;
  role: string;
  timeSlot: string;
  date: string;
}

const Booking: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [futureBookings, setFutureBookings] = useState<Booking[]>([]);

  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.user as UserState);
  const customerId = user?.value?.customerDetails?.customerId ?? null;

  console.log('Booking user details:', user);
  console.log('Customer ID:', customerId);

  useEffect(() => {
    if (customerId !== null) {
      axiosInstance
        .get(`http://43.205.212.94:8080/api/serviceproviders/get-sp-booking-history`)
        .then((response) => {
          const { past = [], current = [], future = [] } = response.data || {};

          // Ensure data is an array before filtering
          const mapBookingData = (data: any[]) =>
            Array.isArray(data)
              ? data
                  .filter((item) => item.customerId === customerId) // Filter for this customer
                  .map((item) => ({
                    id: item.requestId,
                    name: item.customerId.toString(),
                    role: item.housekeepingRole,
                    timeSlot: item.timeSlotlist,
                    date: new Date(item.startDate).toLocaleDateString(),
                  }))
              : [];

          setPastBookings(mapBookingData(past));
          setCurrentBookings(mapBookingData(current));
          setFutureBookings(mapBookingData(future));
        })
        .catch((error) => {
          console.error('Error fetching booking details:', error);
        });
    }
  }, [customerId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderBookings = (bookings: Booking[]) => (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
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
        ))
      ) : (
        <Typography textAlign="center" color="textSecondary">
          No bookings found.
        </Typography>
      )}
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
          {selectedTab === 1 && renderBookings(pastBookings)}
          {selectedTab === 2 && renderBookings(futureBookings)}
        </Box>
      </Paper>
    </Box>
  );
};

export default Booking;
