import * as React from "react";
import './Search_form.css'
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";


let counter = 0;
 
export const Search_form = ()=> {
  function valuetext(value:Number) {
    return `${value}°C`;
  }
const {register, handleSubmit} = useForm();
const onSubmit = (d: any) =>
    alert(JSON.stringify(d));

  return (
     <>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="all">
    <div className="flex-container1">

   <div className='gender'>
    <div className="men">
     <Form.Check {...register("Men Selected")} id="custom-Checkbox" label="Men" />
    <div className="icon-div1">
  <img src='man-user-circle-icon.png'></img>
  </div>
  </div>
  <div className="women">
    <Form.Check {...register("Women Selected")} id="custom-checkbox" label="Women"  />  
  <div className="icon-div2">
  <img src='woman-user-color-icon.png'></img>
  </div>
  </div>
  </div>
  <div className='sage'>
  <div className='slider-1'>
  <Box sx={{width: 300  }}>
    <Slider  defaultValue={20}  {...register("Selected Men Age:")} valueLabelDisplay="auto" step={1} marks min={18} max={60}  />
  </Box>
  </div>
  <div className='slider-2'>
  <Box sx={{ width: 300 }}>
    <Slider defaultValue={20} {...register("Selected Women Age:")} valueLabelDisplay="auto" step={1} marks min={18} max={60} />
  </Box>
  </div>
  </div>
  </div>
  <div className="flex-container2">
  <div className='time'>
  <div className="day">
    <Form.Check
      {...register("checkbox")}
      id="custom-Checkbox"
      label="Day"
    />
  <div className="icon-div3">
  <img src='day.png'></img>
  </div>
  </div>
  <div className="night">
    <Form.Check
      {...register("checkbox")}
      id="custom-Checkbox"
      label="Night"
    />
  <div className="icon-div4">
  <img src='night.png'></img>
  </div>
  </div>
  </div>
  <div className='times'> 
  <div className='time1'>
  <Box sx={{ width: 300 }}>
    <Slider defaultValue={6} color="secondary"{...register("Morning Timing")} 
    aria-label="Time Between" valueLabelDisplay="auto" step={1} marks min={6} max={12} />
  </Box> 
  </div>
  <div className='time1'>
  <Box sx={{ width: 300 }}>
    <Slider defaultValue={4} color="secondary" {...register("Night Timing")} valueLabelDisplay="auto" step={1} marks min={4} max={10} />
  </Box>
  </div>
  </div>
  </div>
  <div className="flex-container3">
  <div className="Sbtn1">
  <Button type="submit" id="button1" variant="outline-dark" >Submit</Button>
  </div>
  <div className="Sbtn2 ">
  <Button type="reset" id='button2' variant="outline-dark"> Reset </Button>
  </div>
  </div>
  </div>
  </form>
  </>
  );
};

export default Search_form;