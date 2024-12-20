import React, { useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import "./Landingpage.css";
import DialogComponent from "../Common/DialogComponent/DialogComponent";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Landingpage: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {

  const [open, setOpen] = useState(false);
  const [ selectedType , setSelectedtype] = useState('')
  
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
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Instantly" control={<Radio />} label="Instantly ( Today / Tomorrow )" />
        <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
      </RadioGroup>
    </FormControl>
      </DialogComponent>
     
    </section>
    
  );
};