/* eslint-disable react/jsx-pascal-case */
// import React from 'react';
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
// import axios from "axios";
import axiosInstance from '../../services/axiosInstance';
import EditProvider from "./EditProvider";

// interface ChildComponentProps {
//     sendDataToParent: (data: string) => void;
//   }
  
const ServiceProviderDashboard:React.FC = (data) => {
  // const navigate = useNavigate();

  const [serviceProvider, setServiceProvider] = useState({
    firstName: "",
    lastName: "",
    age: "",
    housekeepingRole: "",
    cookingSpeciality: "",
    diet: "",
  });


  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/serviceproviders/get/serviceprovider/2"
        );
        const { firstName, lastName, age, housekeepingRole, cookingSpeciality, diet } = response.data;
        setServiceProvider({ firstName, lastName, age, housekeepingRole, cookingSpeciality, diet });
      } catch (error) {
        console.error("Error fetching service provider details:", error);
      }
    };

    fetchServiceProvider();
  }, []);
  
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  

  return isEditing ? (
    <EditProvider goBack={() => setIsEditing(false)} />
  ) : (
    // Dashboard content...
  
    <>
      <div className="flex p-4 gap-5">
        <h3>{`${serviceProvider.firstName} ${serviceProvider.lastName}`}</h3>
        <h6>{`${serviceProvider.age}, ${serviceProvider.cookingSpeciality}, ${serviceProvider.diet}`}</h6>
        <h6>{`${serviceProvider.housekeepingRole}`}</h6>
        <Button type="submit" variant="contained" onClick={handleEditClick}>
       
          Edit
        </Button>
      </div>

      <Box sx={{ padding: 7, backgroundColor: "#f5f7fa" }}>
        <Grid container spacing={3}>
          {[
            { title: "House's Worked", value: "3", bgColor: "#4DB6AC" },
            { title: "Working Building Name", value: "Laxmi Apartment", bgColor: "#7986CB" },
            { title: "Working Address", value: "Kolkata, Near Maidan", bgColor: "#FFD54F" },
            { title: "Working Time", value: "10 a.m - 6 p.m", bgColor: "#81C784" },
            { title: "Pending Bookings", value: "2", bgColor: "#E57373" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ backgroundColor: item.bgColor, color: "#fff" }} elevation={5}>
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ padding: 7, backgroundColor: "#f5f7fa" }}>
        <Grid container spacing={3}>
          {[
            { title: "Daily Earnings", value: "1,000", growth: "+9%", color: "#4CAF50" },
            { title: "Monthly Earnings", value: "3,000", growth: "+9%", color: "#29B6F6" },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={5} sx={{ borderLeft: `6px solid ${item.color}` }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                  <Typography variant="subtitle2" color={item.color}>
                    {item.growth} last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="pt-12">
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Cashout
          </Button>
        </div>
      </Box>
    </>
  );
};
 
export default ServiceProviderDashboard;