import React, { useState } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { FaArrowLeft, FaCheckCircle, FaStar ,FaRegStar,FaAward, FaRupeeSign, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import './Confirmationpage.css';

const  Confirmationpage= (props) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    language,
    experience,
    profilePic,
    onBack, // Accept onBack as a prop
  } = props;

  const [formattedDate, setFormattedDate] = useState<string>("");

  const formatDate = (inputDate: string) => {
    if (!inputDate) return "";
    const date = new Date(inputDate + "T00:00:00");
    if (Number.isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `Form ${day} ${month}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormattedDate = formatDate(e.target.value);
    setFormattedDate(newFormattedDate);
  };

  const handleBackButtonClick = () => {
    // Implement your back navigation logic here, e.g.:
    window.history.back(); // This will take the user back to the previous page
  };


  return (
    <div className="details-container">
        {/* Back Button at the top */}
        <button className="back-button" onClick={onBack}> {/* Call onBack on click */}
        <span>&#8592;</span> Back
      </button>

      {/* 1st Section: Profile and Info */}
      <Card className="profile-card"
      sx={{ 
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}
    >
        <div className="avatar-section">
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={`/${profilePic}`}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div className="info-section">
    <Typography variant="h6">
    Name: {firstName} {lastName},(F, 20{age})
    </Typography>
    <Typography>Language:  <span style={{ fontWeight: 'normal', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
              {language || 'English'}
              <img
                src="nonveg.png"
                alt="Diet Symbol"
                style={{ width: '20px', height: '20px', marginLeft: '5px' }}
              />
            </span>
    </Typography>
    <Typography>Experience: {experience || "1 year"}</Typography>
    <div className="other-details">
      <Typography variant="subtitle1"><strong>Other Details</strong></Typography>
      <Typography><strong>Price:</strong> ₹3000 per month</Typography>
      <Typography><strong>Cuisine:</strong> South Indian, Maharashtrian, Punjabi, Bengali</Typography>
    </div>
  </div>
  <div className="rating-section">
    <Typography variant="h6">
      VeryGood <span className="rating">4.0</span>
    </Typography>
    <div className="stars">
      {Array(4).fill(<FaStar />)}
      <FaStar style={{ color: 'lightgray' }} />
    </div>
    <Typography variant="body2">(272 Ratings)</Typography>
    <br /> <br />
    <div className="location">
      <FaMapMarkerAlt /> Kengeri, Bengaluru-56712 <br />
      (1.6 km from your location)
    </div>
  </div>
</Card>

     {/* 2nd Section: Why Book? */}
<Card className="why-book-card">
  <Typography variant="h6"><b>Why do you book this service?</b></Typography>
  <div className="benefit">
    <FaCheckCircle style={{ color: 'black', fontSize: '24px' }} />
    <div className="benefit-text">
      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Verified Professional</Typography>
      <Typography variant="body2">Identity of all the service providers verified</Typography>
    </div>
  </div>
  <div className="benefit">
    <FaAward style={{ color: 'black', fontSize: '24px' }} />
    <div className="benefit-text">
      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>100% Quality Service</Typography>
      <Typography variant="body2">Trusted by 4312 customers</Typography>
    </div>
  </div>
  <div className="benefit">
    <FaRupeeSign style={{ color: 'black', fontSize: '24px' }} />
    <div className="benefit-text">
      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Transparent Pricing</Typography>
      <Typography variant="body2">No hidden T&C</Typography>
    </div>
  </div>
</Card>

      {/* 3rd Section: Booking Date and Time */}
      {/* <Card className="booking-card">
        <Typography variant="h6">Booking Date & Time</Typography>
        <div className="date-time-container">
    <input type="date" className="date-picker" />
    <input type="time" className="time-picker" />
  </div>
      </Card> */}
       <Card className="booking-card">
  <Typography variant="h6">Booking Date & Time</Typography>
  
  <div className="date-time-container">
  <div 
  className="date-display" 
  onClick={() => {
    const datePicker = document.querySelector('.date-picker') as HTMLInputElement | null;
    datePicker?.showPicker(); // Safely call showPicker if it exists
  }}
>
  <AiOutlineCalendar style={{ marginRight: '8px' }} />
  <span>{formattedDate || "Select Date"}</span>
</div>
    <input 
      type="date" 
      className="date-picker" 
      onChange={handleDateChange} 
      style={{ display: 'none' }} 
    />

<div className="time-display">
      <input type="time" className="time-picker" />
    </div>
  </div>
</Card>

      {/* 4th Section: Book Now */}
      <Card className="book-now-card">
  <div className="price-info">
    <Typography variant="h6" className="price">₹ 3000</Typography>
    <Typography className="taxes">+ ₹502 taxes & fees</Typography>
  </div>
  
  <div className="discount-info">
    <FaRegStar className="star-icon" />
    <Typography variant="body2" className="earn-text"><b>earn 10% ServEase cash</b></Typography>
  </div>
  
  <div className="action-buttons">
    <Button variant="contained" className="apply-coupon">Apply Coupon</Button>
    <div className="heart-circle">
      <FaRegHeart className="heart-icon" />
    </div>
    <Button variant="contained" color="error" className="book-now">Book Now</Button>
  </div>
</Card>
  </div>  
  );
};
export default Confirmationpage ;
