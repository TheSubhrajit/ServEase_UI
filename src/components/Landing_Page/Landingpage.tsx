import React, {  useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import "./Landingpage.css";
import DialogComponent from "../Common/DialogComponent/DialogComponent";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Landingpage: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {

  const [open, setOpen] = useState(false);
  const [ selectedType , setSelectedtype] = useState('')
  const [value, setValue] = React.useState<Dayjs | null>(null);
  
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };const [selectedRadioButtonValue, getSelectedRadioButtonValue] = React.useState<string>('');
  
  const handleClick = (data: string) => {
    setOpen(true)
    setSelectedtype(data)
  };

  const handleClose = (data: string) =>{
    setOpen(false)
  }

  const handleSave = () =>{
    sendDataToParent(selectedType);
  }

  const getSelectedValue = (e) =>{
    getSelectedRadioButtonValue(e.target.value)
  }

  const getMaxEndDate = () => {
    if (!startDate) return ''; // Return empty if no start date
    const start = new Date(startDate);
    if(selectedRadioButtonValue === "Monthly"){
      start.setDate(start.getDate() + 31);
    } else {
      start.setDate(start.getDate() + 15);
    }
     // 4 days after start date
    return start.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  };

  return (
    <section className="landing-container">
       <div className="selector-container">
        <Tooltip title="Cook" arrow>
          <div className="selectors" onClick={() => handleClick("cook")}>
            <img src="../cookin_food.png" alt="Cook" />
          </div>
        </Tooltip>
        <p className="label-text">Cook</p> {/* Label below the circle */}
      </div>
      
      <div className="selector-container">
        <Tooltip title="Maid" arrow>
          <div className="selectors" onClick={() => handleClick("maid")}>
            <img src="../broom.png" alt="Maid" />
          </div>
        </Tooltip>
        <p className="label-text">Maid</p> {/* Label below the circle */}
      </div>
      
      <div className="selector-container">
        <Tooltip title="Nanny" arrow>
          <div className="selectors" onClick={() => handleClick("nanny")}>
            <img src="../maid_old.png" alt="Nanny" />
          </div>
        </Tooltip>
        <p className="label-text">Nanny</p> {/* Label below the circle */}
      </div>


      <DialogComponent 
        open={open} 
        onClose={handleClose} 
        title="Select your Booking" 
        onSave={handleSave}
      >
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Book by</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={getSelectedValue}
      >
        <FormControlLabel value="Date" control={<Radio />} label="Date" />
        <FormControlLabel value="Short term" control={<Radio />} label="Short term" />
        <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
        </RadioGroup>
    </FormControl>
    { selectedRadioButtonValue === "Date" && <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>    
        <label htmlFor="startDate">Date</label>
      <input
        id="startDate"
        type="date"
        value={startDate || ''}
        onChange={handleStartDateChange}
        required
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      </div>
    </LocalizationProvider>}
    { selectedRadioButtonValue === "Short term" && <LocalizationProvider dateAdapter={AdapterDayjs}>
    {/* <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} /> */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <label htmlFor="startDate">Start Date</label>
      <input
        id="startDate"
        type="date"
        value={startDate || ''}
        onChange={handleStartDateChange}
        required
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        id="endDate"
        type="date"
        value={endDate || ''}
        onChange={handleEndDateChange}
        required
        min={startDate || ''}
        max={getMaxEndDate()}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      </div>
    </LocalizationProvider>}
    { selectedRadioButtonValue === "Monthly" && <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>    
        <label htmlFor="startDate">Start Date</label>
      <input
        id="startDate"
        type="date"
        value={startDate || ''}
        onChange={handleStartDateChange}
        required
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        id="endDate"
        type="date"
        value={endDate || ''}
        onChange={handleEndDateChange}
        required
        min={startDate || ''}
        max={getMaxEndDate()}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      </div>
    </LocalizationProvider>}
      </DialogComponent>
     
    </section>
    
  );
};