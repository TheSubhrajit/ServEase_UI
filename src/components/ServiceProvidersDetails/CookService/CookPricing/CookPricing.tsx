import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';

interface CookPricingProps {
  onPriceChange: (priceData: { price: number, entry: any }) => void;  // Add the onPriceChange function as a prop
}

const CookPricing = ({ onPriceChange }: CookPricingProps) => {

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

      const [ serviceType, setServiceType ] = useState('');
      const [ mealType , setMealType ] = useState('');
      const [ pax , setPax ] = useState('');
      const [price , setPrice] = useState<number>(0)

      const typeButtonsSelector = [
        { key: 1, value: 'Regular' },
        { key: 2, value: 'Premium' },
        { key: 3, value: 'On Demand' }
      ];

      const mealTypeButtonsSelector = [
        { key: 1, value: 'Breakfast' },
        { key: 2, value: 'Lunch/Dinner' },
        { key: 3, value: 'Lunch + Dinner' },
        { key: 4, value: 'Breakfast + Lunch/Dinner' },
        { key: 5, value: 'Breakfast + Lunch + Dinner' }
      ];

      const peopleButtonsSelector = [
        { key: 1, value: '1-2' },
        { key: 2, value: '3-5' },
        { key: 3, value: '6-9' }
      ];

    function handleButtonClick(value: string, arg1: string): void {
        if(arg1 === "serviceType"){
            setServiceType(value)
        }if(arg1 === "mealType"){
            setMealType(value)
        }if(arg1 === "pax"){
            setPax(value)
        }
    }

    const calculatePriceAndEntry = () => {
        if (!serviceType || !pax || !mealType) return { price: 0, entry: null };
    
        const entry = mealData.find(
          (item) =>
            item.serviceType === serviceType &&
            item.mealType === mealType &&
            item.people === pax 
        );
    
        // If entry is found, return the price and entry; otherwise, return 0 and null
        return entry ? { price: entry.price, entry } : { price: 0, entry: null };
      };

    useEffect(() => {
        const { price, entry } = calculatePriceAndEntry(); // Get both price and entry
        setPrice(price); // Update price based on current state
        onPriceChange({ price, entry }); // Send both price and entry to parent
      }, [serviceType, pax, mealType]); // Recalculate when any of these change

    return (
        
        <div style={{display:'grid' , width:'100%'}}>
        <Typography gutterBottom>
        Service Type :
        {typeButtonsSelector.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'serviceType')}
            style={{
              border: serviceType === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: serviceType === button.value ? '#e0f7fa' : 'transparent',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '8px',
            }}
          >
            {button.value}
          </button>
        ))}
      </Typography>

      <Typography gutterBottom>
        Meal Type :
        {mealTypeButtonsSelector.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'mealType')}
            style={{
              border: mealType === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: mealType === button.value ? '#e0f7fa' : 'transparent',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '8px',
            }}
          >
            {button.value}
          </button>
        ))}
      </Typography>

      <Typography gutterBottom>
        No. of person :
        {peopleButtonsSelector.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'pax')}
            style={{
              border: pax === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: pax === button.value ? '#e0f7fa' : 'transparent',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '8px',
            }}
          >
            {button.value}
          </button>
        ))}
      </Typography>

      <Typography gutterBottom>Price: ₹{price}/month</Typography>

      <Button type="submit" variant="outlined" style={{float :'right', margin:'10px'}} endIcon={<AddShoppingCartIcon  />} > Add to cart </Button>
      </div>
    )
}


export default CookPricing;