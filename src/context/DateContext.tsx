import React, { createContext, useContext, useState, ReactNode } from "react";

// Create context for managing the selected date
const DateContext = createContext<{
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  selectedDate: null,
  setSelectedDate: () => {}, // Default empty function
});

// Context provider component
interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Custom hook to access context data
export const useDateContext = () => {
  return useContext(DateContext);
};// DateContext.tsx (or a similar file)