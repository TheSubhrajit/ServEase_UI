export type BookingDetails = {
    id?: number;
    serviceProviderId?: number | null;
    customerId?: number;
    startDate: string;  // Assuming startDate is a string in ISO format
    endDate: string;    // Assuming endDate is a string in ISO format
    engagements?: string;
    timeslot?: string;
    monthlyAmount?: number;
    paymentMode?: "CASH" | "CARD" | "ONLINE";  // Assuming predefined payment modes
    bookingType?: string;
    bookingDate?: string;  // ISO format date-time
    responsibilities?: Responsibility[];
    serviceType?: string;
    mealType?: string;
    noOfPersons?: string;
    experience?: string;
    childAge?: string;
    serviceeType?: string;
    active?: boolean;  // True or False
  };

  type Responsibility = {
    serviceCategory: string;
    type: string;
    serviceType: string;
    subCategory: string;
    peopleRange: string;
    frequency: number;
    pricePerMonth: number;
  };  
  