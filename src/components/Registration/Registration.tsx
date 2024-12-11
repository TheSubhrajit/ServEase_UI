import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  FormLabel,
  FormControl,
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import "./Registration.css";
import {
  Visibility,
  VisibilityOff,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import ProfileImageUpload from './ProfileImageUpload';
import axios from "axios";
import ChipInput from "../Common/ChipInput/ChipInput";

// Define the shape of formData using an interface
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  emailId: string;
  password: string;
  confirmPassword: string;
  mobileNo: string;
  gender: string;
  address: string;
  locality: string;
  street: string;
  pincode: string;
  buildingName:string;
  currentLocation: string;
  agreeToTerms: boolean;
  hobbies: string;
  language: string;
}

// Define the shape of errors to hold string messages
interface FormErrors {
  firstName?: string;
  lastName?: string;
  emailId?: string;
  password?: string;
  confirmPassword?: string;
  mobileNo?: string;
  gender?: string;
  address?: string;
  locality?: string;
  street?: string;
  pincode?: string;
  buildingName?:string;
  currentLocation?: string;
  agreeToTerms?: string; // This is now a string for error messages
}

// Regex for validation
const nameRegex = /^[A-Za-z\s]+$/;
const emailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[0-9]{10}$/;
const pincodeRegex = /^[0-9]{6}$/;

const steps = ["Basic Info", "Address", "Additional Details", "Confirmation"];

interface RegistrationProps {
  onBackToLogin: (data: boolean) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onBackToLogin }) => {
  const handleBackLogin = (e: any) => {
    onBackToLogin(e);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

    const showSnackbar = (message: string, severity: AlertColor = 'success') => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    gender: "",
    address: "",
    locality: "",
    street: "",
    pincode: "",
    buildingName:"",
    currentLocation: "",
    agreeToTerms: false,
    hobbies: "",
    language: "",
  });

  const [availableLanguages] = useState<string[]>([
    "Assamese",
    "Bengali",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Marathi",
    "Malayalam",
    "Oriya",
    "Punjabi",
    "Sanskrit",
    "Tamil",
    "Telugu",
    "Urdu",
    "Sindhi",
    "Konkani",
    "Nepali",
    "Manipuri",
    "Bodo",
    "Dogri",
    "Maithili",
    "Santhali",
  ]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipChange = (newChips: string[]) => {
    setSelectedChips(newChips);
    console.log(selectedChips)
  };
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
   // File change handler to update the profile picture
   const handleImageSelect = (file: File | null) => {
    setFormData((prevData) => ({ ...prevData, profileImage: file }));
  };

  
  

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
      if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        tempErrors.firstName =
          "First Name is required and should contain only alphabets.";
      }
      if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        tempErrors.lastName =
          "Last Name is required and should contain only alphabets.";
      }
      if (!formData.emailId || !emailIdRegex.test(formData.emailId)) {
        tempErrors.emailId = "Valid email is required.";
      }
      if (!formData.password || !strongPasswordRegex.test(formData.password)) {
        tempErrors.password =
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match.";
      }
      if (!formData.mobileNo || !phoneRegex.test(formData.mobileNo)) {
        tempErrors.mobileNo = "Phone number must be exactly 10 digits.";
      }
      if (!formData.gender) {
        tempErrors.gender = "Select Your Gender.";
      }
    }

    if (activeStep === 1) {
      if (!formData.address) {
        tempErrors.address = "Address is required.";
      }
      if (!formData.locality) {
        tempErrors.locality = "City is required.";
      }
      if (!formData.street) {
        tempErrors.street = "State is required.";
      }
      if (!formData.pincode || !pincodeRegex.test(formData.pincode)) {
        tempErrors.pincode = "Zip/Postal Code must be exactly 6 digits.";
      }
      if (!formData.currentLocation) {
        tempErrors.currentLocation = "Current Location is required.";
      }
      if (!formData.buildingName) {
        tempErrors.buildingName = "Building Name is required.";
      }
    }

    if (activeStep === 3) {
      if (!formData.agreeToTerms) {
        tempErrors.agreeToTerms =
          "You must agree to the Terms of Service and Privacy Policy.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // const handleNext = () => {
  //   if (validateForm()) {
  //     setActiveStep((prevStep) => prevStep + 1);
  //   }
  // };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log("Form submitted:", formData);
  //   }
  // };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
    
  //   // Ensure form validation passes
  //   if (validateForm()) {
  //       // Log form data in the console for now
  //       console.log("Form submitted:", formData);
        
  //       // Show success message in the Snackbar
  //       showSnackbar('Registration Successful!', 'success');

  //       // Redirect or call the onBackToLogin handler with form data
  //       onBackToLogin(true);  // Triggering the login component after success
  //   } else {
  //       // Show error message in the Snackbar if form validation fails
  //       showSnackbar('Please fix the errors and try again.', 'error');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Ensure form validation passes
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://43.205.212.94:8080/api/customer/add-customer",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              
            },
          }
        );

        // Log the response data
        console.log("Server Response:", response.data);

        // Show success message in the Snackbar
        showSnackbar("Registration Successful!", "success");
  
        // Call the onBackToLogin handler to redirect to login
        onBackToLogin(true);
      } catch (error: any) {
        // Handle error response
        console.error("Error registering user:", error.response || error.message);
  
        // Show error message in the Snackbar
        showSnackbar(
          error.response?.data?.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } else {
      // Show error message if form validation fails
      showSnackbar("Please fix the errors and try again.", "error");
    }
  };
  

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
      if (activeStep === steps.length - 1) {
        setSnackbarMessage("Registration Successful!");
        setSnackbarOpen(true);
        // Optionally, reset form data or redirect
      }
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="topic">
            <Grid container spacing={2}>
               {/* Profile Picture Upload Section */}
      <Grid item xs={12}>
        <ProfileImageUpload onImageSelect={handleImageSelect} />
      </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="First Name"
                  name="firstName"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Middle Name"
                  name="middleName"
                  fullWidth
                  value={formData.middleName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Last Name"
                  name="lastName"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  error={!!errors.gender}
                  required
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row // Optional to make it horizontal
                  >
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="MALE"
                    />
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="FEMALE"
                    />
                    <FormControlLabel
                      value="OTHERS"
                      control={<Radio />}
                      label="OTHERS"
                    />
                  </RadioGroup>
                  {errors.gender && (
                    <Typography color="error">{errors.gender}</Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
        <TextField
          placeholder="Email"
          name="emailId"
          fullWidth
          required
          value={formData.emailId}
          onChange={handleChange}
          error={!!errors.emailId}
          helperText={errors.emailId}
        />
      </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                          aria-label="toggle confirm password visibility"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Phone Number"
                  name="mobileNo"
                  fullWidth
                  required
                  value={formData.mobileNo}
                  onChange={handleChange}
                  error={!!errors.mobileNo}
                  helperText={errors.mobileNo}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
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
                  placeholder="Address"
                  name="address"
                  fullWidth
                  required
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField
                placeholder="Locality"
                name="locality"
                fullWidth
                required
                value={formData.locality}
                onChange={handleChange}
                error={!!errors.locality}
                helperText={errors.locality}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                placeholder="Street"
                name="street"
                fullWidth
                required
                value={formData.street}
                onChange={handleChange}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12}sm={6}>
              <TextField
                placeholder="Pincode"
                name="pincode"
                fullWidth
                required
                value={formData.pincode}
                onChange={handleChange}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="BuildingName"
                name="buildingName"
                fullWidth
                required
                value={formData.buildingName}
                onChange={handleChange}
                error={!!errors.buildingName}
                helperText={errors.buildingName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="CurrentLocation"
                name="currentLocation"
                fullWidth
                required
                value={formData.currentLocation}
                onChange={handleChange}
                error={!!errors.currentLocation}
                helperText={errors.currentLocation}
              />
            </Grid>
            
              {/* <Grid item xs={12}>
                <TextField
                  label="Nearby Location"
                  name="Nearby Location"
                  fullWidth
                  required
                  value={formData.nearbyLocation}
                  onChange={handleChange}
                  error={!!errors.nearbyLocation}
                  helperText={errors.nearbyLocation}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Current Location"
                  name="Current location"
                  fullWidth
                  required
                  value={formData.currentLocation}
                  onChange={handleChange}
                  error={!!errors.currentLocation}
                  helperText={errors.currentLocation}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Building Name"
                  name="Building Name"
                  fullWidth
                  required
                  value={formData.buildingName}
                  onChange={handleChange}
                  error={!!errors.buildingName}
                  helperText={errors.buildingName}
                  sx={{
                    "& .MuiInputBase-root": { height: "36px" },
                    "& .MuiInputBase-input": { padding: "10px 12px" },
                  }}
                />
              </Grid> */}
            </Grid>
          </div>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder="Hobbies"
                name="hobbies"
                fullWidth
                value={formData.hobbies}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": { height: "36px" },
                  "& .MuiInputBase-input": { padding: "10px 12px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <ChipInput options={availableLanguages} onChange={handleChipChange} label="languages" placeholder="Pick/Type Your Languages" />
              {/* <TextField
                placeholder="Language"
                name="language"
                fullWidth
                value={formData.language}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-root": { height: "36px" },
                  "& .MuiInputBase-input": { padding: "10px 12px" },
                }}
              /> */}
            </Grid>
            {/* <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  error={!!errors.gender}
                >
                  <FormLabel component="legend">Diet :</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row // Optional to make it horizontal
                  >
                    <FormControlLabel
                      value="Veg"
                      control={<Radio />}
                      label="VEG"
                    />
                    <FormControlLabel
                      value="Non-veg"
                      control={<Radio />}
                      label="NON-VEG"
                    />
                  </RadioGroup>
                  {errors.gender && (
                    <Typography color="error">{errors.gender}</Typography>
                  )}
                </FormControl>
              </Grid> */}
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
    <Box
      sx={{ maxWidth: 600, margin: "auto", padding: 2, display: "block" }}
      className="parent"
    >
      <Typography variant="h5" gutterBottom className="text">
        User Registration
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ overflow: "overlay" }}
      >
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
            color="primary"
            startIcon={<ArrowBack />} // Add the icon here
          >
            Back
          </Button>
          {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
        </Snackbar> */}
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<ArrowForward />} // This will place the icon after the text
            >
              Next
            </Button>
          )}
        </Box>
        <Snackbar open={snackbarOpen} 
      autoHideDuration={6000} 
      onClose={handleCloseSnackbar}   
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: '60px',}}
      >
       <Alert onClose={handleCloseSnackbar}
        severity={snackbarSeverity}  
        sx={{ width: '100%', fontSize: '1.5rem', padding: '16px', border: '1px solid grey',}}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        <div className="flex flex-col mt-4 items-center justify-center text-sm">
          <h3 className="dark:text-gray-300">
            Already have an account?{" "}
            <button
              className="text-blue-500 ml-2 underline"
              onClick={(e) => handleBackLogin("false")}
            >
              Sign in
            </button>
          </h3>
        </div>
      </form>
    </Box>
  );
};

export default Registration;
