import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCart';

// Sample data as per your provided table
const priceData = [
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2000, totalPrice: 16000 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 1600, totalPrice: 12800 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2200, totalPrice: 17600 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 1800, totalPrice: 14400 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2500, totalPrice: 20000 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 2200, totalPrice: 17600 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2800, totalPrice: 22400 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 2500, totalPrice: 20000 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1500, totalPrice: 24000 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 1800, totalPrice: 28800 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1800, totalPrice: 28800 },
  { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 2000, totalPrice: 32000 },
];

const typeButtonsSelector = [
    { key: 1, value: 'Regular' },
    { key: 2, value: 'Premium' },
    { key : 3 , value : 'Regular - In House (24 hours live in)'},
    { key: 4, value: 'On demand' }
  ];

  const subCategoryButtonsSelector = [
    { key: 1, value: 'Experienced (>=3 years)' },
    { key: 2, value: 'Less Experienced ( <= 3 years)' },
  ];

  const childAge = [
    {key : 1 , value : '<=2'},
    {key : 2 , value : '2-6'}
  ]


const NannyPricing = () => {
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [price, setPrice] = useState<number>(0);


  const calculatePriceAndEntry = () => {
    if (!selectedAge || !selectedServiceType || !selectedSubCategory) return { price: 0, entry: null };

    const entry = priceData.find(
      (item) =>
        item.serviceType === selectedServiceType &&
        item.subCategory === selectedSubCategory &&
        item.age === selectedAge
    );

    // If entry is found, return the price and entry; otherwise, return 0 and null
    return entry ? { price: entry.totalPrice, entry } : { price: 0, entry: null };
  };

  useEffect(() => {
    const { price, entry } = calculatePriceAndEntry(); // Get both price and entry
    setPrice(price); // Update price based on current state
    // onPriceChange({ price, entry }) // Send both price and entry to parent
  }, [selectedAge, selectedServiceType, selectedSubCategory]); // Recalculate when any of these change
 

    function handleButtonClick(value: string, arg1: string): void {
        if(arg1 === "serviceType"){
            setSelectedServiceType(value)
        }
        if( arg1 === "subC"){
            setSelectedSubCategory(value)
        }
        if(arg1 === "age"){
            setSelectedAge(value)
        }
        if(selectedServiceType === "Regular - In House (24 hours live in)"){
            setSelectedSubCategory('')
        }
        
    }

    const priceData = [
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2000, totalPrice: 16000 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 1600, totalPrice: 12800 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2200, totalPrice: 17600 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 1800, totalPrice: 14400 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '<=2', pricePerHour: 2500, totalPrice: 20000 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '<=2', pricePerHour: 2200, totalPrice: 17600 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Experienced (>=3 years)', age: '2-6', pricePerHour: 2800, totalPrice: 22400 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium', subCategory: 'Less Experienced ( <= 3 years)', age: '2-6', pricePerHour: 2500, totalPrice: 20000 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1500, totalPrice: 24000 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Regular - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 1800, totalPrice: 28800 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '<=2', pricePerHour: 1800, totalPrice: 28800 },
        { serviceCategory: 'Nanny/Baby care', serviceType: 'Premium - In House (24 hours live in)', subCategory: '', age: '2-6', pricePerHour: 2000, totalPrice: 32000 },
      ];
      
      const typeButtonsSelector = [
          { key: 1, value: 'Regular' },
          { key: 2, value: 'Premium' },
          { key : 3 , value : 'Regular - In House (24 hours live in)'}
        ];
      
        const subCategoryButtonsSelector = [
          { key: 1, value: 'Experienced (>=3 years)' },
          { key: 2, value: 'Less Experienced ( <= 3 years)' },
        ];
      
        const childAge = [
          {key : 1 , value : '<=2'},
          {key : 2 , value : '2-6'}
        ]

  return (
    <div style={{width:'100%' , display:'grid'}}>
      <Typography gutterBottom>
        Service Type :
        {typeButtonsSelector.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'serviceType')}
            style={{
              border: selectedServiceType === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: selectedServiceType === button.value ? '#e0f7fa' : 'transparent',
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

      {selectedServiceType !== "Regular - In House (24 hours live in)" &&  <Typography gutterBottom>
        Experience : 
        {subCategoryButtonsSelector.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'subC')}
            style={{
              border: selectedSubCategory === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: selectedSubCategory === button.value ? '#e0f7fa' : 'transparent',
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
      }

<Typography gutterBottom>
        Child age :
        {childAge.map((button) => (
          <button
            key={button.key}
            onClick={() => handleButtonClick(button.value, 'age')}
            style={{
              border: selectedAge === button.value ? '3px solid blue' : '1px solid gray',
              backgroundColor: selectedAge === button.value ? '#e0f7fa' : 'transparent',
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
      <Typography gutterBottom>Price: ₹{price}</Typography>

      <Button type="submit" variant="outlined" style={{float :'right',margin:'10px'}} endIcon={<AddShoppingCartIcon  />} > Add to cart </Button>
    </div>
  );
};

export default NannyPricing;
