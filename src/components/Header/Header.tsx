import { Autocomplete, TextField, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { keys } from '../../env/env';
import './Header.css'; 

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Header: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const handleClick = (e: any) => {
    sendDataToParent(e);
  };

  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const [accountEl, setAccountEl] = useState<null | HTMLElement>(null); 

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
            setLocation(address);
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
      setLocation(newValue); 
    }
  };

  const handleLocationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleLocationMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountEl(event.currentTarget); 
  };

  const handleAccountMenuClose = () => {
    setAccountEl(null); 
  };

  return (
    <>
      <Navbar className="header" expand="lg">
        <div className="header-alignment">
          <div className="logo-container">
            <img src="../logo.png" className="logo-style" alt="logo" />
            <div className="logo-text">
              <span className="home-text">Home</span>
              <span className="servease-text">ServEase</span>
            </div>
          </div>

          <div className="dropdowns-container">
            <IconButton
              size="large"
              edge="end"
              aria-label="location"
              onClick={handleLocationMenuOpen} 
              color="inherit"
              sx={{ width: 60, height: 60 }} // Directly set size on IconButton
            >
              <LocationOnIcon sx={{ fontSize: 30, color: '#0d6efd' }} />{/* Increase icon size using sx */}
            </IconButton>

            <Menu
              id="location-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLocationMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem>
                <div className="autocomplete">
                  <Autocomplete
                    onInputChange={handleInputChange} 
                    onChange={handleChange}
                    options={suggestions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={location ? location : "Enter location"} 
                      />
                    )}
                  />
                </div>
              </MenuItem>
            </Menu>

            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              onClick={handleAccountMenuOpen}
              color="inherit"
              sx={{ width: 60, height: 60 }} // Directly set size on IconButton
            >
              <AccountCircle sx={{ fontSize: 30, color: '#0d6efd' }} /> {/* Increase icon size using sx */}
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={accountEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(accountEl)}
              onClose={handleAccountMenuClose}
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
