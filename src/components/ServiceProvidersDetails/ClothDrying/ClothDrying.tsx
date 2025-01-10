/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PricingData } from "../../../types/PricingData";

interface UtilityCleaningProps {
    onPriceChange: (data: { price: number, entry: PricingData | null }) => void; // Callback function passed as a prop
}


const ClothDrying: React.FC<UtilityCleaningProps> = ({ onPriceChange }) => {
    const [frequency, setFrequency] = useState<string | null>(null); // Store as string to match pricingData
    const [price, setPrice] = useState<number>(0);
    const [jobDescription, setJobDescription] = useState<string>('');

    // Frequency options as strings
    const frequencyButtonsSelector = [
        { key: '3 day / week', value: '3 day / week' },
        { key: 'Daily', value: 'Daily' },
    ];

    // Pricing data with frequency as string
    const pricingData: PricingData[] = [
        { serviceCategory:"Cloth Drying" , type:"Maid",serviceType: 'Regular', subCategory: 'people', frequency: '3 day / week', pricePerMonth: 500, jobDescription: 'Househelp will get clothes from drying place and make proper arrangements in shelf' },
        { serviceCategory:"Cloth Drying" , type:"Maid",serviceType: 'Regular', subCategory: 'people', frequency: 'Daily', pricePerMonth: 1000, jobDescription: 'Househelp will get clothes from drying place and make proper arrangements in shelf' },
    ];

    const handleButtonClick = (value: string) => {
        setFrequency(value); // Directly set the frequency as string
    };

    const calculatePrice = () => {
        const entry = pricingData.find(
            (item) => item.frequency === frequency // Compare with string frequency
        );

        if (entry) {
            // Safely update the job description, defaulting to an empty string if it's undefined
            setJobDescription(entry.jobDescription ?? 'No description available');
            return entry;
        }
        return null; // Return null if no matching entry is found
    };

    useEffect(() => {
        if (frequency) {
            const entry = calculatePrice(); // Get entry and price
            if (entry) {
                setPrice(entry.pricePerMonth);
                setJobDescription(entry.jobDescription ?? 'No description available');
                onPriceChange({ price: entry.pricePerMonth, entry }); // Send both price and entry to parent
            } else {
                setPrice(0);
                setJobDescription('No description available');
                onPriceChange({ price: 0, entry: null }); // Send null entry and 0 price if no match
            }
        }
    }, [frequency, onPriceChange]);

    return (
        <>
            <Typography gutterBottom>
                Frequency:
                {frequencyButtonsSelector.map((button) => (
                    <button
                        key={button.key}
                        onClick={() => handleButtonClick(button.key)} // Set frequency to the string value
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

            <Typography gutterBottom>Price: ₹{price} /month</Typography>
            <Typography gutterBottom>Job Description: {jobDescription}</Typography>
        </>
    );
};

export default ClothDrying;
