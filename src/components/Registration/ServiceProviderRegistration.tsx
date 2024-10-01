import React, { useState } from 'react';
import {
  TextField, Button, Grid, Typography, Box, Stepper, Step, StepLabel, Checkbox, FormControlLabel
} from '@mui/material';

// Define the shape of formData using an interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  aadhaar: string;
  pan: string;
  agreeToTerms: boolean;
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
  aadhaar?: string;
  pan?: string;
  agreeToTerms?: string; // This is now a string for error messages
}

// Regex for validation
const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;
const aadhaarRegex = /^[0-9]{12}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const steps = [
  'Basic Information',
  'Address Information',
  'Additional Details',
  'KYC Verification',
  'Confirmation',
];

const ServiceProviderRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    aadhaar: '',
    pan: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (activeStep === 0) {
      // Basic Information validation (Step 1)
      if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        tempErrors.firstName = 'First Name is required and should contain only alphabets.';
      }
      if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        tempErrors.lastName = 'Last Name is required and should contain only alphabets.';
      }
      if (!formData.email || !emailRegex.test(formData.email)) {
        tempErrors.email = 'Valid email is required.';
      }
      if (!formData.password || formData.password.length < 8) {
        tempErrors.password = 'Password must be at least 8 characters long.';
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
        tempErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
      }
    }

    if (activeStep === 1) {
      // Address validation (Step 2)
      if (!formData.address) {
        tempErrors.address = 'Address is required.';
      }
      if (!formData.city) {
        tempErrors.city = 'City is required.';
      }
      if (!formData.state) {
        tempErrors.state = 'State is required.';
      }
      if (!formData.zipCode) {
        tempErrors.zipCode = 'Zip/Postal Code is required.';
      }
    }

    if (activeStep === 2) {
      // Additional Details validation (Step 3)
      if (!formData.agreeToTerms) {
        tempErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy.';
      }
    }

    if (activeStep === 3) {
      // Aadhaar number validation (12 digits only)
      if (!formData.aadhaar || !aadhaarRegex.test(formData.aadhaar)) {
        tempErrors.aadhaar = 'Aadhaar number must be exactly 12 digits.';
      }
      
      // PAN number validation (10-character alphanumeric format)
      if (!formData.pan || !panRegex.test(formData.pan)) {
        tempErrors.pan = 'PAN number must be in a valid format (5 letters, 4 digits, 1 letter).';
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
      console.log('Form submitted:', formData);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
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
        );
      case 1:
        return (
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
        );
      case 2:
        return (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  name="agreeToTerms"
                />
              }
              label="I agree to the Terms of Service and Privacy Policy"
              required
            />
            {errors.agreeToTerms && (
              <Typography color="error">{errors.agreeToTerms}</Typography>
            )}
          </>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Aadhaar Number"
                name="aadhaar"
                fullWidth
                required
                value={formData.aadhaar}
                onChange={handleChange}
                error={!!errors.aadhaar}
                helperText={errors.aadhaar}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="PAN Number"
                name="pan"
                fullWidth
                required
                value={formData.pan}
                onChange={handleChange}
                error={!!errors.pan}
                helperText={errors.pan}
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Typography variant="h6" align="center">
            All steps completed - You're ready to submit your information!
          </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Service Provider Registration
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
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

export default ServiceProviderRegistration;
