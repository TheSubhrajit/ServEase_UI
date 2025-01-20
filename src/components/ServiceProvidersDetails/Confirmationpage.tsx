import React, { useContext, useEffect, useState } from 'react';
import moment from "moment";
import {
  Card,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
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
    
    { value: 'utilityCleaning', imageSrc: "../Utensil.png" , text:"Utensil cleaning"},
    { value: 'sweepMoping', imageSrc: "../sweeping.png" ,text:"Sweeping and mopping" },
    { value: 'washroomCleaning', imageSrc: "../bathroom.png" , text:"Washroom cleaning" },
    { value: 'clothdrying', imageSrc: "../clothes.png" , text:"Cloth drying" },
    { value: 'dusting', imageSrc: "../Dusting.png" ,text:"Dusting"  },
    { value: 'others', imageSrc: "../sweeping.png" , text:"Other services" }
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

      {buttons.map((button) => (
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
         ))}

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
       

       {/* <Button type="submit" variant="outlined" style={{float :'right', margin:'10px'}} endIcon={<AddShoppingCartIcon  />} onClick={handleProceedToCheckout}> Proceed to checkout </Button> */}
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


      <DialogComponent 
        open={open} 
        onClose={handleClose} 
        title={getModelTitle()} 
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
  );
};
export default Confirmationpage ;
