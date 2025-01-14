import { Card, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingDetails } from "../../types/engagementRequest";
import { Bookingtype } from "../../types/bookingTypeData";
import axiosInstance from "../../services/axiosInstance";

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

interface ChildComponentProps {
  providerDetails : any;
}

const Checkout : React.FC<ChildComponentProps> = ({ providerDetails }) => {
  const [checkout, setCheckout] = useState<Item[]>([]);
  const [bookingTypeFromSelection , setBookingTypeFromSelection] = useState<Bookingtype>();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  
  const cart = useSelector((state : any) => state.cart?.value);
  const bookingType = useSelector((state : any) => state.bookingType?.value)
  const user = useSelector((state : any) => state.user?.value);
  const dispatch = useDispatch();
  console.log("User details from Redux:", user);
  const customerId = user?.customerDetails?.customerId || null;
  console.log("Extracted Customer ID:", customerId);

  const bookingDetails: BookingDetails = {
    serviceProviderId: 0,
    customerId: 0,
    startDate: "",
    endDate: "",
    engagements: "",
    timeslot: "",
    monthlyAmount: 0,
    paymentMode: "CASH",
    bookingType: "",
    responsibilities: [],
  };
  

  useEffect(() => {
      setCheckout(cart)
      setBookingTypeFromSelection(bookingType)
      console.log("bookingType ",bookingType)
    }, [cart , bookingType]);

  const handleRemoveItem = (index: number) => {
    // Remove item at the specified index
    const updatedCheckout = checkout.filter((_, i) => i !== index);
    setCheckout(updatedCheckout);
  };

  const handleClose = () =>{
    setOpenSnackbar(false)
  }


  const handleCheckout = async () => {
    console.log("Provider ----------" , providerDetails)
    console.log(checkout)
    console.log("-------------------------")
    console.log(bookingType)
    bookingDetails.serviceProviderId = providerDetails.serviceproviderId;
    bookingDetails.customerId = customerId; // Assigning dynamically fetched customerId
    bookingDetails.startDate = bookingTypeFromSelection?.startDate;
    bookingDetails.endDate = bookingTypeFromSelection?.endDate;
    bookingDetails.engagements = checkout[0].entry.type;
    bookingDetails.paymentMode= "CASH";
    bookingDetails.bookingType = bookingType.bookingPreference;
    bookingDetails.serviceeType = checkout[0].entry.type;
    bookingDetails.timeslot = bookingDetails.timeslot = `${bookingType.morningSelection}:00, ${bookingType.eveningSelection}:00`; 
    let calculatedAmount = 0;
    checkout.forEach(i => {
      bookingDetails.responsibilities?.push(i.entry)
      calculatedAmount = calculatedAmount + i.price;
    })
    bookingDetails.monthlyAmount = calculatedAmount;
    // 
    console.log('-------- Booking Details ----------')
    console.log(bookingDetails)
    // Handle the Checkout action
    // console.log("Proceeding to checkout with items:", checkout);
    // Implement your checkout logic here

    const response = await axiosInstance.post(
      "/api/serviceproviders/engagement/add",
      bookingDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.status === 201){
        setSnackbarMessage(response.data || "Login successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
    }

    // console.log(response)
  };

  return (
    <><Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginBottom: '20px', overflow: "scroll" }}>
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '20px', paddingBottom: "15px", paddingRight: "15px" }}>
          <Button variant="contained" color="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
          sx={{ marginTop: '60px' }} 
        >
        
          <Alert
            onClose={handleClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
</>
  );
};

export default Checkout;