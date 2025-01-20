import { Card, Button, Box, Typography, Snackbar, Alert, IconButton, Divider, Tooltip, Container, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingDetails } from "../../types/engagementRequest";
import { Bookingtype } from "../../types/bookingTypeData";
import axiosInstance from "../../services/axiosInstance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

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
  const grandTotal = checkout.reduce((sum, service) => sum + service.price, 0);
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", marginBottom: "20px" }}>
{/* Header Section */}
<div style={{
  textAlign: "center",
  marginBottom: "30px",
}}>
  <Typography
    variant="h4"
    sx={{
      fontWeight: "bold",
      fontFamily: "'Poppins', sans-serif",
      color: "#1565C0", // Rich, professional blue
      textTransform: "capitalize", // Balanced capitalization
      letterSpacing: "0.75px", // Slight spacing for refinement
      fontSize: "1.5rem",
    }}
  >
    Your Selected Services
  </Typography>
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: "400",
      fontFamily: "'Roboto', sans-serif",
      color: "#424242", // Neutral gray for better readability
      marginTop: "10px",
      fontSize: "1rem", // Refined sizing for text
      lineHeight: "1rem", // Balanced spacing between lines
    }}
  >
    Review and confirm the details of your selected services before proceeding to checkout.
  </Typography>
</div>


    {/* Main Checkout Items */}
    {checkout.length === 0 ? (
      <Typography variant="h6">No items selected</Typography>
    ) : (
      checkout.map((item, index) => (
        <Box key={index} sx={{ width: "80%", display: "flex", justifyContent: "center", margin: "10px 0" }}>
          <Card sx={{
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
            },
          }}>
            <Typography variant="h6" sx={{
              fontWeight: "600",
              fontSize: "1.2rem",
              color: "#333",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              {item.entry.serviceCategory} 
              <Tooltip title="Remove this service">
                <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleRemoveItem(index)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <hr />
            <Typography variant="body1"><strong>Type:</strong> {item.entry.type}</Typography>
            <Typography variant="body1"><strong>Service Type:</strong> {item.entry.serviceType}</Typography>
            <Typography variant="body1"><strong>Sub Category:</strong> {item.entry.subCategory}</Typography>
            <Typography variant="body1"><strong>People Range:</strong> {item.entry.peopleRange}</Typography>
            <Typography variant="body1"><strong>Frequency:</strong> {item.entry.frequency} times a week</Typography>
            <Typography variant="body1"><strong>Price per Month:</strong> Rs.{item.entry.pricePerMonth}</Typography>
            <Typography variant="body1" sx={{
              color: "#2e7d32",
              backgroundColor: "#e8f5e9",
              border: "1px solid #2e7d32",
              padding: "6px",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "12px",
            }}>
              Total Price: Rs. {item.price}
            </Typography>
          </Card>
        </Box>
      ))
    )}

    {/* Footer (Grand Total and Checkout Button) */}
    {checkout.length > 0 && (
      <div style={{ width: "100%",height:"100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingBottom: "15px", padding: "20px 0" }}>
      <div
  style={{
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#2e7d32",
    backgroundColor: "#e8f5e9",
    border: "1px solid #2e7d32",
    padding: "12px 20px", // Same padding as the button
    borderRadius: "8px", // Same border-radius as the button
    textAlign: "center",
    margin: "20px auto", // Centers the div and adds spacing
    maxWidth: "200px", // Constrain the width
    minWidth: "150px", // Maintain a minimum width
    width: "100%", // Allow responsive width
  }}
>
  Grand Total: Rs. {grandTotal}
</div>

  <Tooltip title="Proceed to checkout">
  <Button
  startIcon={<ShoppingCartCheckoutIcon />}
  variant="contained"
  style={{
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(to right, #1a73e8, #1565c0)",
    border: "1px solid rgb(63, 70, 146)",
    padding: "12px 20px", // Adjust for a proportional button size
    borderRadius: "8px",
    textAlign: "center",
    margin: "20px auto", // Center the button on smaller screens
    flexBasis: "auto",
    maxWidth: "200px", // Constrain button width
    minWidth: "150px", // Minimum button width
    width: "100%", // Ensure full width for smaller containers
  }}
  onClick={handleCheckout}
>
  Checkout
</Button>

</Tooltip>
      </div>
    )}
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
  </Box>
);
};
export default Checkout;