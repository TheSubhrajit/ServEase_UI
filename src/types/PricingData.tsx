export type PricingData = {
    serviceType: string;
    subCategory?: string;
    peopleRange?: string;
    size?: number | string;
    frequency: number | string;
    pricePerMonth: number;
    jobDescription?:string;
  };