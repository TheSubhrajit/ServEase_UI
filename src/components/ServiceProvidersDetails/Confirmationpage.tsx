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
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../features/cart/cartSlice';
import { CHECKOUT } from '../../Constants/pagesConstants';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from '@mui/icons-material/Category';
import MaidServices from './MaidServices/MaidServices';


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
   const pricing = useSelector((state : any) => state.pricing?.groupedServices)
  // Callback function to update the price in the parent component
  const handlePriceChange = (data) => {
  // setData(data.entry)
  // setCalculatedPrice(data.price)

  console.log("Updated Data ===> ",data)

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

  const handleSave = (data) => {
    console.log("On Add to cart ===> ", data)
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
       {/* {role === "maid" && <Card style={{width:"100%%" , display:"flex"}}>
 </Card>} */}
       {role === "nanny" && <Card style={{width:"100%" , display:"flex"}}>
        <NannyPricing onPriceChange={handlePriceChange} onAddToCart={handleSave} />
       </Card>} 
       {role === "cook" && <Card style={{width:"100%" , display:"flex"}}>
        <CookPricing sendToParent={sendDataToParent} onPriceChange={handlePriceChange} onAddToCart={handleSave} pricing={pricing['Cook']}/>
       </Card>}
       {role === "maid" && <Card style={{width:"100%" , display:"flex"}}>
        <MaidServices sendToParent={sendDataToParent} onPriceChange={handlePriceChange} onAddToCart={handleSave} pricing={pricing['Maid']}/>
       </Card>} 
       
       {/* <Card style={{width:"40%"}}>
          <SmallCart data={selectedItems} />
       </Card> */}
       </div>
          
       {/* sendToParent={sendDataToParent} onPriceChange={handlePriceChange} onAddToCart={handleSave} pricing={pricing['Cook']} */}

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
