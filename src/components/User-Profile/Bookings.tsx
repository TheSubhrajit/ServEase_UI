
import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

interface Booking {
  id: number;
  name: string;
  age: number;
  timeSlot: string;
  date: string;
}

const currentBookings: Booking[] = [
  { id: 1, name: 'John Doe', age: 30, timeSlot: '10:00 AM - 11:00 AM', date: '2024-12-28' },
  { id: 2, name: 'Jane Smith', age: 25, timeSlot: '12:00 PM - 1:00 PM', date: '2024-12-30' },
];

const pastBookings: Booking[] = [
  { id: 1, name: 'Alice Brown', age: 40, timeSlot: '2:00 PM - 3:00 PM', date: '2024-10-15' },
  { id: 2, name: 'Bob Johnson', age: 35, timeSlot: '4:00 PM - 5:00 PM', date: '2024-11-01' },
];

const futureBookings: Booking[] = [
  { id: 1, name: 'Charlie Green', age: 28, timeSlot: '9:00 AM - 10:00 AM', date: '2025-01-05' },
  { id: 2, name: 'Diana Prince', age: 32, timeSlot: '3:00 PM - 4:00 PM', date: '2025-01-10' },
];

const Booking: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

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
              Age: {booking.age}
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
          {selectedTab === 1 && renderBookings(pastBookings)}
          {selectedTab === 2 && renderBookings(futureBookings)}
        </Box>
      </Paper>
    </Box>
  );
};

export default Booking;
