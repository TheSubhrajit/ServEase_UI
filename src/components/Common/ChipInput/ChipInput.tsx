import React, { useState, useEffect } from 'react';
import { TextField, Chip, Autocomplete } from '@mui/material';

interface ChipInputProps {
  options: string[]; // The list of options (chips)
  onChange: (selectedChips: string[]) => void; // Callback to send the selected chips data back to the parent
  placeholder?: string; // Optional placeholder text for the input
  label?: string; // Optional label for the chips
}

const ChipInput: React.FC<ChipInputProps> = ({ options, onChange, placeholder = 'Select Favorites', label = 'Chip' }) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  // Update the parent whenever the selected chips change
  useEffect(() => {
    onChange(selectedChips);
  }, [selectedChips, onChange]);

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-filled"
        options={options}
        value={selectedChips}
        onChange={(event, newValue) => setSelectedChips(newValue)}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="outlined" label={option} key={key} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
            placeholder={placeholder} // Use the placeholder prop here
          />
        )}
      />
    </div>
  );
};

export default ChipInput;
