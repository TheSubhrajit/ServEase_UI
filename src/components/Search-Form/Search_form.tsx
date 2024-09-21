import { Dialog } from '@mui/material';
import React, { useState } from 'react';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const Search_form = (props: SimpleDialogProps) => {
    const [age, setAge] = useState<number>(14);
    const [availability, setAvailability] = useState<string>('8.00 AM');
    const [areaRange, setAreaRange] = useState<string>('');
    
      const { onClose, selectedValue, open } = props;
    
      const handleClose = () => {
        onClose(selectedValue);
      };

    return (
      <Dialog onClose={handleClose} open={open} className="dialog-class">
        <div>
            <button>Filter ⌛</button>
            <form>
                <div>
                    <label>Gender: </label>
                    <input type="radio" name="gender" value="Male" /> Male
                    <input type="radio" name="gender" value="Female" /> Female
                </div>
                <div>
                    <label>Age: </label>
                    <input type="range" min="14" max="40" value={age} onChange={e => setAge(Number(e.target.value))} />
                    {age} years
                </div>
                <div>
                    <label>Language: </label>
                    <input type="checkbox" name="language" value="Bengali" /> Bengali
                    <input type="checkbox" name="language" value="Hindi" /> Hindi
                    <input type="checkbox" name="language" value="Kannada" /> Kannada
                </div>
                <div>
                    <label>Shift Time: </label>
                    <input type="radio" name="shift" value="Morning" /> Morning
                    <input type="radio" name="shift" value="Evening" /> Evening
                </div>
                <div>
                    <label>Availability: </label>
                    <select value={availability} onChange={e => setAvailability(e.target.value)}>
                        <option value="8.00 AM">8.00 AM</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div>
                    <label>Category: </label>
                    <input type="checkbox" name="category" value="Economy Service" /> Economy Service
                    <input type="checkbox" name="category" value="Premium Service" /> Premium Service
                </div>
                <div>
                    <label>Customer Ratings: </label>
                    <input type="checkbox" name="rating" value="5" /> 5 ★
                    <input type="checkbox" name="rating" value="4" /> 4 ★ & above
                    <input type="checkbox" name="rating" value="3" /> 3 ★ & above
                </div>
                <div>
                    <label>Area Range: </label>
                    <input type="radio" name="area" value="1-2 Km" onChange={() => setAreaRange('1-2 Km')} /> Within 1-2 Km Area
                    <input type="radio" name="area" value="2-5 Km" onChange={() => setAreaRange('2-5 Km')} /> Within 2-5 Km Area
                    <input type="radio" name="area" value="5-10 Km" onChange={() => setAreaRange('5-10 Km')} /> Within 5-10 Km Area
                </div>
            </form>
        </div>
        </Dialog>
    );
};

export default Search_form;
