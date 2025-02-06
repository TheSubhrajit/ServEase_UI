/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import "./ProviderDetails.css"; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Bookingtype } from "../../types/bookingTypeData";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../features/bookingType/bookingTypeSlice";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Login from "../Login/Login";
import axiosInstance from "../../services/axiosInstance";

const ProviderDetails = (props) => {
const [isExpanded, setIsExpanded] = useState(false);
  const [eveningSelection, setEveningSelection] = useState<number | null>(null);
  const [morningSelection, setMorningSelection] = useState<number | null>(null);
  const [eveningSelectionTime, setEveningSelectionTime] = useState<string | null>(null);
  const [morningSelectionTime, setMorningSelectionTime] = useState<string | null>(null);
  const [loggedInUser , setLoggedInUser ] = useState();
  const [open, setOpen] = useState(false);
  const [engagementData, setEngagementData] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [missingTimeSlots, setMissingTimeSlots] = useState<string[]>([]);

  const dietImages = {
    VEG: "veg.png",
    NONVEG: "nonveg.png",
    BOTH: "nonveg.png",
  };

  const dispatch = useDispatch();
  const bookingType = useSelector((state : any) => state.bookingType?.value)

  // Handle selection for morning or evening availability
  const handleSelection = (hour: number, isEvening: boolean, time: number) => {
    // Format the time without seconds, only hour and minute (e.g., "07:00")
    const startTime = moment({ hour: time }).format("HH:mm");
    const endTime = moment({ hour: time + 1 }).format("HH:mm");
  
    const formattedTime = `${startTime}-${endTime}`;
    console.log(`Start Time: ${startTime}, End Time: ${endTime}`);
    if (isEvening) {
      setEveningSelection(hour);
      setEveningSelectionTime(formattedTime); // e.g., "07:00-08:00"
    } else {
      setMorningSelection(hour);
      setMorningSelectionTime(formattedTime); // e.g., "07:00-08:00"
    }
  };
  

  // Toggle expanded content
const toggleExpand = async () => {
  setIsExpanded(!isExpanded);
  // const serviceProviderId = 2;
  if (!isExpanded) {
    try {
      console.log('Service Provider Details:', props);
      console.log('Service serviceproviderId:', props.serviceproviderId);
      const response = await axiosInstance.get(`/api/serviceproviders/get/engagement/by/serviceProvider/${props.serviceproviderId}`);
      const timeSlots = response.data.flatMap((engagement) => engagement.availableTimeSlots); // Assuming the response contains the available time slots
      setAvailableTimeSlots(timeSlots);

      // List of all expected time slots (formatted as "HH:mm")
      const expectedTimeSlots = [
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
      ];

      // Find missing time slots
      const missingTimeSlots = expectedTimeSlots.filter(slot => !timeSlots.includes(slot));

      // Log the missing time slots
      if (missingTimeSlots.length > 0) {
        console.log("Missing time slots:", missingTimeSlots);
      } else {
        console.log("All expected time slots are available.");
      }

      // Store missing time slots in state (if you want to use them to disable buttons)
      setMissingTimeSlots(missingTimeSlots);

    } catch (error) {
      console.error("Error fetching engagement data:", error);
    }
  }
};


  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return ""; // Handle cases where dob is not provided
    const age = moment().diff(moment(dob), "years"); // Get the age in years
    return age;
  };

  const handleBookNow = () => {
    const booking: Bookingtype = {
        eveningSelection : eveningSelectionTime,
        morningSelection : morningSelectionTime,
        ...bookingType
    }
    dispatch(add(booking)) 

    const providerDetails = {
      ...props, // Spread the provider details from props
      selectedMorningTime: morningSelection,
      selectedEveningTime: eveningSelection
    };
    props.selectedProvider(providerDetails); // Send selected provider back to parent
  };

  const handleLogin = () =>{
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const dietImage = dietImages[props.diet];

  // Enable the Book Now button if any time is selected
  const isBookNowEnabled = (morningSelection !== null || eveningSelection !== null) && loggedInUser;

  const user = useSelector((state : any) => state.user?.value);

  useEffect(() => {
   
      if(user?.role=== 'CUSTOMER'){
        setLoggedInUser(user);
      }
    }, [user]);

    const handleBookingPage = (e : string | undefined) =>{
      setOpen(false)
    }



  return (
    <><Paper elevation={3}>
      <div className="container-provider">
        {/* This button toggles expansion and collapse */}
        <Button
          variant="outlined" // Ensures outlined style is applied
          className="expand-toggle"
          onClick={toggleExpand}
          sx={{ border: '1px solid #1976d2', color: '#1976d2', padding: '8px', fontSize: '24px', position: 'absolute', top: 10, right: 10 }} // Override if necessary
        >
          {isExpanded ? <RemoveIcon /> : <AddIcon />}
        </Button>

        <div className={`content ${isExpanded ? "expanded" : ""}`}>
          <div className="essentials">
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                marginBottom: "0.5px",
                marginTop: "0.5px",
                display: "flex", // Using flexbox to align items horizontally
                alignItems: "center", // Vertically align items in the center
              }}
            >
              {/* Name */}
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {props.firstName} {props.middleName} {props.lastName}
              </span>

              {/* Gender and Age */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginLeft: "8px", // Adding space between name and other details
                }}
              >
                ({props.gender === "FEMALE" ? "F " : props.gender === "MALE" ? "M " : "O"}
                {calculateAge(props.dob)})
              </span>

              {/* Diet Image */}
              <span style={{ display: "inline-block", marginLeft: "8px" }}>
                <img
                  src={dietImage}
                  alt={props.diet}
                  style={{
                    width: "20px",
                    height: "20px",
                    verticalAlign: "middle", // Keeps the image aligned with the text
                  }} />
              </span>
            </Typography>
          </div>

          {/* Conditionally render extra content if expanded */}
          {isExpanded && (
            <div>
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold", marginBottom: "2px" }}
              >
                Language:{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {props.language || "English"}
                </span>
              </Typography>

              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold", marginBottom: "2px" }}
              >
                Experience:{" "}
                <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {props.experience || "1 year"}
                </span>
                , Other Services:{" "}
                <span style={{ fontWeight: "normal", fontSize: "1.2rem", marginLeft: "8px" }}>
                  {props.otherServices || "N/A"}
                </span>
              </Typography>

              <div className="availability-section">
  <div className="availability-header">
    <Typography variant="subtitle1" className="section-title">
      Morning Availability (6 AM - 12 PM)
    </Typography>

    {/* Morning Availability Buttons */}
    <div className="time-slot-container">
      {[6, 7, 8, 9, 10, 11].map((hour, index) => {
        const timeRange = `${hour}:00-${hour + 1}:00`; // Format time as "6:00-7:00"
        
        // Ensure missing time slots and button time are in the same format (both "6:00")
        const isDisabled = missingTimeSlots.some(
          (missingSlot) => missingSlot === `${hour.toString().padStart(2, '0')}:00`
        );

        return (
          <div key={index}>
            <button
              className={`availability-button ${morningSelection === index ? "selected" : ""}`}
              onClick={() => handleSelection(index, false, hour)}
              disabled={isDisabled}
              style={{
                backgroundColor: isDisabled ? '#bdbdbd' : '', // Disabled color
                cursor: isDisabled ? 'not-allowed' : 'pointer', // Disable pointer when disabled
                opacity: isDisabled ? 0.6 : 1, // Lower opacity when disabled
              }}
            >
              {timeRange} {/* Display time slot in range format */}
            </button>
          </div>
        );
      })}
    </div>
  </div>

  <div className="availability-header">
    <Typography variant="subtitle1" className="section-title">
      Evening Availability (12 PM - 8 PM)
    </Typography>

    {/* Evening Availability Buttons */}
    <div className="time-slot-container">
      {[12, 13, 14, 15, 16, 17, 18, 19].map((hour, index) => {
        // Ensure missing time slots and button time are in the same format (both "12:00")
        const isDisabled = missingTimeSlots.some(
          (missingSlot) => missingSlot === `${hour.toString().padStart(2, '0')}:00`
        );

        return (
          <div key={index}>
            <button
              className={`availability-button ${eveningSelection === index ? "selected" : ""}`}
              onClick={() => handleSelection(index, true, hour)}
              disabled={isDisabled}
              style={{
                backgroundColor: isDisabled ? '#bdbdbd' : '', // Disabled color
                cursor: isDisabled ? 'not-allowed' : 'pointer', // Disable pointer when disabled
                opacity: isDisabled ? 0.6 : 1, // Lower opacity when disabled
              }}
            >
              {`${hour}:00-${hour + 1}:00`} {/* Display time slot in range format */}
            </button>
          </div>
        );
      })}
    </div>
  </div>
</div>

{/* <div className="missing-time-slots">
  <Typography variant="subtitle1" className="section-title">
    Missing Time Slots (Unavailable)
  </Typography>

  <div className="time-slot-container">
    {missingTimeSlots.map((missingSlot, index) => (
      <div key={index}>
        <button
          className="missing-time-button"
          disabled // Disable these buttons by default
          style={{
            backgroundColor: '#bdbdbd',
            color: '#888',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'not-allowed',
            fontSize: '16px',
            display: 'inline-block',
            textAlign: 'center',
            margin: '10px 0',
          }}
        >
          {missingSlot}
        </button>
      </div>
    ))}
  </div>
</div> */}

              <div style={{ float: 'right', display: 'flex' }}>
                {!loggedInUser && <Button onClick={handleLogin} variant="outlined">Login</Button>}
                <Tooltip
                  style={{ display: isBookNowEnabled ? 'none' : 'block' }}
                  title="You need to login and select your timings to continue booking"
                >
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Button onClick={handleBookNow} disabled={!isBookNowEnabled} variant="outlined">Book Now</Button>
              </div>

            </div>
          )}
        </div>

        {/* Book Now button */}
        {/* { isBookNowEnabled && } */}

        {/* {isBookNowEnabled && (
      <Button
        variant="contained"
        color="primary"
        className="book-now-button"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          padding: '10px 20px',
          fontSize: '16px',
          display: 'flex',
        }}
        onClick={handleBookNow}
      >
        Book Now
      </Button>
    )} */}
        {/* <Button disabled={!isBookNowEnabled} variant="outlined">Book Now</Button> */}
      </div>
    </Paper>
    <Dialog 
    style={{padding:'0px'}}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <DialogContent>
        <Login bookingPage={handleBookingPage}/>
        </DialogContent>
      </Dialog></>
  );
};

export default ProviderDetails;
