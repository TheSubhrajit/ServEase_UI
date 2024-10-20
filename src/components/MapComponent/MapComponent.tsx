import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string>(''); // To store the fetched address/pincode
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null); // Autocomplete instance

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const defaultCenter: Location = {
    lat: 40.748817, // Default to New York City
    lng: -73.985428, // Default to New York City
  };

  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to the input element for Autocomplete

  useEffect(() => {
    // If geolocation is available, get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setUserLocation(defaultCenter); // Fallback location
        }
      );
    } else {
      setUserLocation(defaultCenter); // Fallback if geolocation is unsupported
    }
  }, []);

  // Initialize Autocomplete when the component is mounted
  useEffect(() => {
    if (inputRef.current && window.google) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current);
      setAutocomplete(autoCompleteInstance);

      // Add listener to update map when place is selected
      autoCompleteInstance.addListener('place_changed', () => {
        const place = autoCompleteInstance.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location?.lat() || 0;
          const lng = place.geometry.location?.lng() || 0;
          setClickedLocation({ lat, lng });
          reverseGeocode(lat, lng); // Get the address of the selected location
        }
      });
    }
  }, []);

  // Function to handle map click and mark location
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() || 0;
    const lng = event.latLng?.lng() || 0;
    const location = { lat, lng };
    setClickedLocation(location);
    reverseGeocode(lat, lng); // Perform reverse geocoding
  };

  // Function to perform reverse geocoding and fetch the address/pincode
  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder
      .geocode({ location: latLng })
      .then((response) => {
        if (response.results[0]) {
          const addressComponents = response.results[0].address_components;
          const pincodeComponent = addressComponents.find((component) =>
            component.types.includes('postal_code')
          );
          if (pincodeComponent) {
            setAddress(`Address: ${response.results[0].formatted_address}, Pincode: ${pincodeComponent.long_name}`);
            console.log(`Address: ${response.results[0].formatted_address}, Pincode: ${pincodeComponent.long_name}`);
          } else {
            setAddress(`Address: ${response.results[0].formatted_address}, Pincode: Not available`);
            console.log(`Address: ${response.results[0].formatted_address}, Pincode: Not available`);
          }
        } else {
          setAddress('No address found for this location.');
        }
      })
      .catch((error) => {
        console.error('Geocoder failed due to: ', error);
        setAddress('Error fetching address.');
      });
  };

  return (
    <div>
      <div>
        {/* Autocomplete Input Field */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a location"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={clickedLocation || userLocation || defaultCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {/* Mark clicked location */}
        {clickedLocation && <Marker position={clickedLocation} />}
      </GoogleMap>

      {/* Display the address/pincode */}
      <div>
        <h3>Location Information:</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default MapComponent;
