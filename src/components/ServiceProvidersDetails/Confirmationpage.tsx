import React, { useState } from 'react';
import axios from "axios";
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
    diet,
    onBack, // Accept onBack as a prop
  } = props;

  const [formattedDate, setFormattedDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_ENDPOINT = "http://localhost:8080/api/customer/add-customer-request";

  const formatDate = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const handleDateChange = (e) => {
    const newFormattedDate = formatDate(e.target.value);
    setFormattedDate(newFormattedDate);
  };

  const handleBooking = async () => {
    const payload = {
      customerId: 123,
      housekeepingRole: "COOK",
      timeSlotlist: time || "09:00 AM - 12:00 PM",
      gender,
      languageKnown: language,
      ageRange: `${age}-${age + 10}`,
      locality: "Kengeri",
      area: "Bengaluru",
      apartment_name: "Your Apartment Name",
      pincode: 56712,
      cookingHabit: diet,
      dietryHabit: diet,
      serviceProviderId: 456,
      assignedDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      isResolved: "false",
      supervisorId: 789,
      isPotential: "true",
      modifiedBy: 123,
      startDate: formattedDate,
      endDate: formattedDate,
      noOfResources: "1",
      days: "Mon-Fri",
      amount: 3000,
    };

    setLoading(true);
    setError(null); // Reset error state before making the API call

    try {
      const response = await axios.post(API_ENDPOINT, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        alert("Booking successful!");
      } else {
        throw new Error(`Booking failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      
    } finally {
      setLoading(false);
    }
  };
  // Map diet values to corresponding image paths
  const dietImages = {
    VEG: "veg.png",
    NONVEG: "nonveg.png",
    BOTH:"nonveg.png"
  };

  // Determine the diet image based on the diet value
  const dietImage = dietImages[diet];


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
        <Typography
  variant="subtitle1"
  style={{ fontWeight: 'bold', marginBottom: '0.5px', marginTop: '0.5px' }}
>
  {/* Name:  */}
  <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
    {firstName} {lastName}
  </span>, 
  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '4px' }}>
    ({gender === 'FEMALE' ? 'F' : gender === 'MALE' ? 'M' : 'O'}, 20 ),
    <span style={{ display: 'inline-block', marginLeft: '5px' }}>
      <img
        src={dietImage}
        alt={diet}
        style={{
          width: '20px',
          height: '20px',
          verticalAlign: 'middle', // Keeps the image aligned with the text
        }}
      />
    </span>
   
  </span>
</Typography>
    <Typography>Language:  <span style={{ fontWeight: 'normal', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
              {language || 'English'}
           
            </span>
    </Typography>
    <Typography>Experience: {experience || "1 year"}</Typography>
    <div className="other-details">
      {/* <Typography variant="subtitle1"><strong>Other Details</strong></Typography> */}
      <Typography><strong>Price:</strong> ₹3000 per month</Typography>
      <Typography><strong>Cuisine:</strong> South Indian, Maharashtrian, Punjabi, Bengali</Typography>
    </div>
  </div>

   {/* Booking Section */}
   <div className="booking-section">
   <div className="line-divider"></div>
    <Typography variant="h6">*Booking Date & Time</Typography>
    <div className="date-time-container">

      <div 
       className="date-display" 
       onClick={() => {
         const datePicker = document.querySelector('.date-picker') as HTMLInputElement | null;
         datePicker?.showPicker(); 
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
    <div className="price-info">
    <Typography variant="h6" className="price">₹ 3000</Typography>
    <Typography className="taxes">+ ₹502 taxes & fees</Typography>
  </div>
    <div className="action">
    {/* <Typography variant="h6" className="price">₹ 3000</Typography>
    <Typography className="taxes">+ ₹502 taxes & fees</Typography> */}
  <Button variant="contained" className="apply-coupon">Apply Coupon</Button>
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
  <div className="divider"></div>
  <div className="discount-info">
    <FaRegStar className="star-icon" />
    <Typography variant="body2" className="earn-text"><b>earn 10% ServEase cash</b></Typography>
  </div>
  <div className="action-buttons">
    <div className="heart-circle">
      <FaRegHeart className="heart-icon" />
    </div>
    <Button variant="contained" className="book-now">Book Now</Button>
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
     

      {/* 4th Section: Book Now */}
  </div>  
  );
};
export default Confirmationpage ;
