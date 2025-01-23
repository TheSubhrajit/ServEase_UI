/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';

interface CookPricingProps {
  onPriceChange: (priceData: { price: number, entry: any }) => void; 
  onAddToCart:(data:string) => void; // Add the onPriceChange function as a prop
}

const CookPricing = ({ onPriceChange , onAddToCart }: CookPricingProps) => {

    const mealData = [
        { serviceCategory: 'Cook', type:"cook",serviceType: 'Regular', mealType: 'Breakfast', people: '1', price: 2000, description: 'Includes preparing of 5-8 chapatis, 1 vegetable. Sunday leave.' },
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
        // { key: 3, value: 'On Demand' }
      ];

      const mealTypeButtonsSelector = [
        { key: 1, value: 'Breakfast' },
        { key: 2, value: 'Lunch' },
        { key: 3, value: ' Dinner' },
        // { key: 4, value: 'Breakfast + Lunch/Dinner' },
        // { key: 5, value: 'Breakfast + Lunch + Dinner' }
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
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      // Optional: validate that the value is a valid number
      if (/^\d*$/.test(value)) {
        setPax(value);
      }
    };
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
        
       
        <Card
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
      <Grid container spacing={3}>
      {/* Left Section (Meal Service Info) */}
      <Grid item xs={12} md={8}>
        <Card sx={{ padding: 3, boxShadow: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            sx={{ gap: 1, marginBottom: 2 }}
          >
            {/* <RestaurantMenuIcon color="primary" /> */}
            Service Type
          </Typography>
          <Tabs
            value={serviceType}
            onChange={(event, newValue) => handleButtonClick(newValue, 'serviceType')} // Using handleButtonClick here
            textColor="primary"
            indicatorColor="primary"
            aria-label="service type tabs"
            sx={{
              backgroundColor: "#f1f1f1",
              borderRadius: "5px 5px 0 0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              marginBottom: 3,
            }}
          >
            {typeButtonsSelector.map((button) => (
              <Tab
                key={button.key}
                value={button.value}
                label={button.value}
                sx={{
                  borderRight: button.key !== typeButtonsSelector.length ? "1px solid #ddd" : '',
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
            ))}
          </Tabs>
     {/* Meal Type Selection */}
     <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Meal Type
      </Typography>
      <FormGroup row sx={{ gap: 2, justifyContent: "center" }}>
        {mealTypeButtonsSelector.map((button) => (
          <FormControlLabel
            key={button.key}
            control={
              <Checkbox
                checked={mealType === button.value}
                onChange={() => handleButtonClick(button.value, 'mealType')}
                name={button.value}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "#1e88e5",
                  },
                }}
              />
            }
            label={
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "25px",
                  color: "#1e88e5",
                  borderColor: "#1e88e5",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                {button.value}
              </Button>
            }
          />
        ))}
      </FormGroup>
 {/* Pax (Number of People) Selection */}
 {/* <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        No. of persons
      </Typography>
      <FormGroup row sx={{ gap: 2, justifyContent: "center" }}>
        {peopleButtonsSelector.map((button) => (
          <FormControlLabel
            key={button.key}
            control={
              <Checkbox
                checked={pax === button.value}
                onChange={() => handleButtonClick(button.value, 'pax')}
                name={button.value}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "#1e88e5",
                  },
                }}
              />
            }
            label={
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "25px",
                  color: "#1e88e5",
                  borderColor: "#1e88e5",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                {button.value}
              </Button>
            }
          />
        ))}
      </FormGroup> */}
      
        {/* Number of Persons */}
        <div style={{ marginTop: "40px", marginBottom: "16px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        No. of persons
      </Typography>
      <FormGroup row sx={{ gap: 2, justifyContent: "center" }}>
        <TextField
          type="number"
          value={pax}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          placeholder="Enter number of persons"
          InputProps={{
            inputProps: { min: 1 },
            style: { textAlign: "center" },
          }}
          sx={{
            width: "150px",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#1e88e5",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1e88e5",
              },
            },
          }}
        />
      </FormGroup>
 
              </div>
              </Card>
              </Grid>
              
      {/* Price Card */}
      <Grid item xs={12} md={4}>
      <Card sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Total Price
        </Typography>
        <Typography variant="h4" color="green" sx={{ fontWeight: "bold" }}>
          ₹{price}/month
        </Typography>
      
      </Card>
       {/* Add to Cart Button */}
       <Button
        type="submit"
        variant="outlined"
        sx={{
          float: "right",
          margin: "10px",
          height: 50,
          textTransform: "none",
          borderRadius: "25px",
          color: "#1e88e5",
          borderColor: "#1e88e5",
          "&:hover": {
            backgroundColor: "#e3f2fd",
          },
        }}
        endIcon={<AddShoppingCartIcon />}
        onClick={onClickAddToCart}
        disabled={!serviceType || !mealType || !pax} // Disable button if any value is not selected
      >
        Add to Cart
      </Button>
      
       </Grid>
    </Grid>
    </Card>

     
    )
}


export default CookPricing;