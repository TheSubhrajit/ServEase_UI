import React, { useState } from 'react';
import axios from "axios";
import {
  Card,
  Typography,
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  FormLabel,
  Snackbar,
  FormControlLabel,
  Alert,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FaArrowLeft, FaCheckCircle, FaStar ,FaRegStar,FaAward, FaRupeeSign, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import './Confirmationpage.css';
import DialogComponent from '../Common/DialogComponent/DialogComponent'
import UtilityCleaning from './UtilityCleaning/UtilityCleaning';
import BathroomCleaning from './BathroomCleaning/BathroomCleaning';
import ClothDrying from './ClothDrying/ClothDrying';
import Dusting from './Dusting/Dusting';
import { PricingData } from '../../types/PricingData';
import SweepingAndMopping from './SweepingAndMopping/SweepingAndMopping';
import OtherUtilityServices from './OtherUtilityServices/OtherUtilityServices';
import SmallCart from './SmallCart/SmallCart';

interface selectedServices {
  entry: PricingData;
  price: number;
}

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

  const [formattedDate, setFormattedDate] = useState<string>("");
  const [pax , setPax] = useState('');
  const [open, setOpen] = useState(false);
 
  const [selectedValue, setSelectedValue] = useState('People');

  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const [data , setData] = useState<any>([])

  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Callback function to update the price in the parent component
  const handlePriceChange = (data: { price: number; entry: PricingData | null }) => {
  //   setSelectedItems((prevItems) => [
  //     ...prevItems,
  //     { entry: data.entry, price: data.price },
  // ]);

  // console.log(selectedItems)
  setData(data.entry)
  setCalculatedPrice(data.price)

  };

  // Handle radio button selection change
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
     console.log("selected value => ", selectedValue)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    // Prepare the data you want to send in the API request
    const requestData = {
      firstName,
      lastName,
      age,
      gender,
      languageKnown: language, 
      experience,
      profilePic,
      dietryHabit: diet,
      housekeepingRole: "COOK",
      selectedServices: selectedItems, 
      pax,
      timeSlotlist: "09:00-12:00, 18:00-20:00",
      assignedDate: new Date().toISOString(), 
      createdDate: new Date().toISOString(), 
      modifiedDate: new Date().toISOString(), 
      supervisorId: 404, 
      isPotential: "true",
      modifiedBy: 505, 
      startDate: formattedDate, 
      endDate: "2024-12-31T18:00:00.000Z", 
      noOfResources: "1", 
      days: "Monday to Saturday", 
      amount: calculatedPrice, 
      comment: "", 
      commentedBy: "Supervisor", 
      commentedOn: new Date().toISOString(), 
      pincode: 110016, 
      cookingHabit: diet, 
      serviceProviderId: 303, 
      locality: "",
      area: "",
      apartment_name: "",
    };
    
    try {
      const response = await axios.post(API_ENDPOINT, requestData);
      console.log('API Response:', response);
      if (response.status === 200 || response.status === 201) {
        setSnackbarMessage('Request successfully submitted!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setSelectedItems([]);
        setCalculatedPrice(0);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error while saving the request:', error);
      setSnackbarMessage('Error while saving the request. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  

  console.log(selectedItems)
    handleClose(); // Close the dialog after saving
  };

  const menuItems = Array.from({ length: 10 }, (_, i) => i + 1);

  const API_ENDPOINT = "http://43.205.212.94:8080/api/customer/add-customer-request";

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

  const handleChange = (event: SelectChangeEvent) =>{
        setPax(event.target.value as string)
  }

  const handleBackButtonClick = () => {
    // Implement your back navigation logic here, e.g.:
    window.history.back(); // This will take the user back to the previous page
  };
  // Map diet values to corresponding image paths
  const dietImages = {
    VEG: "veg.png",
    NONVEG: "nonveg.png",
    BOTH:"nonveg.png"
  };

  // Determine the diet image based on the diet value
  const dietImage = dietImages[diet];

  const [selected, setSelected] = useState(null);
  const [peopleSelected, setpeopleSelected] = useState(null);

  // Handle button click
  const handleButtonClick = (value , type) => {
    console.log("value ", value)
    console.log("type ", type)
    if(type === "category"){
      setSelected(value);
      setOpen(true);
    }
    else if(type === "people"){
      setpeopleSelected(value);
    }
    
  };

  const buttons = [
    { value: 'utilityCleaning', imageSrc: "../Utensil.png" },
    { value: 'washroomCleaning', imageSrc: "../bathroom.png" },
    { value: 'clothdrying', imageSrc: "../clothes.png" },
    { value: 'dusting', imageSrc: "../Dusting.png" },
    { value: 'sweepMoping', imageSrc: "../sweeping.png" },
    { value: 'others', imageSrc: "../sweeping.png" }
  ];

  const peopleButtonsSelector = [
    { key: 1 , value : '1-2'  },
    { key: 2, value: '3-4' },
    { key: 3, value: '5-6' },
    { key: 4, value: '7-9' }
  ];


  return (
    <div className="details-container">
     <div style={{width:'100%'}}> 
      <Card style={{ width: '100%'}}> 
        <div style={{display:'flex'}}>
        <Avatar
            alt={`${firstName} ${lastName}`}
            src={`/${profilePic}`}
            sx={{ width: 100, height: 100 }}
          />
          <div style={{display:'grid'}}>
          <Typography variant="h6" style={{display:'flex'}}>
    {firstName} {lastName},(F, 20{age})  
    <img
                src="nonveg.png"
                alt="Diet Symbol"
                style={{ width: '20px', height: '20px' , marginTop:'5px'}}
              />
    </Typography>
    <div>
      Languages : 
      Specialities :
    </div>
    </div>
     </div>
       </Card>
       </div>
       <div style={{display:'flex'}}> 
       <Card style={{width:"60%" , display:"flex"}}>
       <div style={{ display : "flex" , width :'100%' , marginTop:"20px"}}>
      {buttons.map((button) => (
        <button
          key={button.value}
          onClick={() => handleButtonClick(button.value , 'category')}
          style={{
            border: selected === button.value ? '3px solid blue' : '1px solid gray', // Highlight selected button
            backgroundColor: selected === button.value ? '#e0f7fa' : 'transparent', // Change background color of selected button
            padding: '10px',
            margin: '5px',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '8px',
          }}
        >
          <img
            src={button.imageSrc}
            alt={`button-${button.value}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              opacity: selected === button.value ? 0.8 : 1, // Dim image when not selected
            }}
          />
        </button>
         ))}
       </div>
       </Card>
       <Card style={{width:"40%"}}>
          <SmallCart data={selectedItems} />
       </Card>
       </div>
      <DialogComponent 
        open={open} 
        onClose={handleClose} 
        title="Modal title" 
        onSave={handleSave}
      >
       {selected === "utilityCleaning" &&  <UtilityCleaning onPriceChange={handlePriceChange}/>}
       { selected === "washroomCleaning" && <BathroomCleaning onPriceChange={handlePriceChange} />} 
       { selected === "clothdrying" && <ClothDrying onPriceChange={handlePriceChange} />} 
       { selected === "dusting" && <Dusting onPriceChange={handlePriceChange}/>}
       { selected === "sweepMoping" && <SweepingAndMopping onPriceChange={handlePriceChange} /> }
       { selected === "others" && <OtherUtilityServices onPriceChange={handlePriceChange} /> }
       
       
      </DialogComponent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
       <Alert
    onClose={handleSnackbarClose}
    severity={snackbarSeverity}
    sx={{
      width: '100%',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {snackbarMessage || 'An error occurred, please try again.'}
  </Alert>
      </Snackbar>
  </div>  
  );
};
export default Confirmationpage ;
