/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonIcon from "@mui/icons-material/Person";
interface CookPricingProps {
  onPriceChange: (priceData: { price: number, entry: any }) => void; 
  onAddToCart:(data:string) => void; // Add the onPriceChange function as a prop
}

const CookPricing = ({ onPriceChange , onAddToCart }: CookPricingProps) => {

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

    const onClickAddToCart = () =>{
      onAddToCart('cookDataSaved')
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
        
      <div style={{ display: 'grid', width: '100%' }}>
      <Card sx={{ padding: 3, boxShadow: 3, marginBottom: 3, backgroundColor: '#fff' }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          sx={{ gap: 1, marginBottom: 2 }}
        >
          <RestaurantMenuIcon color="primary" />
          Service Type
        </Typography>
        <Typography gutterBottom>
          {typeButtonsSelector.map((button) => (
            <button
              key={button.key}
              onClick={() => handleButtonClick(button.value, 'serviceType')}
              style={{
                border: serviceType === button.value ? '3px solid #1E90FF' : '1px solid #ddd',
                backgroundColor: serviceType === button.value ? '#e0f7fa' : '#f1f1f1',
                padding: '10px 20px',
                margin: '0 5px',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                color: serviceType === button.value ? '#fff' : '#444',
                textTransform: 'none',
                width: 'fit-content',
                boxShadow: serviceType === button.value ? '0 2px 5px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (serviceType !== button.value) {
                  e.currentTarget.style.backgroundColor = '#ddd';
                }
              }}
              onMouseOut={(e) => {
                if (serviceType !== button.value) {
                  e.currentTarget.style.backgroundColor = '#f1f1f1';
                }
              }}
            >
              {button.value}
            </button>
          ))}
        </Typography>
    
        <Typography
          variant="h6"
          sx={{ marginBottom: 2, fontWeight: 'bold' }}
        >
          <PersonIcon color="primary" />
          Meal Type
        </Typography>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {mealTypeButtonsSelector.map((button) => (
            <button
              key={button.key}
              onClick={() => handleButtonClick(button.value, 'mealType')}
              style={{
                border: mealType === button.value ? '2px solid #1e88e5' : '1px solid #ddd',
                backgroundColor: mealType === button.value ? '#e3f2fd' : '#fff',
                color: mealType === button.value ? '#1e88e5' : '#444',
                padding: '8px 16px',
                margin: '5px',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                boxShadow: mealType === button.value ? '0 2px 5px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                fontSize: '1rem',
                width: 'fit-content',
              }}
              onMouseOver={(e) => {
                if (mealType !== button.value) {
                  e.currentTarget.style.backgroundColor = '#f1f1f1';
                }
              }}
              onMouseOut={(e) => {
                if (mealType !== button.value) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              {button.value}
            </button>
          ))}
        </div>
    
        <Typography
          variant="h6"
          sx={{ marginTop: 3, marginBottom: 2, fontWeight: 'bold' }}
        >
          <PersonIcon color="primary" />
          No. of Persons
        </Typography>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {peopleButtonsSelector.map((button) => (
            <button
              key={button.key}
              onClick={() => handleButtonClick(button.value, 'people')}
              style={{
                // border: people === button.value ? '2px solid #1e88e5' : '1px solid #ddd',
                // backgroundColor: people === button.value ? '#e3f2fd' : '#fff',
                // color: people === button.value ? '#1e88e5' : '#444',
                padding: '8px 16px',
                margin: '5px',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                // boxShadow: people === button.value ? '0 2px 5px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                fontSize: '1rem',
                width: 'fit-content',
              }}
              // onMouseOver={(e) => {
              //   if (people !== button.value) {
              //     e.currentTarget.style.backgroundColor = '#f1f1f1';
              //   }
              // }}
              // onMouseOut={(e) => {
              //   if (people !== button.value) {
              //     e.currentTarget.style.backgroundColor = '#fff';
              //   }
              // }}
            >
              {button.value}
            </button>
          ))}
        </div>
      </Card>
    </div>
    )
}


export default CookPricing;