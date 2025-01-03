import React, { createContext, useState, ReactNode, useContext } from "react";

interface BookingContextType {
  startDate: string | null;
  endDate: string | null;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultContextValue: BookingContextType = {
  startDate: null,
  endDate: null,
  setStartDate: () => {},
  setEndDate: () => {},
};

const BookingContext = createContext<BookingContextType>(defaultContextValue);

interface BookingContextProviderProps {
  children: ReactNode;
}

const BookingContextProvider: React.FC<BookingContextProviderProps> = ({ children }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  console.log('Current Start Date in Context:', startDate);  // Log current start date
  console.log('Current End Date in Context:', endDate);
  return (
    <BookingContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => useContext(BookingContext);

export { BookingContextProvider, useBookingContext, BookingContext };
