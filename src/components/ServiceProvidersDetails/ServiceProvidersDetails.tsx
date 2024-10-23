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
  const { firstName, lastName, housekeepingRole, gender, language, currentLocation, distance, rating, ratingsCount, availability, profilePic } = props;
  // Function to determine rating description based on score

  // const getRatingDescription = (rating) => {
  //   if (rating >= 4.5) return "Excellent";
  //   if (rating >= 3.5) return "Very Good";
  //   if (rating >= 2.5) return "Good";
  //   if (rating >= 1.5) return "Fair";
  //   return "Poor";
  // };
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
        {/* <Typography> {housekeepingRole}</Typography> */}
          <Typography variant="h6"> Name: {firstName} {lastName}, {gender}</Typography>
          <Typography >Speciality: South Indian, Bangali, Maharastrian, Non Veg </Typography>
          <Typography >Language: English, Kannada {language} </Typography>
          {/* <Typography>Current Location: {currentLocation}</Typography> */}
        </div>

        {/* <div className="service-ratings"> 
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
        </div> */}
      </Card>
    </div>
  );
};

export default ServiceProvidersDetails;