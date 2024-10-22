import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material'; // Material UI TextField for styling

interface GooglePlacesAutocompleteProps {
  onSelectPlace: (place: google.maps.places.PlaceResult, lat: number, lng: number) => void; // Callback when a place is selected
  placeholder?: string; // Custom placeholder for the input
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onSelectPlace,
  placeholder = "Search for a location",
}) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to the input element
  const [address, setAddress] = useState<string>(''); // Store address text for display
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]); // Store suggestions

  useEffect(() => {
    if (window.google && inputRef.current) {
      // Initialize Google Places Autocomplete when input is rendered
      const autoComplete = new window.google.maps.places.Autocomplete(inputRef.current);
      setAutocomplete(autoComplete);

      // Add event listener to handle place selection
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location?.lat() ?? 0;  // Fallback to 0 if lat is undefined
          const lng = place.geometry.location?.lng() ?? 0;  // Fallback to 0 if lng is undefined

          onSelectPlace(place, lat, lng); // Pass place, lat, and lng to parent component
          setAddress(place.formatted_address || ''); // Optionally set address display
          setSuggestions([]); // Clear suggestions after selection (close the dropdown)
        }
      });

      // Update suggestions as the user types
      if (inputRef.current) {
        inputRef.current.addEventListener('input', () => {
          const predictionsService = new window.google.maps.places.AutocompleteService();
          predictionsService.getPlacePredictions({ input: inputRef.current?.value ?? '' }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            }
          });
        });
      }
    }
  }, [onSelectPlace]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value); // Update address as the user types
  };

  // Render the suggestions inside the dialog box
  const renderSuggestions = () => {
    if (suggestions.length > 0) {
      return (
        <div
          style={{
            position: 'absolute',
            top: '100%', // Position below the input field
            left: 0,
            right: 0,
            zIndex: 1500, // Ensure it shows above other content inside the dialog
            background: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            maxHeight: '200px', // Limit height of suggestions container
            overflowY: 'auto', // Make suggestions scrollable
            borderRadius: '4px', // Optional for rounded corners
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => {
                // Use the geocode method to get the full place (with geometry)
                const service = new google.maps.places.PlacesService(document.createElement('div'));
                service.getDetails({ placeId: suggestion.place_id }, (place, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry) {
                    const lat = place.geometry.location?.lat() ?? 0;  // Fallback to 0 if lat is undefined
                    const lng = place.geometry.location?.lng() ?? 0;  // Fallback to 0 if lng is undefined

                    onSelectPlace(place, lat, lng); // Pass place, lat, and lng to parent component
                    setAddress(place.formatted_address || ''); // Optionally set address display
                    setSuggestions([]); // Close the dropdown
                  }
                });
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} // Hover effect
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'} // Reset on leave
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Google Places Input */}
      <TextField
        inputRef={inputRef}
        label={placeholder}
        variant="outlined"
        fullWidth
        onChange={handleInputChange} // Handle input change
        value={address} // Bind input to address state
        style={{
          zIndex: 1000, // Ensure input stays on top
          position: 'relative',
        }}
      />

      {/* Render the suggestions inside the dialog */}
      {renderSuggestions()}
    </div>
  );
};

export default GooglePlacesAutocomplete;
