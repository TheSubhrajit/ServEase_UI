import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Help_Search.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';

function valuetext(value: number) {
    return `${value}°C`;
  }

export const Help_Search = () =>{

    const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
        
        
    return (
        <>
        <p className='font-sans'> Select Preffered Gender </p>
    <div className='gender-selector'>
    
    <div className="icon-div">
    <Button variant="dark"><img src='man-user-circle-icon.png'></img></Button> 
    </div>
    <div className="icon-div">
    <Button variant="dark"><img src='woman-user-color-icon.png'></img></Button>
    </div>
    </div>

    <p className='font-sans'> Select Preffered Timing </p>
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Morning"
      />
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Evening"
      />
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="All Day"
      />
      </Form>
      <p className='font-sans'> Select Preffered Age Group </p>
      <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
    
        </>
    )
}