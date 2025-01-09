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

const ProviderDetails = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [morningSelection, setMorningSelection] = useState(null); // Track the selected morning time slot
  const [eveningSelection, setEveningSelection] = useState(null);
  const [eveningSelectionTime, setEveningSelectionTime] = useState(null); // Track the selected evening time slot
  const [morningSelectionTime, setMorningSelectionTime] = useState(null);
  const [loggedInUser , setLoggedInUser ] = useState();
  const [open, setOpen] = useState(false);

  const dietImages = {
    VEG: "veg.png",
    NONVEG: "nonveg.png",
    BOTH: "nonveg.png",
  };

  const dispatch = useDispatch();
  const bookingType = useSelector((state : any) => state.bookingType?.value)

  // Handle selection for morning or evening availability
  const handleSelection = (hour, isEvening , time) => {
    if (isEvening) {
      setEveningSelection(hour);
      setEveningSelectionTime(time) // Set the selected evening time slot
    } else {
      setMorningSelection(hour);
      setMorningSelectionTime(time) // Set the selected morning time slot
    }
  };

  // Toggle expanded content
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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

              {/* Morning and Evening Availability */}
              <div className="availability-section">
                <div className="availability-header">
                  <Typography variant="subtitle1" className="section-title">
                    Morning Availability (6 AM - 12 PM)
                  </Typography>

                  {/* Morning Availability Buttons */}
                  <div className="time-slot-container">
                    {[6, 7, 8, 9, 10, 11].map((hour, index) => (
                      <button
                        key={index}
                        className={`availability-button ${morningSelection === index ? "selected" : ""}`}
                        onClick={() => handleSelection(index, false, hour)}
                      >
                        {`${hour}:00`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="availability-header">
                  <Typography variant="subtitle1" className="section-title">
                    Evening Availability (12 PM - 8 PM)
                  </Typography>

                  {/* Evening Availability Buttons */}
                  <div className="time-slot-container">
                    {[12, 1, 2, 3, 4, 5, 6, 7].map((hour, index) => (
                      <button
                        key={index}
                        className={`availability-button ${eveningSelection === index ? "selected" : ""}`}
                        onClick={() => handleSelection(index, true, hour)}
                      >
                        {`${hour}:00`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
