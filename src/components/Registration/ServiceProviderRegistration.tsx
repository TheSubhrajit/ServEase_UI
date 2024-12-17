import React, { useState ,ChangeEvent,SyntheticEvent,useRef} from 'react';
import moment from "moment";
import {
  TextField,
  Input,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Alert,
  AlertColor,
  RadioGroup,
  Radio,
  FormControl, 
  FormLabel,
  FormHelperText,
  Avatar
} from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Visibility, VisibilityOff,ArrowForward,ArrowBack,CameraAlt as CameraAltIcon   } from '@mui/icons-material';
import { px } from 'framer-motion';
import ProfileImageUpload from './ProfileImageUpload';
import axios from 'axios';
import ChipInput from "../Common/ChipInput/ChipInput";
import { keys } from '../../env/env';
import axiosInstance from '../../services/axiosInstance';

// Define the shape of formData using an interface
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  emailId: string;
  password: string;
  confirmPassword: string;
  mobileNo: string;
  AlternateNumber: string;
  address: string;
  buildingName: string;
  locality:String;
  street: string;
  currentLocation: string;
  nearbyLocation: string;
  pincode: string;
  AADHAR: string;
  pan: string;
  agreeToTerms: boolean;
  panImage: File | null; // New field for PAN image upload
  housekeepingRole: string; // Dropdown for Service Type
  description: string; // Text area for business description
  experience: string; // Experience in years
  kyc: string;
  documentImage: File | null;
  otherDetails:string,
  profileImage: File | null; // New field for Profile Image
  cookingSpeciality: string;
  age:'';
  diet:string;
  dob:'';
}
// Define the shape of errors to hold string messages
interface FormErrors {
  firstName?: string;
  lastName?: string;
  gender?: string;
  emailId?: string;
  password?: string;
  confirmPassword?: string;
  mobileNo?: string;
  address?: string;
  buildingName?: string;
  locality?: string;
  street ?: string;
  currentLocation?: string;
  city?: string;
  state?: string;
  pincode?: string;
  AADHAR?: string;
  pan?: string;
  agreeToTerms?: string; 
  housekeepingRole?: string; 
  description?: string; 
  experience?: string; 
  kyc?: string;
  documentImage?: string;
  aadhaarNumber?:string;
  cookingSpeciality?: string;
  Speciality?: string;
  diet?:string;
}
// Regex for validation
const nameRegex = /^[A-Za-z\s]+$/;
const emailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[0-9]{10}$/;
const pincodeRegex = /^[0-9]{6}$/;
const aadhaarRegex = /^[0-9]{12}$/;
const experienceRegex=/^[0-5]/;
// const aadhaarRegex = /^[0-9]{12}$/;
// const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const steps = [
  'Basic Information',
  'Address Information',
  'Additional Details',
  'KYC Verification',
  'Confirmation',
];

interface RegistrationProps {
  onBackToLogin: (data: boolean) => void;
}

const ServiceProviderRegistration: React.FC<RegistrationProps> = ({ onBackToLogin }) => {
  const handleBackLogin = (e: any) => {
    onBackToLogin(e);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [dob, setDob] = useState('');
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success'); // Use AlertColor for correct typing
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [isCookSelected, setIsCookSelected] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName:'',
    lastName: '',
    gender: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    AlternateNumber:'',
    address: '',
    buildingName:'',
    locality:'',
    street: '',
    currentLocation:'',
    nearbyLocation:'',
    // city: '',
    // state: '',
    pincode: '',
    AADHAR: '',
    pan: '',
    agreeToTerms: false,
    panImage: null, 
    housekeepingRole: '',
    description: '',
    experience: '',
    kyc : 'AADHAR',
    documentImage: null,
    otherDetails:'',
    profileImage: null,
    cookingSpeciality: '',
    age:'',
    diet:'',
    dob:'',
    });

    // Function to fetch location data and autofill the form
    const fetchLocationData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Use the latitude and longitude to fetch location data from the Geocode API
              const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: keys.api_key, // Ensure your API key is here
                },
              });
              
              // Extract the location data from the API response
              const locationData = response.data.results[0];
              
              // Extract relevant fields from the location data
              const address = locationData.formatted_address || "";
              const components = locationData.address_components;
              
              let buildingName = "", locality = "", street = "", pincode = "", nearbyLocation = "";
              
              components.forEach((component: any) => {
                if (component.types.includes("street_number")) {
                  street = component.long_name;
                } else if (component.types.includes("route")) {
                  street += ` ${component.long_name}`;
                } else if (component.types.includes("locality")) {
                  locality = component.long_name;
                } else if (component.types.includes("postal_code")) {
                  pincode = component.long_name;
                } else if (component.types.includes("administrative_area_level_1")) {
                  nearbyLocation = component.long_name;
                }
              });
    
              // Autofill form fields with the location data
              setFormData((prevState) => ({
                ...prevState,
                address: address,
                buildingName: buildingName,
                locality: locality,
                street: street,
                pincode: pincode,
                currentLocation: address,
                nearbyLocation: nearbyLocation,
              }));
            } catch (error) {
              console.error("Error fetching location data", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    
  const [errors, setErrors] = useState<FormErrors>({});
  

  // States for image previews and names
const [documentImageName, setDocumentImageName] = useState<string>('');
const [documentImagePreview, setDocumentImagePreview] = useState<string | null>(null);

  // States for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   // File change handler to update the profile picture
   const handleImageSelect = (file: File | null) => {
    setFormData((prevData) => ({ ...prevData, profileImage: file }));
  };
  
  // Click handler to trigger file input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Handle changes in service type selection
const handleServiceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setFormData((prevData) => ({ ...prevData, housekeepingRole: value }));

  // Check if 'COOK' is selected and update isCookSelected accordingly
  if (value === 'COOK') {
    setIsCookSelected(true);
  } else {
    setIsCookSelected(false);
    // Reset cooking speciality if not cook
    setFormData((prevData) => ({ ...prevData, cookingSpeciality: '' }));
  }
};

// Handle changes in cooking speciality selection
const handleCookingSpecialityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setFormData((prevData) => ({ ...prevData, cookingSpeciality: value }));
};

  
     // Handle changes in speciality selection
     const handledietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormData((prevData) => ({ ...prevData, diet: value }));
    };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === "dob") {
        // Format the date using Moment.js
        const formattedDate = moment(value).format("YYYY.MM.DD");
        setFormData((prev) => ({ ...prev, [name]: formattedDate }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };
    
  
    // Handle file upload separately
    if (type === 'file') {
      const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
      const files = target.files; // Access files property
      setFormData((prev) => ({
        ...prev,
        documentImage: files ? files[0] : null, // Set the first file or null
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {}; // Temporary object to store errors
  
    // Step 1: Basic Information Validation
    if (activeStep === 0) {
      if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        tempErrors.firstName = 'First Name is required and should contain only alphabets.';
      }
      if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        tempErrors.lastName = 'Last Name is required and should contain only alphabets.';
      }
      if (!formData.gender) {
        tempErrors.gender = 'Please select a gender.';
      }
      if (!formData.emailId || !emailIdRegex.test(formData.emailId)) {
        tempErrors.emailId = 'Valid email is required.';
      }
      if (!formData.password || !strongPasswordRegex.test(formData.password)) {
        tempErrors.password =
          'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
      }
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.mobileNo || !phoneRegex.test(formData.mobileNo)) {
        tempErrors.mobileNo = 'Phone number must be exactly 10 digits.';
      }
    }
  
    // Step 2: Address Information Validation
    if (activeStep === 1) {
      if (!formData.address) {
        tempErrors.address = 'Address is required.';
      }
      if (!formData.buildingName) {
        tempErrors.buildingName = 'Building Name is required.';
      }
      if (!formData.locality) {
        tempErrors.locality = 'Locality is required.';
      }
      if (!formData.street) {
        tempErrors.street = 'Street is required.';
      }
      if (!formData.currentLocation) {
        tempErrors.currentLocation = 'Current Location is required.';
      }
      if (!formData.pincode || !pincodeRegex.test(formData.pincode)) {
        tempErrors.pincode = 'Pin Code must be exactly 6 digits.';
      }
    }
  
    // Step 3: Additional Details Validation
    if (activeStep === 2) {
      if (!formData.agreeToTerms) {
        tempErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy.';
      }
      if (!formData.housekeepingRole) {
        tempErrors.housekeepingRole = 'Please select a service type.';
      }
      if (formData.housekeepingRole === 'COOK' && !formData.cookingSpeciality) {
        tempErrors.cookingSpeciality = 'Please select a speciality for the cook service.';
      }
      if (!formData.diet) {
        tempErrors.diet = 'Please select diet ';
      }
      if (!formData.experience) {
        tempErrors.experience = 'Please select experience ';
      }
    
      // Optional fields (uncomment if needed)
      // if (!formData.description) {
      //   tempErrors.description = 'Description is required.';
      // }
      if (!formData.experience || isNaN(Number(formData.experience))) {
        tempErrors.experience = 'Experience must be a valid number.';
      }
    }
  
    // Step 4: KYC Verification Validation
    if (activeStep === 3) {
      if (!formData.AADHAR || !aadhaarRegex.test(formData.AADHAR)) {
        tempErrors.kyc = 'Aadhaar number must be exactly 12 digits.';
      }
      // if (!formData.documentImage) {
      //   tempErrors.documentImage = "Please upload a document image.";
      // }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // const handleNext = () => {
  //   if (validateForm ()) {
  //     setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  //     if (activeStep === steps.length - 1) {
  //       setSnackbarMessage('Registration Successful!');
  //       setSnackbarOpen(true);
  //       // Optionally, reset form data or redirect
  //     }
  //   }
  // };

    // Get formatted Date of Birth (YYYY-MM-DD for backend)
   // Validate age (dob) using moment
  const validateAge = (dob) => {
    if (!dob) return false;

    const birthDate = moment(dob, "YYYY-MM-DD");
    const today = moment();
    const age = today.diff(birthDate, "years");

    console.log("Entered DOB:", dob);
    console.log("Calculated Age:", age);

    return age >= 18;
  };

  // Handle DOB Change
  const handleDOBChange = (dob) => {
    setFormData((prev) => ({ ...prev, dob }));

    // Validate age and set field disabled status
    const isValidAge = validateAge(dob);

    if (!isValidAge) {
      setIsFieldsDisabled(true);
      setSnackbarMessage("You must be at least 18 years old to proceed.");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
    } else {
      setIsFieldsDisabled(false);
      setSnackbarOpen(false);
    }
  };


  // Handle Next Button
  const handleNext = () => {
    // Validate the entire form first
    if (!validateForm()) {
      // setSnackbarOpen(true);
      // setSnackbarMessage('Please fill all required fields correctly');
      // setSnackbarSeverity('error');
      return; // Stop progression if any field is invalid
    }
  
    // Validate age only if on Step 0
    if (activeStep === 0) {
      const isValidAge = validateAge(formData.dob);
  
      if (!isValidAge) {
        setSnackbarOpen(true);
        setSnackbarMessage('You must be at least 18 years old to proceed');
        setSnackbarSeverity('error');
        return; // Stop progression if age is invalid
      }
    }
  
    // Proceed to the next step if all validations pass
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  
    // Optionally, show a success message at the last step
    if (activeStep === steps.length - 1) {
      setSnackbarMessage('Registration Successful!');
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Filter out empty values from the form data
    const filteredPayload = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "" && value !== null && value !== undefined)
    );

    // Form validation (optional)
    if (validateForm()) {
      try {
        const response = await axiosInstance.post(
          "/api/serviceproviders/serviceprovider/add",
          filteredPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        onBackToLogin(true);
        // Update Snackbar for success
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Service provider added successfully!");
        console.log("Success:", response.data);
        
      } catch (error) {
        // Update Snackbar for error
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to add service provider. Please try again.");
        console.error("Error submitting form:", error);
      }
    } else {
      // Update Snackbar for validation error
      setSnackbarOpen(true);
      setSnackbarSeverity("warning");
      setSnackbarMessage("Please fill out all required fields.");
    }
  };
  
  

   // Close snackbar function
   const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            
        {/* Profile Picture Upload Section */}
      <Grid item xs={12}>
        <ProfileImageUpload onImageSelect={handleImageSelect} />
      </Grid>

      <Grid item xs={12}>
        <TextField
          placeholder="First Name *"
          name="firstName"
          fullWidth
          required
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          placeholder="Middle Name"
          name="middleName"
          fullWidth
          value={formData.middleName}
          onChange={handleChange}
          disabled={isFieldsDisabled}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          placeholder="Last Name *"
          name="lastName"
          fullWidth
          required
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          disabled={isFieldsDisabled}
        />
      </Grid>
   {/* Age / Date of Birth Field */}
   <Grid item xs={12} sm={6}>
   <TextField
      label="Date of Birth"
      name="dob"
      type="date"
      fullWidth
      required
      value={formData.dob}
      onChange={(e) => handleDOBChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset" error={!!errors.gender}>
          <FormLabel component="legend">Gender *</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            
          >
            <FormControlLabel value="MALE" control={<Radio />} label="Male"  disabled={isFieldsDisabled}/>
            <FormControlLabel value="FEMALE" control={<Radio />} label="Female"  disabled={isFieldsDisabled}/>
            <FormControlLabel value="OTHER" control={<Radio />} label="Other"  disabled={isFieldsDisabled}/>
          </RadioGroup>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          placeholder="Email *"
          name="emailId"
          fullWidth
          required
          value={formData.emailId}
          onChange={handleChange}
          error={!!errors.emailId}
          helperText={errors.emailId}
          disabled={isFieldsDisabled}
        />
      </Grid>

      <Grid item xs={12}>
              <TextField
                placeholder="Password *"
                type={showPassword ? 'text' : 'password'}
                name="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isFieldsDisabled}
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
                placeholder="Confirm Password *"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={isFieldsDisabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Mobile Number *"
                name="mobileNo"
                fullWidth
                required
                value={formData.mobileNo}
                onChange={handleChange}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Alternate Number"
                name="AlternateNumber"
                fullWidth
                value={formData.AlternateNumber}
                disabled={isFieldsDisabled}
                onChange={handleChange}
                // error={!!errors.phoneNumber}
                // helperText={errors.phoneNumber}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} className="pt-4">
              <TextField
                placeholder="Address *"
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
                placeholder="BuildingName *"
                name="buildingName"
                fullWidth
                required
                value={formData.buildingName}
                onChange={handleChange}
                error={!!errors.buildingName}
                helperText={errors.buildingName}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                placeholder="Locality *"
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
                placeholder="Street *"
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
                placeholder="Pincode *"
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
                placeholder="CurrentLocation *"
                name="currentLocation"
                fullWidth
                required
                value={formData.currentLocation}
                onChange={handleChange}
                error={!!errors.currentLocation}
                helperText={errors.currentLocation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="NearbyLocation"
                name="nearbyLocation"
                fullWidth
                value={formData.nearbyLocation}
                onChange={handleChange}
                // error={!!errors.nearbyLocation}
                // helperText={errors.nearbyLocation}
              />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={fetchLocationData}>
  Fetch Location
</Button>

      </Grid>
            {/* <Grid item xs={12} sm={6}>
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
            </Grid> */}
          </Grid>
        );
      case 2: // Additional Details
      return (
        <>
  <Grid container spacing={2}>
     {/* Service Type Dropdown */}
     <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select Service Type"
            name="housekeepingRole"
            fullWidth
            value={formData.housekeepingRole}
            onChange={handleServiceTypeChange}
            error={!!errors.housekeepingRole}
            helperText={errors.housekeepingRole}
            required
          >
            <MenuItem value="" disabled>
              Select Service Type
            </MenuItem>
            <MenuItem value="COOK">Cook</MenuItem>
            <MenuItem value="NANNY">Nanny</MenuItem>
            <MenuItem value="MAID">Maid</MenuItem>
          </TextField>
        </Grid>
        {/* Speciality Radio Buttons (Visible if 'COOK' is selected) */}
        {/* {isCookSelected && (
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" error={!!errors.speciality} required>
              <FormLabel component="legend">Speciality</FormLabel>
              <RadioGroup
                name="speciality"
                value={formData.speciality}
                onChange={handleSpecialityChange}
              >
                <FormControlLabel value="veg" control={<Radio />} label="Veg" />
                <FormControlLabel value="non-veg" control={<Radio />} label="Non-Veg" />
                <FormControlLabel value="both" control={<Radio />} label="Both" />
              </RadioGroup>
              <FormHelperText>{errors.speciality}</FormHelperText>
            </FormControl>
          </Grid> */}
                   {isCookSelected && (
  <Grid item xs={12} sm={6}>
    <FormControl component="fieldset" error={!!errors.cookingSpeciality} required>
      <FormLabel component="legend">Cooking Speciality</FormLabel>
      <RadioGroup
        name="speciality"
        value={formData.cookingSpeciality}
        onChange={handleCookingSpecialityChange}
      >
        <FormControlLabel
          value="VEG"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/veg.png" // Replace with the path for your veg image
                alt="Veg"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Veg
            </div>
          }
        />
        <FormControlLabel
          value="NONVEG"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                    src="/nonveg.png" // Correct path to your nonveg image
                alt="Non-Veg"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Non-Veg
            </div>
          }
        />
        <FormControlLabel
          value="BOTH"
          control={<Radio />}
          label="Both"
        />
      </RadioGroup>
      <FormHelperText>{errors.cookingSpeciality}</FormHelperText>
    </FormControl>
  </Grid>
)}
  <Grid item xs={12} >
    <FormControl component="fieldset" error={!!errors.diet} required>
      <FormLabel component="legend">Diet</FormLabel>
      <RadioGroup
        name="diet"
        value={formData.diet}
        onChange={handledietChange}
      >
        <FormControlLabel
          value="VEG"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/veg.png" // Replace with the path for your veg image
                alt="Veg"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Veg
            </div>
          }
        />
        <FormControlLabel
          value="NONVEG"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                    src="/nonveg.png" // Correct path to your nonveg image
                alt="Non-Veg"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Non-Veg
            </div>
          }
        />
        <FormControlLabel
          value="BOTH"
          control={<Radio />}
          label="Both"
        />
      </RadioGroup>
      <FormHelperText>{errors.diet}</FormHelperText>
    </FormControl>
  </Grid>
  <Grid item xs={12}>
     <ChipInput options={availableLanguages} onChange={handleChipChange} label="languages" placeholder="Pick/Type Your Languages" />
  </Grid>
    {/* Description Field */}
    <Grid item xs={12}>
      <TextField
        placeholder="Description"
        name="description"
        fullWidth
        value={formData.description}
        onChange={handleChange}
      />
    </Grid>

    {/* Experience Field */}
    <Grid item xs={12} sm={6}>
      <TextField
        placeholder="Experience"
        name="experience"
        fullWidth
        required
        value={formData.experience}
        onChange={handleChange}
        // error={!!errors.experience}
        // helperText={errors.experience || "Years in business or relevant experience"}
      />
    </Grid>

    {/* Checkbox for Terms of Service */}
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreeToTerms}
            onChange={handleChange}
            name="agreeToTerms"
            required
          />
        }
        label="I agree to the Terms of Service and Privacy Policy"
      />
      {errors.agreeToTerms && (
        <Typography color="error">{errors.agreeToTerms}</Typography>
      )}
    </Grid>
  </Grid>
</>
      );


      case 3:
        return (
          <Grid container spacing={2}>
       {/* Document Type Selection */}
           <Grid item xs={12}>
              <TextField
                placeholder="Aadhaar Number *"
                name="AADHAR"
                fullWidth
                required
                value={formData.AADHAR}
                onChange={handleChange}
                error={!!errors.kyc}
                helperText={errors.kyc}
              />
            </Grid>
        {/* Document Image Upload */}
        <Grid item xs={12}>
          <Input
            type="file"
            inputProps={{ accept: "image/*" }}
            name="documentImage"
            onChange={handleChange}
            required
          />
          {formData.documentImage && (
            <Typography variant="body2">
              Selected File: {formData.documentImage.name}
            </Typography>
          )}
          {formData.documentImage && (
            <Box mt={2}>
              <Typography variant="h6">Document Preview:</Typography>
              <img
                src={URL.createObjectURL(formData.documentImage)}
                alt="Document"
                width="300"
              />
            </Box>
          )}
          {/* {errors.documentImage && (
            <Typography color="error">{errors.documentImage}</Typography>
          )} */}
        </Grid>

       {/* Other Details (Optional for PAN or DL) */}
       {(formData.kyc === "PAN" || formData.kyc === "DL") && (
          <Grid item xs={12}>
            <TextField
              placeholder="Other Details"
              name="otherDetails"
              fullWidth
              value={formData.otherDetails}
              onChange={handleChange}
            />
          </Grid>
        )}
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

   

  // const handleBackLogin = (data: boolean) => {
  //   onBackToLogin(data);
  // };

  return (
    <>
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, display: 'block' }}>
      <Typography variant="h5" gutterBottom className="text-center pb-3 ">
          Service Provider Registration
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel style={{ overflow: 'overlay' }}>
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
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            endIcon={<ArrowForward />}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </form>
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
      <Typography variant="h6">
          Already have an account?
          <Button
            className="text-blue-400 ml-2 underline"
            onClick={(e) => handleBackLogin("true")}
          >
            Sign in
          </Button>
        </Typography>
      </div>
    </>
  );
};

export default ServiceProviderRegistration;


{/* <h3 className="dark:text-gray-300">
            Already have an account?{" "}
            <button
              className="text-blue-500 ml-2 underline"
              onClick={(e) => handleBackLogin("true")}
            >
              Sign in
            </button>
          </h3> */}
{/* <Typography variant="h6">
          Already have an account?
          <Button
            className="text-blue-400 ml-2 underline"
            onClick={(e) => handleBackLogin("false")}
          >
            Sign in
          </Button>
        </Typography> */}