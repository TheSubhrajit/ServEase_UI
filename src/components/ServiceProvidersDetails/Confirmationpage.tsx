import React, { useState } from 'react';
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
  FormControlLabel,
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
  const [pax , setPax] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('People');

  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  // Callback function to update the price in the parent component
  const handlePriceChange = (data: { price: number; entry: PricingData | null }) => {
    setCalculatedPrice(data.price); // Update the price
    console.log("price is parent ");
    console.log("data in entry" , data.entry)
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

  const handleSave = () => {
    // Save logic here
    console.log('Changes saved');
    handleClose(); // Close the dialog after saving
  };

  const menuItems = Array.from({ length: 10 }, (_, i) => i + 1);

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

  const handleChange = (event: SelectChangeEvent) =>{
        setPax(event.target.value as string)
  }

  const handleBackButtonClick = () => {
    // Implement your back navigation logic here, e.g.:
    window.history.back(); // This will take the user back to the previous page
  };

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
    { value: 'utilityCleaning', imageSrc: 'https://via.placeholder.com/100x100?text=Image1' },
    { value: 'washroomCleaning', imageSrc: 'https://via.placeholder.com/100x100?text=Image2' },
    { value: 'clothdrying', imageSrc: 'https://via.placeholder.com/100x100?text=Image3' },
    { value: 'dusting', imageSrc: 'https://via.placeholder.com/100x100?text=Image4' },
    { value: 'sweepMoping', imageSrc: 'https://via.placeholder.com/100x100?text=Image5' }
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
      <Typography>
        Provider Details
        </Typography>
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
       
      </DialogComponent>
  </div>  
  );
};
export default Confirmationpage ;
