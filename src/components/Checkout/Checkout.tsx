import { useEffect, useState } from "react";

// Define the structure of each item in selectedItems
interface Item {
  entry: {
    serviceCategory: string;
    type: string;
    serviceType: string;
    subCategory: string;
    peopleRange: string;
    frequency: number;
    pricePerMonth: number;
  };
  price: number;
}

interface CheckoutProps {
  selectedcheckout: { selectedItems: Item[] }; // selectedItems is an array of Item objects
}

const Checkout: React.FC<CheckoutProps> = ({ selectedcheckout }) => {
  const [checkout, setCheckout] = useState<Item[]>([]);

  useEffect(() => {
    // Extract selectedItems from selectedcheckout and set it to checkout state
    if (selectedcheckout.selectedItems && Array.isArray(selectedcheckout.selectedItems)) {
      setCheckout(selectedcheckout.selectedItems);
    } else {
      setCheckout([]); // Default to empty array if no selectedItems
    }
  }, [selectedcheckout]);

  return (
    <div>
        THIS IS WORK IN PROGRESS
      {checkout.length === 0 ? (
        <p>No items selected</p>
      ) : (
        checkout.map((item, index) => (
          <div key={index} className="selected-item">
            <h3>Item {index + 1}</h3>
            <div>
              <strong>Service Category:</strong> {item.entry.serviceCategory}
            </div>
            <div>
              <strong>Type:</strong> {item.entry.type}
            </div>
            <div>
              <strong>Service Type:</strong> {item.entry.serviceType}
            </div>
            <div>
              <strong>Sub Category:</strong> {item.entry.subCategory}
            </div>
            <div>
              <strong>People Range:</strong> {item.entry.peopleRange}
            </div>
            <div>
              <strong>Frequency:</strong> {item.entry.frequency} times a week
            </div>
            <div>
              <strong>Price per Month:</strong> ${item.entry.pricePerMonth}
            </div>
            <div>
              <strong>Total Price:</strong> ${item.price}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Checkout;
