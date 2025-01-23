import React, { useContext, useEffect, useState } from 'react';
import moment from "moment";
import {
  Card,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import './Confirmationpage.css';
import DialogComponent from '../Common/DialogComponent/DialogComponent'
import UtilityCleaning from './UtilityCleaning/UtilityCleaning';
import BathroomCleaning from './BathroomCleaning/BathroomCleaning';
import ClothDrying from './ClothDrying/ClothDrying';
import Dusting from './Dusting/Dusting';
import { PricingData } from '../../types/PricingData';
import SweepingAndMopping from './SweepingAndMopping/SweepingAndMopping';
import OtherUtilityServices from './OtherUtilityServices/OtherUtilityServices';
import NannyPricing from './NannyService/NannyPricing/NannyPricing';
import CookPricing from './CookService/CookPricing/CookPricing';
import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { add } from '../../features/cart/cartSlice';
import { CHECKOUT } from '../../Constants/pagesConstants';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from '@mui/icons-material/Category';


interface ChildComponentProps {
  providerDetails: any;
  role : any;
  sendDataToParent : (data : any) => void;
}

// interface ConfirmationpageProps {
//   role: string | undefined;
//   providerDetails: string | undefined;
// }

const  Confirmationpage: React.FC<ChildComponentProps> = ({ providerDetails , role , sendDataToParent }) => {

  const mealData = [
    { serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast', people: '1-2', price: 2000, description: 'Includes preparing of 5-8 chapatis, 1 vegetable. Sunday leave.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Lunch/Dinner', people: '1-2', price: 3000, description: 'Includes preparing of 5-8 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{serviceCategory: 'Cook', type:"cook", serviceType: 'Regular', mealType: 'Lunch + Dinner', people: '1-2', price: 5000, description: 'Includes preparing of 5-8 chapatis, 1 dry vegetable, 1 gravy, Rice (2x).' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Lunch', people: '1-2', price: 4000, description: 'Breakfast + lunch' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Dinner', people: '1-2', price: 4000, description: 'Breakfast + dinner' },
{serviceCategory: 'Cook', type:"cook", serviceType: 'Regular', mealType: 'Breakfast + Lunch + Dinner', people: '1-2', price: 6000, description: 'Breakfast + lunch + dinner' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast', people: '3-5', price: 2000, description: 'Includes preparing of 8-12 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Lunch/Dinner', people: '3-5', price: 3500, description: 'Includes preparing of 8-12 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Lunch + Dinner', people: '3-5', price: 5500, description: 'Includes preparing of 8-12 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Lunch', people: '3-5', price: 4500, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Dinner', people: '3-5', price: 4500, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Lunch + Dinner', people: '3-5', price: 6500, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast', people: '6-9', price: 2500, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Lunch/Dinner', people: '6-9', price: 4000, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Lunch + Dinner', people: '6-9', price: 6000, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Lunch', people: '6-9', price: 5000, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Dinner', people: '6-9', price: 5000, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast + Lunch + Dinner', people: '6-9', price: 7000, description: 'Includes preparing of 12-20 chapatis, 1 dry vegetable, 1 gravy, Rice.' },

// Premium services (1-2 years)
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast', people: '1-2', price: 2400, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch/Dinner', people: '1-2', price: 3600, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch + Dinner', people: '1-2', price: 6000, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Lunch', people: '1-2', price: 4800, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Dinner', people: '1-2', price: 4800, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Lunch + Dinner', people: '1-2', price: 7200, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast', people: '3-5', price: 2400, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch/Dinner', people: '3-5', price: 4200, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch + Dinner', people: '3-5', price: 6600, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Lunch', people: '3-5', price: 5400, description: 'Regular + Well trained + experienced + company owned staffs.' },
{serviceCategory: 'Cook', type:"cook", serviceType: 'Premium', mealType: 'Breakfast + Dinner', people: '3-5', price: 5400, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Lunch + Dinner', people: '3-5', price: 7800, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast', people: '6-9', price: 3000, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch/Dinner', people: '6-9', price: 4800, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Lunch + Dinner', people: '6-9', price: 7200, description: 'Regular + Well trained + experienced + company owned staffs.' },
{serviceCategory: 'Cook', type:"cook", serviceType: 'Premium', mealType: 'Breakfast + Lunch', people: '6-9', price: 6000, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Dinner', people: '6-9', price: 6000, description: 'Regular + Well trained + experienced + company owned staffs.' },
{ serviceCategory: 'Cook', type:"cook",serviceType: 'Premium', mealType: 'Breakfast + Lunch + Dinner', people: '6-9', price: 8400, description: 'Regular + Well trained + experienced + company owned staffs.' },
  ];
  
  // const { selectedBookingType, setSelectedBookingType } = useContext(ServiceProviderContext);
  console.log("role ==> ", role)
  console.log("providerDetails => ", providerDetails)
  // console.log("Selected Booking Type from Context:", selectedBookingType);

  const [open, setOpen] = useState(false);
 
  // const [selectedValue, setSelectedValue] = useState('People');

  const dispatch = useDispatch();

  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const [data , setData] = useState<any>([])
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
   const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  // Callback function to update the price in the parent component
  const handlePriceChange = (data: { price: number; entry: PricingData | null }) => {
  setData(data.entry)
  setCalculatedPrice(data.price)

  };

  const handleProceedToCheckout = () => {
    sendDataToParent(CHECKOUT)
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = () => {
    if (data && calculatedPrice) {
      setSelectedItems((prevItems) => {
        const updatedItems = [...prevItems, { entry: data, price: calculatedPrice }];
        dispatch(add(updatedItems));
        return updatedItems;
      });
      setSnackbarMessage("Item successfully added to cart!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Failed to add item to cart. Please select a valid service.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  
    handleClose(); // Close the dialog after saving
  };

  const [selected, setSelected] = useState(null);
  // const [peopleSelected, setpeopleSelected] = useState(null);

  // Handle button click
  const handleButtonClick = (value , type) => {
    console.log("value ", value)
    console.log("type ", type)
    if(type === "category"){
      setSelected(value);
      setOpen(true);
    }
    else if(type === "people"){
      // setpeopleSelected(value);
    }
    
  };

  const buttons = [
    { value: 'utilityCleaning', imageSrc: "/Dishes.png", text: "Utensil cleaning" },
    { value: 'sweepMoping', imageSrc: "/new.png", text: "Sweeping and mopping" },
    { value: 'washroomCleaning', imageSrc: "/wash.png", text: "Washroom cleaning" },
    { value: 'clothdrying', imageSrc: "/laundrynew.png", text: "Cloth drying" },
    { value: 'dusting', imageSrc: "/newdust.png", text: "Dusting" },
  ];

  // const peopleButtonsSelector = [
  //   { key: 1 , value : '1-2'  },
  //   { key: 2, value: '3-4' },
  //   { key: 3, value: '5-6' },
  //   { key: 4, value: '7-9' }
  // ];


  function getModelTitle(): any {
    const ModelText = buttons.find(button => button.value === selected)
    return ModelText?.text;
  }
  const calculateAge = (dob) => {
    if (!dob) return ""; // Handle cases where dob is not provided
    const age = moment().diff(moment(dob), 'years'); // Get the age in years
    return age;
  };
    const [numberOfPersons, setNumberOfPersons] = useState("");
    const [selectedMeals, setSelectedMeals] = useState({
      breakfast: false,
      lunch: false,
      dinner: false,
    });
    const [serviceType, setServiceType] = useState("Regular");
  
    const handleServiceType = (event: React.SyntheticEvent, newValue: string) => {
      setServiceType(newValue);
    };
  
    const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setSelectedMeals((prev) => ({
        ...prev,
        [name]: checked,
      }));
    };
    
  return (
    <div className="details-container">
     {providerDetails && <div style={{width:'100%'}}> 
      <Card style={{ width: '100%'}}> 
        <div style={{display:'flex',marginLeft: '20px'}}>
          <div style={{display:'grid'}}>
          <Typography  variant="h6" style={{display:'flex'}}>
    {providerDetails.firstName} {providerDetails.lastName},({providerDetails.gender === 'FEMALE' ? 'F ' : providerDetails.gender === 'MALE' ? 'M ' : 'O'} {calculateAge(providerDetails.dob)} )
    <img
                src="nonveg.png"
                alt="Diet Symbol"
                style={{ width: '20px', height: '20px' , marginTop:'5px'}}
              />
    </Typography>
    <div>
      Languages : 
      Specialities :
      role : {role}
    </div>
    </div>
     </div>
       </Card>
       </div>}
       <div style={{display:'flex'}}> 
       {role === "maid" && <Card style={{width:"100%%" , display:"flex"}}>
       <div style={{ display : "flex" , width :'100%' , marginTop:"20px"}}>

       {/* {buttons.map((button) => (
        <Tooltip title={button.text}>
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
        </Tooltip> 
         ))} */}

{/* <Button type="submit" variant="outlined" style={{float :'right', margin:'10px'}} endIcon={<AddShoppingCartIcon  />} > Add to cart </Button> */}
{/* <Button
  variant="outlined"
  style={{ float: "right", margin: "10px" }}
  endIcon={<AddShoppingCartIcon />}
  onClick={handleAddToCart}
>
  Add to cart
</Button> */}

     </div>
 </Card>}
       {role === "nanny" && <Card style={{width:"100%" , display:"flex"}}>
        <NannyPricing onPriceChange={handlePriceChange} onAddToCart={handleSave} />
       </Card>} 
       {role === "cook" && <Card style={{width:"100%" , display:"flex"}}>
        <CookPricing onPriceChange={handlePriceChange} onAddToCart={handleSave}/>
       </Card>} 
       
       {/* <Card style={{width:"40%"}}>
          <SmallCart data={selectedItems} />
       </Card> */}
       </div>
            
              <Button
  type="submit"
  variant="outlined"
  style={{ float: 'right', margin: '10px' }}
  endIcon={<AddShoppingCartIcon />}
  onClick={handleProceedToCheckout}
  disabled={selectedItems.length === 0} // Disable the button if no items are selected
>
  Proceed to checkout
</Button>
          
    {role === "maid" && (
  <Box className="container" sx={{ padding: 2, backgroundColor: "#f3f3f3", marginTop: 3 }}>
    <Card
            className="container-card"
            sx={{
              padding: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%", // Make the card fill a portion of the page
            }}
          >
            <Grid container spacing={3}>
             
              <Grid item xs={12} md={9}>
  <Card sx={{ padding: 3, boxShadow: 3 ,border: "1px solid #ddd"}}>
  <Typography>
      <Box
        sx={{
          display: "flex", // Align items horizontally
          alignItems: "right", // Vertically align
        }}
      >
        
        {/* Icon outside the tabs */}
        <CategoryIcon sx={{  color: "#1e88e5" , marginLeft: 4,fontSize: "2rem"}} />
        <Tabs
          value={serviceType}
          onChange={handleServiceType}
          textColor="primary"
          indicatorColor="primary"
          aria-label="service type tabs"
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "5px 5px 0 0",
            boxShadow: 3,
            marginBottom: 0.1,
            marginLeft: 4,
            border: "2px solid #ddd",
            borderBottom: "none",
            width: "100%",
          }}
        >
          <Tab
            value="Regular"
            label="Regular"
            sx={{
              borderRight: "1px solid #ddd",
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: "bold",
              color: "#444",
              width: "50%",
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "#1E90FF",
              },
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          />
          <Tab
            value="Premium"
            label="Premium"
            sx={{
              padding: "10px 20px",
              textTransform: "none",
              fontWeight: "bold",
              color: "#444",
              width: "50%",
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "#1E90FF",
              },
              "&:hover": {
                backgroundColor: "#ddd",
              },
            }}
          />
        </Tabs>
  </Box>

  <div
    style={{
      borderBottom: "2px solid #ddd", // Horizontal line below the tabs
      marginTop: "-2px",             // Align with the tabs
    }}
  />
  
  </Typography>
      {/* Images */}
      <Grid container spacing={0} sx={{ display: "flex", alignItems: "center" }}>
      <Grid item xs={2} sx={{ marginTop: "0.5px" }}>
     {buttons.map((button, index) => (
        
          <Tooltip title={button.text}>
            <div
           onClick={() => handleButtonClick(button.value , 'category')}
           style={{
            width: "70%",
            height: "60px",
            border: clickedIndex === index ? "2px solid skyblue" : "2px solid #ddd", // Border color change on click
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect for elevation
            backgroundColor: "#fff",
            color: "#1e88e5", // Button text color
            borderColor:  clickedIndex === index ? "2px solid skyblue" : "2px solid #ddd",
            transition: "all 0.3s ease",  // Smooth transition for color changes
          }}
          onMouseEnter={(e) => {
            if (clickedIndex !== index) {
              e.currentTarget.style.backgroundColor = "#e3f2fd";  // Hover effect (light blue background)
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";  // Elevated shadow effect on hover
            }
          }}
          onMouseLeave={(e) => {
            if (clickedIndex !== index) {
              e.currentTarget.style.backgroundColor = "#fff";  // Reset background to white
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";  // Reset shadow
            }
          }}
        >
          <img
          src={button.imageSrc}
          alt={`button-${button.value}`}
            style={{
              maxWidth: "60%",
              maxHeight: "60%",
              objectFit: "contain",
            }}
          />
         </div>
          </Tooltip>
        
      ))}
    </Grid>
          {/* Meal Selection Form */}
     <Grid item xs={10}>
     <div
      style={{
        marginBottom:"40px",
        borderRight: "2px solid #ddd",  // Black right border
        padding: "16px",                 // Optional: some padding inside the box
        borderTop: "none",               // Optional: Remove the top border if not needed
        borderLeft: "none",              // Optional: Remove the left border if not needed
      }}
    > 
        
       {selected === "utilityCleaning" &&  <UtilityCleaning onPriceChange={handlePriceChange}/>}
       { selected === "washroomCleaning" && <BathroomCleaning onPriceChange={handlePriceChange} />} 
       { selected === "clothdrying" && <ClothDrying onPriceChange={handlePriceChange} />} 
       { selected === "dusting" && <Dusting onPriceChange={handlePriceChange}/>}
       { selected === "sweepMoping" && <SweepingAndMopping onPriceChange={handlePriceChange} /> }
       { selected === "others" && <OtherUtilityServices onPriceChange={handlePriceChange} /> }
       
       
     
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: '60px' }}
      >
       <Alert
    onClose={handleSnackbarClose}
    severity={snackbarSeverity}
    variant="filled"
    sx={{
      width: '100%',
      
    }}
  >
    {snackbarMessage || 'An error occurred, please try again.'}
  </Alert>
  </Snackbar>  
  </div> 
        </Grid>
    
      </Grid>
 
      <div
    style={{
      borderBottom: "2px solid #ddd", // Horizontal line below the tabs
      marginTop: "-2px",             // Align with the tabs
      boxShadow: "4", // Shadow effect
      // boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",  
    }}
  />
  
 
  </Card>
  </Grid>
          {/* Right Section (Total Price & Checkout) */}
          <Grid item xs={12} md={3}>
            <Card sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
                Total Price
              </Typography>
              <Typography variant="h4" color="green" sx={{ fontWeight: "bold" }}>
                $180/month
              </Typography>
            </Card>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ marginY: 2, height: 50 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<PaymentIcon />}
              fullWidth
              sx={{ height: 50 }}
            >
              Proceed to Checkout
            </Button>
          </Grid>
        </Grid>
      </Card>
  </Box>
)}
       {/* <Button type="submit" variant="outlined" style={{float :'right', margin:'10px'}} endIcon={<AddShoppingCartIcon  />} onClick={handleProceedToCheckout}> Proceed to checkout </Button> */}
       {/* <Button
  type="submit"
  variant="outlined"
  style={{ float: 'right', margin: '10px' }}
  endIcon={<AddShoppingCartIcon />}
  onClick={handleProceedToCheckout}
  disabled={selectedItems.length === 0} // Disable the button if no items are selected
>
  Proceed to checkout
</Button> */}



  </div>  
  );
};
export default Confirmationpage ;
