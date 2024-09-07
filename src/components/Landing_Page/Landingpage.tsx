import { Tooltip } from '@mui/material'
import './Landingpage.css'

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useState } from 'react';

interface ChildComponentProps {
    sendDataToParent: (data: string) => void; // Adjust the type if needed
  }

export const Landingpage: React.FC<ChildComponentProps> = ({ sendDataToParent }) =>{

    const [state , setstate ] = useState({address: ''});


    const handleClick = (e:any) =>{
        sendDataToParent(e)
    }

    const handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };

      const handleChange = address => {
        setstate({ address });
      };
   
    
    
    return (
        <section className="landing-container">
            <Tooltip title="Cook" arrow>
            <div className='selectors' onClick={e =>  handleClick('cook')}>
            <img src='../cooking.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Maid" arrow>
            <div className='selectors' onClick={e =>  handleClick('maid')}>
                <img src='../cleaner.png'></img>
            </div>
            </Tooltip>
            <Tooltip title="Nanny" arrow>
            <div className='selectors' onClick={e =>  handleClick('nanny')}>
            <img src='../babysitter.png'></img>
            </div>
            </Tooltip>

            <PlacesAutocomplete
        value={state.address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
            
        </section>
    )
    
}