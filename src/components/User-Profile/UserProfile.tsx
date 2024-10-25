import React from 'react';
import "./UserProfile.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UserProfile: React.FC = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', mt: 4 }} className='accordion'>
      {/* Basic Information Accordion */}
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="basic-info-content"
          id="basic-info-header"
        >
          <Typography>Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails >
        <div className='topic'>
        <Typography>First Name: Subhrajit</Typography>
        <Typography>Last Name: Dutta</Typography>
        <Typography>Gender : Male</Typography>
        <Typography>Email I'd: subhrajitd2001@gmail.com</Typography>
        <Typography>Password : Subhrajit@1234</Typography>
        <Typography>Phone No.: 6250456969</Typography>
        </div>
        </AccordionDetails>
      </Accordion>

      {/* Location/Address Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="location-address-content"
          id="location-address-header"
        >
          <Typography>Location/Address</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='topic'>
        
            <Typography>Address : Haripara, Nagarukhra</Typography>
            <Typography>City : Nadia</Typography>
            <Typography>State : West Bengal</Typography>
            <Typography>Zip/Postal Code : 741257</Typography>
            
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Additional Details Accordion */}
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="additional-details-content"
          id="additional-details-header"
        >
          <Typography >Additional Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='topic'>
        <Typography>Hobbies : Photography</Typography>
        <Typography>Language : English, Bengali, Hindi </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default UserProfile;
