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
  const { name, age, category, service, language, address, distance, rating, ratingsCount, availability, profilePic } = props;

  return (
    <div className="content-box"> {/* Wrapper div */}
      <Card className="service-card">
        <div className="avatar-section"> {/* Section for avatar */}
          <Avatar
            alt={service}
            src={`/${profilePic}`}
            className="service-avatar"
          />
        </div>

        <div className="service-details"> {/* Section for service details */}
          <Typography variant="h6">Name: {name}</Typography>
          <Typography>Male, {age} yrs</Typography>
          <Typography>Category: {category}</Typography>
          <Typography>Service: {service}</Typography>
          <Typography>Language: {language}</Typography>
          <Typography>Address: {address}</Typography>
        </div>

        <div className="service-ratings"> {/* Section for ratings and availability */}
          <Typography variant="body1">Good</Typography>
          <div className="ratings">
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" style={{ marginLeft: "8px" }}>
              {rating}
            </Typography>
          </div>
          <Typography variant="body2">{ratingsCount} Ratings</Typography>
          <Typography variant="body2" className="availability">Availability: {availability}</Typography>
          <div className="location">
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              {distance} km from your location
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

function App() {
  const services = [
    {
      name: 'John Doe',
      age: 24,
      category: 'A',
      service: 'Cook',
      language: 'Kannada',
      address: 'U496, Surface Studio, JP Nagar, Bengaluru-560078',
      distance: 4.2,
      rating: 4.0,
      ratingsCount: 272,
      availability: '8.00 AM',
      profilePic: 'babysitter.png',
    },
    {
      name: 'Jane Smith',
      age: 26,
      category: 'A',
      service: 'Cook',
      language: 'Kannada',
      address: 'C606, Purba Belmont, JP Nagar, Bengaluru-560078',
      distance: 3.7,
      rating: 4.2,
      ratingsCount: 860,
      availability: '8.00 AM',
      profilePic: 'babysitter.png',
    },
  ];

  return (
    <div>
      {services.map((service, index) => (
        <ServiceProvidersDetails key={index} {...service} />
      ))}
    </div>
  );
}

export default App;
