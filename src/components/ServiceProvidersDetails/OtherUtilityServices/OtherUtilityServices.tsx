import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingData } from '../../../types/PricingData';

interface UtilityCleaningProps {
  onPriceChange: (data: { price: number, entry: PricingData | null }) => void; // Callback to pass data to parent
}

const UtilityCleaning: React.FC<UtilityCleaningProps> = ({ onPriceChange }) => {
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null); // Frequency as string
  const [price, setPrice] = useState<number>(0);

  // Pricing data with the new services
  const pricingData: PricingData[] = [
    { serviceCategory: 'Utensil Drying & Arrangements', serviceType: 'Regular', subCategory: 'people', peopleRange: '0', frequency: 'Daily', pricePerMonth: 500 },
    { serviceCategory: 'Cloths Drying and Folding', serviceType: 'Regular', subCategory: 'people', peopleRange: '0', frequency: '3days/week', pricePerMonth: 500 },
    { serviceCategory: 'Cloths Drying and Folding', serviceType: 'Regular', subCategory: 'people', peopleRange: '0', frequency: 'Daily', pricePerMonth: 1000 },
  ];

  // Handle frequency selection
  const handleButtonClick = (value: string) => {
    setFrequency(value); // Set selected frequency
  };

  // Service type handler
  const serviceTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceType(event.target.value);
    setFrequency(null); // Reset frequency when service type changes
  };

  // Function to calculate the price and entry based on selections
  const calculatePriceAndEntry = () => {
    if (!serviceType || !frequency) return { price: 0, entry: null };

    // Find the matching pricing entry based on service type and frequency
    const entry = pricingData.find(
      (item) =>
        item.serviceCategory === serviceType &&
        item.subCategory === 'people' &&
        item.peopleRange === '0' && // Always '0' since we removed people selection
        item.frequency === frequency
    );

    console.log("enry => ", entry)
    console.log("service type => ", serviceType)
    console.log("frequency => ", frequency)

    // If entry is found, return the price and entry; otherwise, return 0 and null
    return entry ? { price: entry.pricePerMonth, entry } : { price: 0, entry: null };
  };

  // UseEffect to calculate the price and entry whenever dependencies change
  useEffect(() => {
    const { price, entry } = calculatePriceAndEntry(); // Get both price and entry
    setPrice(price); // Update price based on current state
    onPriceChange({ price, entry }); // Send both price and entry to parent
  }, [serviceType, frequency]); // Recalculate when any of these change

  return (
    <>
      <Typography gutterBottom>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Service Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={serviceTypeHandler}
          >
            <FormControlLabel value="Utensil Drying & Arrangements" control={<Radio />} label="Utensil Drying & Arrangements" />
            <FormControlLabel value="Cloths Drying and Folding" control={<Radio />} label="Cloths Drying and Folding" />
          </RadioGroup>
        </FormControl>
      </Typography>

      <Typography gutterBottom>
        <FormLabel>Frequency</FormLabel>
        <div>
          {/* Display frequency options based on selected service type */}
          {serviceType === 'Utensil Drying & Arrangements' ? (
            <button
              onClick={() => handleButtonClick('Daily')}
              style={{
                border: frequency === 'Daily' ? '3px solid blue' : '1px solid gray',
                backgroundColor: frequency === 'Daily' ? '#e0f7fa' : 'transparent',
                padding: '10px',
                margin: '5px',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '8px',
              }}
            >
              Daily
            </button>
          ) : serviceType === 'Cloths Drying and Folding' ? (
            <>
              <button
                onClick={() => handleButtonClick('Daily')}
                style={{
                  border: frequency === 'Daily' ? '3px solid blue' : '1px solid gray',
                  backgroundColor: frequency === 'Daily' ? '#e0f7fa' : 'transparent',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  outline: 'none',
                  borderRadius: '8px',
                }}
              >
                Daily
              </button>
              <button
                onClick={() => handleButtonClick('3days/week')}
                style={{
                  border: frequency === '3days/week' ? '3px solid blue' : '1px solid gray',
                  backgroundColor: frequency === '3days/week' ? '#e0f7fa' : 'transparent',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  outline: 'none',
                  borderRadius: '8px',
                }}
              >
                3 days / week
              </button>
            </>
          ) : null}
        </div>
      </Typography>

      <Typography gutterBottom>Price: ₹{price} /month</Typography>
    </>
  );
};

export default UtilityCleaning;
