import { Card, Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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


const Checkout = () => {
  const [checkout, setCheckout] = useState<Item[]>([]);

  
  const cart = useSelector((state : any) => state.cart?.value);

  useEffect(() => {
      setCheckout(cart)
    }, [cart]);

  const handleRemoveItem = (index: number) => {
    // Remove item at the specified index
    const updatedCheckout = checkout.filter((_, i) => i !== index);
    setCheckout(updatedCheckout);
  };


  const handleCheckout = () => {
    // Handle the Checkout action
    console.log("Proceeding to checkout with items:", checkout);
    // Implement your checkout logic here
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginBottom: '20px' , overflow: "scroll" }}>
      {checkout.length === 0 ? (
        <Typography variant="h6">No items selected</Typography>
      ) : (
        checkout.map((item, index) => (
          <Box key={index} sx={{ width: '80%', display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <Card sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              {/* Service Information */}
              <Typography variant="body1" gutterBottom>
                <strong>Service Category:</strong> {item.entry.serviceCategory}
              </Typography>
              <div><strong>Type:</strong> {item.entry.type}</div>
              <div><strong>Service Type:</strong> {item.entry.serviceType}</div>
              <div><strong>Sub Category:</strong> {item.entry.subCategory}</div>
              <div><strong>People Range:</strong> {item.entry.peopleRange}</div>
              <div><strong>Frequency:</strong> {item.entry.frequency} times a week</div>
              <div><strong>Price per Month:</strong> Rs.{item.entry.pricePerMonth}</div>
              <div><strong>Total Price:</strong> Rs.{item.price}</div>
              <hr />
              
              {/* Buttons Section */}
              <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 'auto' }}>
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </Box>
            </Card>
          </Box>
        ))
      )}

      {/* Checkout Button at the bottom */}
      {checkout.length > 0 && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '20px', paddingBottom:"15px", paddingRight:"15px" }}>
          <Button variant="contained" color="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Checkout;
