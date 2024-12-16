import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingData } from '../../../types/PricingData';

interface SweepingAndMoppingProps {
    onPriceChange: (data: { price: number; entry: PricingData | null }) => void; // Callback function passed as a prop
}

const SweepingAndMopping: React.FC<SweepingAndMoppingProps> = ({ onPriceChange }) => {
    const [size, setSize] = useState<string>('2BHK +1 Balcony + 1 Utility');
    const [frequency, setFrequency] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [entry, setEntry] = useState<PricingData | null>(null); // Store the entire entry

    // Pricing data
    const pricingData: PricingData[] = [
        { serviceCategory:"Sweeping & Mopping" , type:"Maid", serviceType: 'Sweeping & Mopping', subCategory: 'Regular', size: '2BHK +1 Balcony + 1 Utility', frequency: 1, pricePerMonth: 1000, jobDescription: 'includes daily sweeping and mopping; includes daily sweeping & mopping of balconies/utilities and weekly deep cleaning with water' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Regular', size: '2BHK +1 Balcony + 1 Utility', frequency: 2, pricePerMonth: 1300, jobDescription: 'includes daily sweeping and mopping; includes daily sweeping & mopping of balconies/utilities and weekly deep cleaning with water' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Regular', size: '2.5 - 3 BHK +1 Balcony + 1 Utility', frequency: 1, pricePerMonth: 1200, jobDescription: 'includes daily sweeping and mopping; includes daily sweeping & mopping of balconies/utilities and weekly deep cleaning with water' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Regular', size: '2.5 - 3 BHK +1 Balcony + 1 Utility', frequency: 2, pricePerMonth: 1600, jobDescription: 'includes daily sweeping and mopping; includes daily sweeping & mopping of balconies/utilities and weekly deep cleaning with water' },
        
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Premium', size: '2BHK +1 Balcony + 1 Utility', frequency: 1, pricePerMonth: 1300, jobDescription: 'Regular + Well trained, multi lingual, soft spoken, well dressed, educated, help kids in home works (for baby care), and experienced.' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Premium', size: '2BHK +1 Balcony + 1 Utility', frequency: 2, pricePerMonth: 1690, jobDescription: 'Regular + Well trained, multi lingual, soft spoken, well dressed, educated, help kids in home works (for baby care), and experienced.' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Premium', size: '2.5 - 3 BHK +1 Balcony + 1 Utility', frequency: 1, pricePerMonth: 1560, jobDescription: 'Regular + Well trained, multi lingual, soft spoken, well dressed, educated, help kids in home works (for baby care), and experienced.' },
        { serviceCategory:"Sweeping & Mopping" , type:"Maid",serviceType: 'Sweeping & Mopping', subCategory: 'Premium', size: '2.5 - 3 BHK +1 Balcony + 1 Utility', frequency: 2, pricePerMonth: 2080, jobDescription: 'Regular + Well trained, multi lingual, soft spoken, well dressed, educated, help kids in home works (for baby care), and experienced.' }
    ];

    // Handle button clicks for size and frequency
    const handleButtonClick = (value: string | number, id: string) => {
        if (id === 'size') {
            setSize(value as string);
        } else {
            setFrequency(value as number);
        }
    };

    // Calculate price and update the entry
    const calculatePrice = () => {
        const matchedEntry = pricingData.find(
            (item) => item.size === size && item.frequency === frequency
        );

        if (matchedEntry) {
            setEntry(matchedEntry); // Set the entire entry
            return matchedEntry.pricePerMonth; // Return the corresponding price
        }

        setEntry(null); // If no match, set entry to null
        return 0; // Return 0 if no matching entry is found
    };

    useEffect(() => {
        if (size && frequency) {
            const calculatedPrice = calculatePrice();
            setPrice(calculatedPrice);

            // Send the entire entry (not just job description) to parent
            onPriceChange({ price: calculatedPrice, entry: entry });
        }
    }, [size, frequency, entry, onPriceChange]); // Recalculate whenever these values change

    return (
        <>
            <Typography gutterBottom>
                Size:
                <div>
                    {['2BHK +1 Balcony + 1 Utility', '2.5 - 3 BHK +1 Balcony + 1 Utility'].map((sizeOption) => (
                        <button
                            key={sizeOption}
                            onClick={() => handleButtonClick(sizeOption, 'size')}
                            style={{
                                border: size === sizeOption ? '3px solid blue' : '1px solid gray',
                                backgroundColor: size === sizeOption ? '#e0f7fa' : 'transparent',
                                padding: '10px',
                                margin: '5px',
                                cursor: 'pointer',
                                outline: 'none',
                                borderRadius: '8px',
                            }}
                        >
                            {sizeOption}
                        </button>
                    ))}
                </div>
            </Typography>

            <Typography gutterBottom>
                Frequency:
                <div>
                    {[1, 2].map((frequencyOption) => (
                        <button
                            key={frequencyOption}
                            onClick={() => handleButtonClick(frequencyOption, 'frequency')}
                            style={{
                                border: frequency === frequencyOption ? '3px solid blue' : '1px solid gray',
                                backgroundColor: frequency === frequencyOption ? '#e0f7fa' : 'transparent',
                                padding: '10px',
                                margin: '5px',
                                cursor: 'pointer',
                                outline: 'none',
                                borderRadius: '8px',
                            }}
                        >
                            {frequencyOption} day(s) / week
                        </button>
                    ))}
                </div>
            </Typography>

            <Typography gutterBottom>Price: ₹{price}/month</Typography>
            <Typography gutterBottom>Job Description: {entry?.jobDescription || 'N/A'}</Typography>
        </>
    );
};

export default SweepingAndMopping;
