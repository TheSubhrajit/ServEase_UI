import { Autocomplete, Button, TextField } from "@mui/material";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { keys } from '../../env/env';
import './Header.css'

export const Header = () => {
  const [location, setLocation] = useState(null);
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
                key: keys.api_key // Replace with your API key
              }
            });
            const address = response.data.results[0]?.formatted_address;
            console.log(response.data)
            setLocation(address);
          } catch (error) {
            console.log("Failed to fetch location")
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
  const [selectedPlace, setSelectedPlace] = useState(null);

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  useEffect(() => {
    if (inputValue && inputValue?.trim() === '') {
      setSuggestions([]);
      setError(null);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(PLACES_API_URL, {
          params: {
            input: inputValue,
            key: keys.api_key,
            types: 'geocode',
          },
        });

        if (response.data.status === 'OK') {
          //setSuggestions(response.data.predictions);
          const sub = response.data.predictions.map(res => res.description)
          setSuggestions(sub)
          
        } else {
          setError(response.data.error_message || 'An error occurred');
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
        console.log('Failed to fetch suggestions');
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedPlace(suggestion);
    setInputValue(suggestion.description);
    setSuggestions([]);
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      console.log('Selected Option:', newValue);
      // Perform any additional actions with the selected option here
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Cooks</Nav.Link>
            <Nav.Link href="#features">Maids</Nav.Link>
            <Nav.Link href="#pricing">Nanny</Nav.Link>
          </Nav> */}
          {/* <div className="location">
          <Button variant="outlined" startIcon={<MyLocationIcon />}>
  <p>{location}</p>
</Button>
          </div> */}
          
          <div className="autocomplete">
          <Autocomplete
          color="white"
  disablePortal

  onInputChange={handleInputChange}
  onChange={handleChange}
  options={suggestions}
  sx={{ width: 300 }}
  clearIcon
  renderInput={(params) => <TextField {...params} label={location} 
  />}
/>
          </div>
          
          
    
        </Container>
      </Navbar>
    </>
  );
};
