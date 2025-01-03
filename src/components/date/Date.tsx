import React, { useState } from "react";

interface DateComponentProps {
  onDateSelected?: (date: string) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({ onDateSelected }) => {
  const [startDate, setStartDate] = useState<string | null>(null);

  console.log("Rendering DateComponent..."); // Log rendering status

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
    console.log("Date selected:", date); // Log the date on change
    if (onDateSelected) onDateSelected(date);
  };

  return (
    <div>
      <label htmlFor="startDate">Select a Date</label>
      <input
        id="startDate"
        type="date"
        value={startDate || ""}
        onChange={handleDateChange}
        required
        style={{ padding: "8px", fontSize: "16px" }}
      />
    </div>
  );
};

export default DateComponent;
