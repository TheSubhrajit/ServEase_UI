/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';

interface NannyPricingProps {
  onPriceChange: (priceData: { price: number, entry: any }) => void;
  onAddToCart:( data: string) => void;  // Add the onPriceChange function as a prop
  pricing : any;
}

// Sample data as per your provided table
// const priceData = [
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2000, totalPrice: 16000 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 1600, totalPrice: 12800 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2200, totalPrice: 17600 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 1800, totalPrice: 14400 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2500, totalPrice: 20000 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 2200, totalPrice: 17600 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2800, totalPrice: 22400 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 2500, totalPrice: 20000 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1500, totalPrice: 24000 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 1800, totalPrice: 28800 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1800, totalPrice: 28800 },
//   { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 2000, totalPrice: 32000 },
// ];

// const typeButtonsSelector = [
//     { key: 1, value: 'Regular' },
//     { key: 2, value: 'Premium' },
//     { key : 3 , value : 'Regular - In House (24 hours live in)'},
//     { key: 4, value: 'On demand' }
//   ];

//   const subCategoryButtonsSelector = [
//     { key: 1, value: 'Experienced (>=3 years)' },
//     { key: 2, value: 'Less Experienced ( <= 3 years)' },
//   ];

//   const childAge = [
//     {key : 1 , value : '<=2'},
//     {key : 2 , value : '2-6'}
//   ]


  const NannyPricing =({ onPriceChange , onAddToCart , pricing }: NannyPricingProps) => {
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [selectedSubCategory , setSelectedSubCategory] = useState<any>();


    const pric = pricing.reduce((acc: Record<string, any[]>, item: { Categories: string }) => {
      if (!acc[item.Categories]) {
        acc[item.Categories] = [];
      }
      acc[item.Categories].push(item);
      return acc;
    }, {});


    const getSelectedSubCategory = (selectedSubCategory) =>{
      console.log("selectedSbCategoty " , selectedSubCategory)
      if(selectedSubCategory){
      setPrice(selectedSubCategory['Price /Month (INR)'])
      } else {
        setPrice(0)
      }
    }

    
    


  useEffect(() => {
    setPrice(price); // Update price based on current state
  }, [selectedAge, selectedServiceType, selectedSubCategory]); // Recalculate when any of these change
 

    const handleAddToCart = () =>{
      onAddToCart('NannyAddedtoCart')
    }


    const handleOnChange = (data) =>{
      console.log(data)
      getSelectedSubCategory("")
      setSelectedSubCategory(data);
    }


      
      const typeButtonsSelector = [
        { key: 1, value: 'Regular' },
        { key: 2, value: 'Premium' },
        // { key: 3, value: 'On Demand' }
      ];

  return (
        
       
    <Card
    style={{
      width: '100%',
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
  // value={serviceType} // Ensure this matches a Tab's value
   // Update the state with the new value
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
      value={button.key} // Match the key from typeButtonsSelector
      label={button.value} // Display the value as the label
      // onClick={() => handleForButtonClick(button.key)}
      sx={{
        borderRight: button.key !== typeButtonsSelector[typeButtonsSelector.length - 1].key ? "1px solid #ddd" : '',
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
 <div style={{display:'flex'}}>
 <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
 <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        style={{display:'contents'}}
      >
        {Object.entries(pric).map(([key, value], index) => (
  <FormControlLabel key={index} value={key} control={<Radio />} label={key} onChange={() => handleOnChange(value)}/>
))}
      </RadioGroup>
    </FormControl>
  </Typography>
  {selectedSubCategory && 
  <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
  <FormControl>
       <FormLabel id="demo-radio-buttons-group-label">{selectedSubCategory[0]['Sub-Categories']}
       </FormLabel>
       <RadioGroup
         row
         aria-labelledby="demo-radio-buttons-group-label"
         name="radio-buttons-group"
         style={{display:'contents'}}
       >
         {selectedSubCategory.map((item , index) =>{
          return <FormControlLabel key={index} value={item['Numbers/Size']} control={<Radio />} label={item['Numbers/Size']} onChange={() => getSelectedSubCategory(item)}/>
          
         })}
       </RadioGroup>
     </FormControl>
   </Typography>
  }
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
    //onClick={onClickAddToCart}
    //disabled={selecteditem.length === 0 } // Disable button if any value is not selected
  >
    Add to Cart
  </Button>

  <Button
    type="submit"
    variant="outlined"
    style={{ float: 'right', margin: '10px' }}
    endIcon={<AddShoppingCartIcon />}
   // onClick={handleProceedToCheckout}
   // disabled={!addtoCartSelected} // Disable the button if no items are selected
  >
    Proceed to checkout
  </Button>
  
   </Grid>
</Grid>
</Card>

 
)
};

export default NannyPricing;
