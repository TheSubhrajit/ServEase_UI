import React, { useState } from "react";
import "./SearchFormtwo.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { FormLabel, Slider } from "@mui/material";

interface SearchFormProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
  onSearch: (data: any[]) => void;
}
export const Search_form: React.FC<SearchFormProps> = ({
  open,
  selectedValue,
  onClose,
  onSearch,
}) =>  { const [sliderValueAge, setSliderValueAge] = useState([18, 25]);
  const [morningTime, setMorningTime] = useState(6);
  const [eveningTime, setEveningTime] = useState(14);
  const [isMorningChecked, setIsMorningChecked] = useState(false);
  const [isEveningChecked, setIsEveningChecked] = useState(false);
  // Format function for displaying age range
  const formatDisplayAge = (value: number) => {
    return `${value} yrs`;
  };

  // Handle slider value changes
  const handleAgeChange = (event: any, newValue: number | number[]) => {
    setSliderValueAge(newValue as number[]);
  };
    // Handlers for slider value changes
    const handleMorningTimeChange = (event, newValue) => {
      setMorningTime(newValue);
    };
  
    const handleEveningTimeChange = (event, newValue) => {
      setEveningTime(newValue);
    };
    const handleMorningCheckboxChange = (event) => {
      setIsMorningChecked(event.target.checked);
    };
  
    const handleEveningCheckboxChange = (event) => {
      setIsEveningChecked(event.target.checked);
    };
  
  return (
    <div className="search-form">
      <h1>Search Your Preferences</h1>
      {false ? ( // Toggle with `loading`
        <LoadingIndicator />
      ) : (
       <form>
               {/* First Row: Gender, Age, Languages */}
               <div className="form-row">
                 {/* Gender Section */}
                 <div className="form-group">
                   <div className="gender">
                     <label>Gender: </label>
                     <input type="radio" value="MALE" /> Male
                     <input type="radio" value="FEMALE"  />{" "}
                     Female
                   </div>
                 </div>
               
       
                 {/* Age Section */}
       <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
         <FormLabel style={{ marginRight: '40px' }}>Age:</FormLabel>
         <Slider
           value={sliderValueAge}
           onChange={handleAgeChange}
           valueLabelDisplay="on"
           valueLabelFormat={formatDisplayAge}
           min={18}
           max={50}
           step={5}
           marks={[
             { value: 18, label: '18 yrs' },
             { value: 25, label: '25 yrs' },
             { value: 35, label: '35 yrs' },
             { value: 50, label: '50 yrs' },
           ]}
           style={{ width: '200px' }}
         />
       </div>
       
                 {/* Languages Section */}
                 <div className="form-group">
                   <label htmlFor="languages">Languages:</label>
                   <input
                     type="text"
                     id="languages"
                     placeholder="Enter languages"
                     style={{ marginLeft: "10px", padding: "5px" }}
                   />
                 </div>
                 <div className="form-group">
                   <label htmlFor="food">Pick Food:</label>
                   <input
                     type="text"
                     id="food"
                     placeholder="Enter food preferences"
                     style={{ marginLeft: "10px", padding: "5px" }}
                   />
                 </div>
               </div>
       
               {/* Second Row: Pick Food, Shift Time, Availability */}
               <div className="form-row">
          {/* Shift Time Section */}
                 <div className="form-group">
                 <div className="flex-container1">
                 <label style={{ display: "block", marginBottom: "10px" }}>
                   Shift Time:
                 </label>
       
                {/* Morning Shift Section */}
                <div className="shift-group">
                 <input
                   type="checkbox"
                   id="morning"
                   checked={isMorningChecked}
                   onChange={handleMorningCheckboxChange}
                 />
                 <label htmlFor="morning" style={{ marginLeft: "5px", marginRight: "15px" }}>
                   Morning (6 AM - 12 PM)
                 </label>
                 <Slider
         value={morningTime}
         onChange={handleMorningTimeChange}
         valueLabelDisplay="on"
         min={6}
         max={12}
         step={1}
         marks={[
           { value: 6, label: "6 AM" },
           { value: 8, label: "8 AM" },
           { value: 10, label: "10 AM" },
           { value: 12, label: "12 PM" },
         ]}
         style={{ width: "300px" }}
         disabled={!isMorningChecked}  // Disable slider if checkbox is not checked
               />
       
               </div>
       
               {/* Evening Shift Section */}
               <div className="shift-group">
                 <input
                   type="checkbox"
                   id="evening"
                   checked={isEveningChecked}
                   onChange={handleEveningCheckboxChange}
                 />
                 <label htmlFor="evening" style={{ marginLeft: "5px", marginRight: "15px" }}>
                   Evening (2 PM - 8 PM)
                 </label>
                 <Slider
         value={eveningTime}
         onChange={handleEveningTimeChange}
         valueLabelDisplay="on"
         min={14}
         max={20}
         step={1}
         marks={[
           { value: 14, label: "2 PM" },
           { value: 16, label: "4 PM" },
           { value: 18, label: "6 PM" },
           { value: 20, label: "8 PM" },
         ]}
         style={{ width: "300px" }}
         disabled={!isEveningChecked}  // Disable slider if checkbox is not checked
       />  
             </div>
               </div>
                 </div>    
               </div>
               {/* Buttons Row */}
               <div className="button-row">
                 <button type="submit" className="search-button">
                   Search
                 </button>
                 <button type="reset" className="reset-button">
                   Reset
                 </button>
               </div>
             </form>
      )}
    </div>
  );
};

export default Search_form;
