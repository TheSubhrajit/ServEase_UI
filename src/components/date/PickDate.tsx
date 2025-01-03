import React from "react";

interface PickDateComponentProps {
  selectedDate: string;
}

const PickDateComponent: React.FC<PickDateComponentProps> = ({ selectedDate }) => {
  console.log("Rendering PickDateComponent with selectedDate:", selectedDate); // Debug log

  return (
    <div>
      <h2>Selected Date: {selectedDate}</h2>
    </div>
  );
};

export default PickDateComponent;
