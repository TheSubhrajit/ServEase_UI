import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingData } from '../../../types/PricingData';

interface UtilityCleaningProps {
    onPriceChange: (data: { price: number, entry: PricingData | null }) => void; // Callback function passed as a prop
}

const BathroomCleaning: React.FC<UtilityCleaningProps> = ({ onPriceChange }) => {
    const [washRoomCount, setWashRoomCount] = useState<number>(0);
    const [frequency, setFrequency] = useState<number | string | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [jobDescription, setJobDescription] = useState<string>(''); // Job description to display
    const [washRoomType, setWashRoomType] = useState<string>(''); // Type of cleaning (Normal or Deep)

    // Button selectors for washroom count, frequency, and type
    const bathCountButtonsSelector = [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
    ];

    const bathTypeButtonsSelector = [
        { key: "bathroom", value: "Normal cleaning" },
        { key: "bathroom_deep_cleaning", value: "Deep cleaning" },
    ];

    const frequencyButtonsSelector = [
        { key: 1, value: '1 day / week' },
        { key: 2, value: '2 day / week' },
    ];

    const deepCleanFrequency = [{ key: '1', value: 'Daily' }];

    // Pricing data with job descriptions
    const pricingData: PricingData[] = [
        { serviceCategory: 'bathroom', serviceType: 'Regular', subCategory: 'number', size: 1, frequency: "1 day / week", pricePerMonth: 400, jobDescription: 'Weekly cleaning of bathroom' },
        { serviceCategory: 'bathroom', serviceType: 'Regular', subCategory: 'number', size: 1, frequency: "2 day / week", pricePerMonth: 600, jobDescription: '2 days in a week cleaning of bathroom' },
        { serviceCategory: 'bathroom', serviceType: 'Regular', subCategory: 'number', size: 2, frequency: "1 day / week", pricePerMonth: 600, jobDescription: '2 bathrooms of weekly cleaning' },
        { serviceCategory: 'bathroom', serviceType: 'Regular', subCategory: 'number', size: 2, frequency: "2 day / week", pricePerMonth: 1000, jobDescription: '2 bathrooms of weekly cleaning' },
        { serviceCategory: 'bathroom', serviceType: 'Premium', subCategory: 'number', size: 1, frequency: "1 day / week", pricePerMonth: 600, jobDescription: 'Premium cleaning of bathroom weekly' },
        { serviceCategory: 'bathroom', serviceType: 'Premium', subCategory: 'number', size: 1, frequency: "2 day / week", pricePerMonth: 800, jobDescription: 'Premium cleaning of bathroom 2 days/week' },
        { serviceCategory: 'bathroom', serviceType: 'Premium', subCategory: 'number', size: 2, frequency: "1 day / week", pricePerMonth: 800, jobDescription: '2 bathrooms premium weekly cleaning' },
        { serviceCategory: 'bathroom', serviceType: 'Premium', subCategory: 'number', size: 2, frequency: "1 day / week", pricePerMonth: 800, jobDescription: '2 bathrooms premium weekly cleaning' },
        { serviceCategory: 'bathroom_deep_cleaning', serviceType: 'Regular', subCategory: 'number', size: 0, frequency: 'Daily', pricePerMonth: 600, jobDescription: 'Weekly cleaning of bathroom + All bathroom walls cleaning' },
    ];

    // Handle button clicks for washroom count, frequency, and type
    const handleButtonClick = (value: number | string, category: string) => {
        if (category === 'washRoom') {
            setWashRoomCount(value as number);
        } else if (category === 'frequency') {
            setFrequency(value as number | string);
        } else if (category === 'type') {
            setWashRoomType(value as string);
            setFrequency(""); // Reset frequency when changing type
            setWashRoomCount(1); // Reset to default washroom count
            setPrice(0); // Reset price
        }
    };

    // Calculate price and update job description based on selected values
    const calculatePrice = () => {
        let filteredPricingData: PricingData[] = [];

        if (washRoomType === 'Normal cleaning') {
            filteredPricingData = pricingData.filter(
                (item) =>
                    item.size === washRoomCount && item.frequency === frequency && item.serviceCategory === 'bathroom'
            );
        } else if (washRoomType === 'Deep cleaning') {
            filteredPricingData = pricingData.filter(
                (item) =>
                    item.size === 0 &&
                    item.serviceCategory === 'bathroom_deep_cleaning' &&
                    item.frequency === 'Daily' // Deep cleaning is always daily in this case
            );
        }

        const matchedEntry = filteredPricingData[0];
        if (matchedEntry) {
            setJobDescription(matchedEntry.jobDescription || '');
            return matchedEntry.pricePerMonth;
        }

        setJobDescription('');
        return 0;
    };

    // Whenever washRoomCount, frequency, or washRoomType changes, update the price and pass data to the parent
    useEffect(() => {
        if (washRoomCount && frequency && washRoomType) {
            const calculatedPrice = calculatePrice();
            setPrice(calculatedPrice);

            // Find the matched entry based on the current state values
            const entry = pricingData.find(
                (item) =>
                    item.size === washRoomCount &&
                    item.frequency === frequency &&
                    item.serviceCategory === washRoomType
            );

            // Ensure that we're passing the right data to the parent
            if (entry) {
                onPriceChange({ price: calculatedPrice, entry });
            } else {
                onPriceChange({ price: 0, entry: null });
            }
        }
    }, [washRoomCount, frequency, washRoomType, onPriceChange]);

    // Helper to render buttons with selected styles
    const renderButton = (buttons: any[], selectedValue: any, category: string) => {
        return buttons.map((button) => (
            <button
                key={button.key}
                onClick={() => handleButtonClick(button.value, category)}
                style={{
                    border: selectedValue === button.value ? '3px solid blue' : '1px solid gray',
                    backgroundColor: selectedValue === button.value ? '#e0f7fa' : 'transparent',
                    padding: '10px',
                    margin: '5px',
                    cursor: 'pointer',
                    outline: 'none',
                    borderRadius: '8px',
                }}
            >
                {button.value}
            </button>
        ));
    };

    return (
        <>
            <Typography gutterBottom>
                Type:
                {renderButton(bathTypeButtonsSelector, washRoomType, 'type')}
            </Typography>

            {washRoomType === 'Normal cleaning' && (
                <>
                    <Typography gutterBottom>
                        No. of Washrooms:
                        {renderButton(bathCountButtonsSelector, washRoomCount, 'washRoom')}
                    </Typography>

                    <Typography gutterBottom>
                        Frequency:
                        {renderButton(frequencyButtonsSelector, frequency, 'frequency')}
                    </Typography>
                </>
            )}

            {washRoomType === 'Deep cleaning' && (
                <>
                    <Typography gutterBottom>
                        Frequency:
                        {renderButton(deepCleanFrequency, frequency, 'frequency')}
                    </Typography>
                </>
            )}

            <Typography gutterBottom>Price: ₹{price}</Typography>
            <Typography gutterBottom>Job Description: {jobDescription}</Typography>
        </>
    );
};

export default BathroomCleaning;
