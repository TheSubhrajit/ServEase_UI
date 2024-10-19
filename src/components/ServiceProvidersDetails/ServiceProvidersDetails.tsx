import React, { useEffect } from "react";
import { 
  Card, 
  Typography, 
  Avatar, 
  Rating 
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import './serviceCard.css';

const ServiceProvidersDetails = (props: any) => {
  const { firstName, lastName, category, housekeepingRole, gender, currentLocation, distance, rating, ratingsCount, availability, profilePic } = props;
  // Function to determine rating description based on score

  const getRatingDescription = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Very Good";
    if (rating >= 2.5) return "Good";
    if (rating >= 1.5) return "Fair";
    return "Poor";
  };
  return (
    <div className="content-box"> {/* Wrapper div */}
      <Card className="service-card">
        <div className="avatar-section"> {/* Section for avatar */}
          <Avatar
            alt={housekeepingRole}
            src={`/${profilePic}`}
            className="service-avatar"
          />
        </div>

        <div className="service-details"> {/* Section for service details */}
          <Typography variant="h6">First Name: {firstName}</Typography>
          <Typography variant="h6">Last Name: {lastName}</Typography>
          <Typography>Gender: {gender}</Typography>
          <Typography>Category: {category}</Typography>
          <Typography>Housekeeping Role: {housekeepingRole}</Typography>
          <Typography>Current Location: {currentLocation}</Typography>
        </div>

        <div className="service-ratings"> 
          <div className="rating-summary">
            <Typography variant="body1" className="rating-description">
              {getRatingDescription(rating)} 
            </Typography>
            <span className="rating-score">4</span>
          </div>

          <div className="ratings">
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" className="rating-count">
              ({ratingsCount} Ratings)
            </Typography>
          </div>

          <Typography variant="body2" className="availability">
            Availability: Available {availability}
          </Typography>

          <div className="location">
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              {distance}2 km from your location
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

// function App() {
//   const services = [
//     {
//       name: 'John Doe',
//       age: 24,
//       category: 'A',
//       service: 'Cook',
//       language: 'Kannada',
//       address: 'U496, Surface Studio, JP Nagar, Bengaluru-560078',
//       distance: 4.2,
//       rating: 4.0,
//       ratingsCount: 272,
//       availability: '8.00 AM',
//       profilePic: 'babysitter.png',
//     },
//     {
//       name: 'Jane Smith',
//       age: 26,
//       category: 'A',
//       service: 'Cook',
//       language: 'Kannada',
//       address: 'C606, Purba Belmont, JP Nagar, Bengaluru-560078',
//       distance: 3.7,
//       rating: 4.2,
//       ratingsCount: 860,
//       availability: '8.00 AM',
//       profilePic: 'babysitter.png',
//     },
//   ];

//   return (
//     <div>
//       {services.map((service, index) => (
//         <ServiceProvidersDetails key={index} {...service} />
//       ))}
//     </div>
//   );
// }

// export default App;
export default ServiceProvidersDetails;
