import React from "react";
import {
  Card,
  Typography,
  Avatar,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Correct import for ExpandMoreIcon
import './serviceCard.css';
import { Description } from "@mui/icons-material";

const ServiceProvidersDetails = (props) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    language,
    diet,
    experience,
    otherServices,
    currentLocation,
    distance,
    rating,
    ratingsCount,
    availability,
    profilePic
  } = props;

  return (
    <div className="content-box" > {/* Wrapper div */}
      <Card className="service-card"
       style={{
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}>
        <div className="avatar-section"> {/* Section for avatar */}
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={`/${profilePic}`}
            className="service-avatar"
          />
        </div>

        <div className="service-details"> {/* Section for service details */}
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '0.5px', marginTop: '0.5px' }}>
    Name: 
    <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>
      {firstName} {lastName}
    </span>, 
    <span style={{ fontWeight: 'normal', fontSize: '1.2rem', marginLeft: '4px' }}>
      (M,20)
    </span>
  </Typography>

  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
  Language: 
  <span style={{ fontWeight: 'normal', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
    {language || 'English'}
    <img 
      src="nonveg.png" 
      alt="Vegetarian Diet Symbol" 
      style={{ width: '20px', height: '20px', marginLeft: '5px' }} 
    />
  </span>
</Typography>


  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
    Experience: 
    <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>
      {experience || '1 year'}
    </span>, 
    Other Services: 
    <span style={{ fontWeight: 'normal', fontSize: '1.2rem', marginLeft: '8px' }}>
      {otherServices}
    </span>
  </Typography>

  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
    Description: 
    <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>
      Detailed description of the service provider goes here.
    </span>
  </Typography>


            {/* Accordion for Description */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             
              Detailed description of the service provider goes here.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* Accordion for Other Details */}
{/*  
        <Accordion className="accordion-sky">
  <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
    <Typography variant="subtitle2" style={{ fontWeight: 'normal' }}>
      Other Details
    </Typography>
  </AccordionSummary>
  <AccordionDetails className="accordion-details">
    <Typography>
      Any other relevant details about the service provider can be added here.
    </Typography>
  </AccordionDetails>
</Accordion> */}

        </div>

        {/* Ratings Section (if you decide to include it later) */}
        <div className="service-ratings">
          <div className="rating-summary">
            <Typography variant="body1" className="rating-description">
              {rating >= 4.5 ? "Excellent" : rating >= 3.5 ? "Very Good" : rating >= 2.5 ? "Good" : rating >= 1.5 ? "Fair" : "Poor"}
            </Typography>
            <span className="rating-score">{rating}</span>
          </div>

          <div className="ratings">
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" className="rating-count">
              ({ratingsCount} Ratings)
            </Typography>
          </div>

          <Typography variant="body2" className="availability">
            Availability: {availability}
          </Typography>

          <div className="location">
            {/* <LocationOnIcon fontSize="small" /> */}
          </div>
        </div>

        {/* Add a space or margin to separate the details from the accordions */}
        

      
      </Card>
    </div>
  );
};

export default ServiceProvidersDetails;