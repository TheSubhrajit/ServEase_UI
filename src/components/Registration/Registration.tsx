import  { useState } from 'react';
import './Registration.css'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

// Define the types for your form data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  postalcode: string;
  streetaddress: string;
}

// Initial form data state
const initialFormData: FormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  dob: "",
  gender: "",
  country: "",
  state: "",
  city: "",
  postalcode: "",
  streetaddress: "",
};

const steps = ["Basic Info", "Address", "Additional Details", "Confirmation"];

const Login: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Handle form data change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation logic and submission here
    alert(JSON.stringify(formData, null, 2));
  };

  // Move to the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Move to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Render different form sections based on the active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="topic">
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth (optional)"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <FormLabel component="legend">Gender (optional)</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="Men"
                control={<Radio />}
                label="Men"
              />
              <FormControlLabel
                value="Women"
                control={<Radio />}
                label="Women"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
        );
      case 1:
        return (
          <div className='topic'>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"/>

            <TextField
              label="State/Province"
              name="State/Province"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"/>

              <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"/>

              <TextField
              label="Postal code"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"/>

              <TextField
              label="Street Address"
              name="streetaddress"
              value={formData.streetaddress}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"/>
          </div>
        );
      case 2:
        return (
          <div className='topic'>
            
          </div>
        );
        // case 3:
        // return (
        //   <div>
            
        //   </div>
        // );
      default:
        return "Unknown step";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='text'>
      <h2>User Registration</h2>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <div>{getStepContent(activeStep)}</div>

      <div className="button" style={{ marginTop: "20px" }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} style={{ marginRight: "10px" }}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Login;


