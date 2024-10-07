import { Autocomplete, TextField, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // <-- Location icon import
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { keys } from '../../env/env';
import './Header.css'; // Import your CSS file
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Header: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const handleClick = (e: any) => {
    sendDataToParent(e);
  };

  const [location, setLocation] = useState(''); // Holds the actual location text
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
              params: {
                latlng: `${latitude},${longitude}`,
                key: keys.api_key
              }
            });
            const address = response.data.results[0]?.formatted_address;
            setLocation(address); // Set the location text
          } catch (error) {
            console.log("Failed to fetch location");
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      setError(null);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(CORS_PROXY + PLACES_API_URL, {
          params: {
            input: inputValue,
            key: keys.api_key,
            types: 'geocode',
          },
        });

        if (response.data.status === 'OK') {
          const sub = response.data.predictions.map((res) => res.description);
          setSuggestions(sub);
        } else {
          setError(response.data.error_message || 'An error occurred');
          setSuggestions([]);
        }
      } catch (error) {
        console.log('Failed to fetch suggestions');
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const handleInputChange = (event: React.SyntheticEvent, newValue: string) => {
    setInputValue(newValue);
  };

  const handleChange = (event: any, newValue: any) => {
    if (newValue) {
      setLocation(newValue); // Update the location state with the selected value
    }
  };

  // Account menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Navbar className="header" expand="lg">
        <div className="header-alignment">
          {/* Logo and Text container */}
    <div className="logo-container">
      <img src="../logo.png" className="logo-style" alt="logo" />
      <div className="logo-text">
        <span className="home-text">Home</span>
        <span className="servease-text">ServEase</span>
      </div>
    </div>
          <div className="dropdowns-container">
            <DropdownButton
              id="dropdown-button"
              title={
                <div className="location-icon-text">
                  <LocationOnIcon /> {/* Location icon */}
                  {location ? location : "Location"} {/* Display location text or fallback */}
                </div>
              }
              className="dropdown-left"
              variant="outlined"
            >
              <Dropdown.Item>
                <div className="autocomplete">
                  <Autocomplete
                    onInputChange={handleInputChange} // Updated function with the correct signature
                    onChange={handleChange}
                    options={suggestions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={location ? location : "Enter location"} // Show location in the input field as well
                      />
                    )}
                  />
                </div>
              </Dropdown.Item>
            </DropdownButton>

            {/* Account icon with dropdown menu */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleClick("login")}>Login / Register</MenuItem>
              <MenuItem>Privacy Policy</MenuItem>
              <MenuItem>Notification</MenuItem>
              <MenuItem onClick={() => handleClick("sign_out")}>Sign Out</MenuItem>
              <MenuItem onClick={() => handleClick("admin")}>Admin - For Demo purpose Only</MenuItem>
            </Menu>
          </div>
        </div>
      </Navbar>
    </>
  );
};
