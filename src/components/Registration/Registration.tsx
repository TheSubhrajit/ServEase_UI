import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./Registration.css";

// Define the shape of formData using an interface
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  agreeToTerms: boolean;
  hobbies: string;
  language: string;
}

// Define the shape of errors to hold string messages
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  agreeToTerms?: string; // This is now a string for error messages
}

// Regex for validation
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;

const steps = ["Basic Info", "Address", "Additional Details", "Confirmation"];

interface RegistrationProps {
  onBackToLogin: () => void;
}
const Registration: React.FC<RegistrationProps> = ({ onBackToLogin }) => {
  // const [file, setFile] = useState<File | null>(null); //File Upload
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false,
    hobbies: "",
    language: "",
  });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //   }
  // }; //File upload

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (activeStep === 0) {
      // Basic Information validation (Step 1)
      if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        tempErrors.firstName =
          "First Name is required and should contain only alphabets.";
      }
      if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        tempErrors.lastName =
          "Last Name is required and should contain only alphabets.";
      }
      if (!formData.email || !emailRegex.test(formData.email)) {
        tempErrors.email = "Valid email is required.";
      }
      if (!formData.password || formData.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters long.";
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match.";
      }
      if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
        tempErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      }
    }

    if (activeStep === 1) {
      // Address validation (Step 2)
      if (!formData.address) {
        tempErrors.address = "Address is required.";
      }
      if (!formData.city) {
        tempErrors.city = "City is required.";
      }
      if (!formData.state) {
        tempErrors.state = "State is required.";
      }
      if (!formData.zipCode) {
        tempErrors.zipCode = "Zip/Postal Code is required.";
      }
    }

    if (activeStep === 3) {
      // Confirmation validation (Step 3)
      if (!formData.agreeToTerms) {
        tempErrors.agreeToTerms =
          "You must agree to the Terms of Service and Privacy Policy.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="topic">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Middle Name"
                  name="middleName"
                  fullWidth
                  value={formData.middleName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className="topic">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  required
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  required
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  name="state"
                  fullWidth
                  required
                  value={formData.state}
                  onChange={handleChange}
                  error={!!errors.state}
                  helperText={errors.state}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Zip/Postal Code"
                  name="zipCode"
                  fullWidth
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={handleFileChange}
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                label="Hobbies"
                name="hobbies"
                fullWidth
                value={formData.hobbies}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Language"
                name="language"
                fullWidth
                value={formData.language}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <>
            <div className="topic">
              <Typography variant="h6" align="center" className="text">
                All steps completed - You're ready to submit your information!
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    name="agreeToTerms"
                  />
                }
                required
                label="I agree to the Terms of Service and Privacy Policy"
              />
              {errors.agreeToTerms && (
                <Typography color="error">{errors.agreeToTerms}</Typography>
              )}
            </div>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }} className="parent">
      <Typography variant="h5" gutterBottom className="text">
        User Registration
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            color="secondary"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Registration;
