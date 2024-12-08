import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingData } from '../../../types/PricingData';

interface UtilityCleaningProps {
    onPriceChange: (data: { price: number, entry: PricingData | null }) => void; // Callback function passed as a prop
}

const BathroomCleaning: React.FC<UtilityCleaningProps> = ({ onPriceChange }) => {
    const [washRoomCount, setWashRoomCount] = useState<number>(0);
    const [frequency, setFrequency] = useState<number | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [jobDescription, setJobDescription] = useState<string>(''); // Job description to display

    // Button selectors
    const bathCountButtonsSelector = [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
    ];

    const frequencyButtonsSelector = [
        { key: 1, value: '1 day / week' },
        { key: 2, value: '2 day / week' },
    ];

    // Pricing data with job descriptions
    const pricingData: PricingData[] = [
        { serviceType: 'Regular', subCategory: 'number', size: 1, frequency: 1, pricePerMonth: 400, jobDescription: 'Weekly cleaning of bathroom' },
        { serviceType: 'Regular', subCategory: 'number', size: 1, frequency: 2, pricePerMonth: 600, jobDescription: '2 days in a week cleaning of bathroom' },
        { serviceType: 'Regular', subCategory: 'number', size: 2, frequency: 1, pricePerMonth: 600, jobDescription: '2 bathrooms of weekly cleaning' },
        { serviceType: 'Regular', subCategory: 'number', size: 2, frequency: 2, pricePerMonth: 1000, jobDescription: '2 bathrooms of weekly cleaning' },
        
        { serviceType: 'Premium', subCategory: 'number', size: 1, frequency: 1, pricePerMonth: 600, jobDescription: 'Premium cleaning of bathroom weekly' },
        { serviceType: 'Premium', subCategory: 'number', size: 1, frequency: 2, pricePerMonth: 800, jobDescription: 'Premium cleaning of bathroom 2 days/week' },
        { serviceType: 'Premium', subCategory: 'number', size: 2, frequency: 1, pricePerMonth: 800, jobDescription: '2 bathrooms premium weekly cleaning' },
    ];

    // Handle button clicks for washroom count and frequency
    const handleButtonClick = (value: number, id: string) => {
        if (id === 'washRoom') {
            setWashRoomCount(value);
        } else {
            setFrequency(value);
        }
    };

    // Calculate price and update job description
    const calculatePrice = () => {
        const entry = pricingData.find(
            (item) =>
                item.size === washRoomCount &&
                item.frequency === frequency
        );

        if (entry) {
            setJobDescription(entry.jobDescription ?? ''); // Set job description based on selection
            return entry.pricePerMonth; // Return the corresponding price
        }

        setJobDescription(''); // Clear job description if no match
        return 0; // Return 0 if no matching entry is found
    };

    // Whenever washRoomCount or frequency changes, update the price and send to parent
    useEffect(() => {
        if (washRoomCount && frequency) {
            const calculatedPrice = calculatePrice();
            setPrice(calculatedPrice);

            // Directly pass both price and entry to the parent
            const entry = pricingData.find(
                (item) => item.size === washRoomCount && item.frequency === frequency
            );
            onPriceChange({ price: calculatedPrice, entry: entry || null }); // Send price and entry to parent
        }
    }, [washRoomCount, frequency, onPriceChange]); // Recalculate whenever these values change

    return (
        <>
            <Typography gutterBottom>
                No. of Washrooms:
                {bathCountButtonsSelector.map((button) => (
                    <button
                        key={button.key}
                        onClick={() => handleButtonClick(button.value, 'washRoom')}
                        style={{
                            border: washRoomCount === button.value ? '3px solid blue' : '1px solid gray',
                            backgroundColor: washRoomCount === button.value ? '#e0f7fa' : 'transparent',
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
                Frequency:
                {frequencyButtonsSelector.map((button) => (
                    <button
                        key={button.key}
                        onClick={() => handleButtonClick(button.key, 'frequency')}
                        style={{
                            border: frequency === button.key ? '3px solid blue' : '1px solid gray',
                            backgroundColor: frequency === button.key ? '#e0f7fa' : 'transparent',
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
            <Typography gutterBottom>Job Description: {jobDescription}</Typography>
        </>
    );
};

export default BathroomCleaning;
