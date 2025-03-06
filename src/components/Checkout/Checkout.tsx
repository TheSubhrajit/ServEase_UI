import { Card, Button, Box, Typography, Snackbar, Alert, IconButton, Tooltip, DialogContent, Dialog, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingDetails } from "../../types/engagementRequest";
import { Bookingtype } from "../../types/bookingTypeData";
import axiosInstance from "../../services/axiosInstance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import axios from "axios";
import Login from "../Login/Login";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { BOOKINGS, CONFIRMATION } from "../../Constants/pagesConstants";
import { add, remove } from "../../features/cart/cartSlice";
import { RootState } from "../../store/userStore";

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
  providerDetails: any;
  sendDataToParent: (data: any) => void;
}

const Checkout: React.FC<ChildComponentProps> = ({ providerDetails, sendDataToParent }) => {
  const [checkout, setCheckout] = useState<any>([]);
  const [bookingTypeFromSelection, setBookingTypeFromSelection] = useState<Bookingtype>();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  const cart = useSelector((state: any) => state.cart?.value);
  const bookingType = useSelector((state: any) => state.bookingType?.value);
  const user = useSelector((state: any) => state.user?.value);
  const priceData = useSelector((state: RootState) => state.pricing?.value);
  const [filteredPriceData, setFilteredPriceData] = useState<any[]>([]);

  const dispatch = useDispatch();
  const customerId = user?.customerDetails?.customerId || null;
  const currentLocation = user?.customerDetails?.currentLocation;
  const firstName = user?.customerDetails?.firstName;
  const lastName = user?.customerDetails?.lastName;
  const customerName = `${firstName} ${lastName}`;

  const providerFullName = `${providerDetails?.firstName} ${providerDetails?.lastName}`;

  const bookingDetails: BookingDetails = {
    serviceProviderId: 0,
    serviceProviderName: "",
    customerId: 0,
    customerName: "",
    startDate: "",
    endDate: "",
    engagements: "",
    address: "",
    timeslot: "",
    monthlyAmount: 0,
    paymentMode: "CASH",
    bookingType: "",
    taskStatus: "NOT_STARTED",
    responsibilities: [],
  };

  const typeButtonsSelector = [
    { key: 1, value: 'Regular' },
    { key: 2, value: 'Premium' },
    // { key: 3, value: 'On Demand' }
  ];

  const [serviceType, setServiceType] = useState<number>(typeButtonsSelector[0].key); // Default to Regular
  const [mealType, setMealType] = useState<string[]>([]);
  const [pax, setPax] = useState("3");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setCheckout(cart);
    setBookingTypeFromSelection(bookingType);
  }, [cart, bookingType]);

  // useEffect(() => {
  //   if (priceData && bookingType) {
  //     const filteredData = priceData.filter((item) => 
  //       bookingType.bookingPreference !== "Date" ? item.BookingType === "Regular" : item.BookingType === "On Demand"
  //     );
  //     setFilteredPriceData(filteredData);
  //   }
  // }, [priceData, bookingType]);

  const handleRemoveItem = (index: number) => {
    const updatedCheckout = checkout['selecteditem']?.filter((_, i) => i !== index);
    setCheckout(updatedCheckout);
    dispatch(add({ grandTotal, selecteditem: updatedCheckout }));
  };

  useEffect(() => {
    if (user?.role === 'CUSTOMER') {
      setLoggedInUser(user);
    }
  }, [user]);

  const handleBookingPage = (e: string | undefined) => {
    setOpen(false);
  };

  const handleLogin = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const handleServiceTypeChange = (event: React.SyntheticEvent, newValue: number) => {
    setServiceType(newValue);
  };

  const [selecteditem, setSelectedItems] = useState<any>([]);

  const calculatePriceAndEntry = () => {
    let totalPrice = 0;

    // mealType.forEach((category) => {
    //   const categoryData = filteredPriceData.find((item) => item.Categories === category);

    //   if (categoryData) {
    //     totalPrice += getPeopleCount(categoryData);

    //     setSelectedItems((prevState: any) =>
    //       prevState.includes(categoryData)
    //         ? prevState.filter((item) => item !== categoryData) // Uncheck item
    //         : [...prevState, categoryData] // Check item
    //     );
    //   }
    // });

    // Discount logic
    if (mealType.length === 1) {
      setPrice(Number(totalPrice));
    } else if (mealType.length === 2) {
      totalPrice = Number(totalPrice) - (Number(totalPrice) * 10) / 100;
      setPrice(totalPrice);
    } else if (mealType.length === 3) {
      totalPrice = Number(totalPrice) - (Number(totalPrice) * 20) / 100;
      setPrice(totalPrice);
    }

    // Booking type adjustments
    if (bookingType?.morningSelection && bookingType?.eveningSelection) {
      totalPrice *= 2;
      setPrice(totalPrice);
    } else {
      setPrice(totalPrice);
    }

    console.log("serviceType ", serviceType);

    // Additional charge for serviceType === 2
    if (serviceType === 2) {
      totalPrice += (Number(totalPrice) * 30) / 100;
      setPrice(totalPrice);
    }
  };

  const getPeopleCount = (data) => {
    const paxToNumber = Number(pax);
    const basePrice = data["Price /Month (INR)"];

    if (paxToNumber <= 3) {
      return basePrice;
    } else if (paxToNumber > 3 && paxToNumber <= 6) {
      const extraPeople = paxToNumber - 3;
      return basePrice + basePrice * 0.2 * extraPeople;
    } else if (paxToNumber > 6 && paxToNumber <= 9) {
      const extraPeopleTier1 = 3;
      const priceForTier1 = basePrice + basePrice * 0.2 * extraPeopleTier1;

      const extraPeopleTier2 = paxToNumber - 6;
      return priceForTier1 + priceForTier1 * 0.1 * extraPeopleTier2;
    } else if (paxToNumber > 9) {
      const extraPeopleTier1 = 3;
      const priceForTier1 = basePrice + basePrice * 0.2 * extraPeopleTier1;

      const extraPeopleTier2 = 3;
      const priceForTier2 = priceForTier1 + priceForTier1 * 0.1 * extraPeopleTier2;

      const extraPeopleTier3 = paxToNumber - 9;
      return priceForTier2 + priceForTier2 * 0.05 * extraPeopleTier3;
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://13.127.47.159:3000/create-order",
        { amount: grandTotal },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { id: orderId, currency, amount } = response.data;

        const options = {
          key: "rzp_test_lTdgjtSRlEwreA",
          amount: amount,
          currency: currency,
          name: "Serveaso",
          description: "Booking Payment",
          order_id: orderId,
          handler: async function (razorpayResponse: any) {
            alert(`Payment successful! Payment ID: ${razorpayResponse.razorpay_payment_id}`);

            bookingDetails.serviceProviderId = providerDetails.serviceproviderId;
            bookingDetails.serviceProviderName = providerFullName;
            bookingDetails.customerId = customerId;
            bookingDetails.customerName = customerName;
            bookingDetails.address = currentLocation;
            bookingDetails.startDate = bookingTypeFromSelection?.startDate;
            bookingDetails.endDate = bookingTypeFromSelection?.endDate;
            bookingDetails.engagements = checkout.selecteditem[0].Service;
            bookingDetails.paymentMode = "UPI";
            bookingDetails.taskStatus = "NOT_STARTED";
            bookingDetails.bookingType = bookingType.bookingPreference;
            bookingDetails.serviceeType = checkout.selecteditem[0].Service;
            bookingDetails.timeslot = [bookingType.morningSelection, bookingType.eveningSelection]
              .filter(Boolean)
              .join(', ');

            bookingDetails.monthlyAmount = checkout.price;

            const response = await axiosInstance.post(
              "/api/serviceproviders/engagement/add",
              bookingDetails,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.status === 201) {
              setSnackbarMessage(response.data || "Booking successful!");
              setSnackbarSeverity("success");
              setOpenSnackbar(true);
              sendDataToParent(BOOKINGS);
              dispatch(remove());
            }
          },
          prefill: {
            name: customerName || "",
            email: user?.email || "",
            contact: user?.mobileNo || "",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error while creating Razorpay order:", error);
      setSnackbarMessage("Failed to initiate payment. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const grandTotal = checkout?.price ? checkout?.price : 0;

  const handleBackClick = () => {
    sendDataToParent(CONFIRMATION);
  };

  const bookingTypes = useSelector((state: any) => state.bookingType?.value);

  useEffect(() => {
    console.log("Booking Type from Redux Store for checkout:", bookingTypes);
    console.log("Morning checkout:", bookingTypes?.morningSelection);
    console.log("Evening checkout:", bookingTypes?.eveningSelection);
  }, [bookingType]);

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: '100%',
      }}>
        {/* Fixed Header */}
        <Box sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px",
          backgroundColor: "#fff",
          zIndex: 10,
          boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          height: "8%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: '65px'
        }}>
          <Button variant="outlined" style={{ marginRight: '30%' }} onClick={handleBackClick}>
            Back
          </Button>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Selected Services
          </Typography>
        </Box>

        {/* Scrollable Content Section */}
        <Box sx={{
          flexGrow: 1,
          padding: "20px",
          overflowY: "auto",
          marginTop: "8%",
          marginBottom: "8%",
          height: "84%",
          display: 'flex',
          flexDirection: "column",
        }}>
          {!checkout || checkout?.selecteditem?.length === 0 ? (
            <Typography variant="h6">No items selected</Typography>
          ) : (
            checkout['selecteditem']?.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "40px",
                  gap: "20px",
                  fontFamily: "Poppins, sans-serif",
                  background: "#f8f9fa"
                }}
              >
                {/* Left Section - Service Cart */}
                <div style={{ width: "60%", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>COOK</h2>
                    <Tooltip title="Remove this service">
                      <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleRemoveItem(index)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/* Service Type Selection */}
                  <Tabs
                    value={serviceType}
                    onChange={handleServiceTypeChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="service type tabs"
                    sx={{ marginBottom: 3 }}
                  >
                    {typeButtonsSelector.map((button) => (
                      <Tab
                        key={button.key}
                        value={button.key}
                        label={button.value}
                      />
                    ))}
                  </Tabs>

                  <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd", fontSize: "18px", fontWeight: "bold" }}>
                        <th style={{ padding: "15px 10px" }}>Meal Type</th>
                        <th style={{ padding: "15px 10px" }}>Service Type</th>
                        <th style={{ padding: "15px 10px" }}>No of Person</th>
                        <th style={{ padding: "15px 10px" }}>Time Slot</th>
                        <th style={{ padding: "15px 10px" }}>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.entry && (
                        <tr style={{ borderBottom: "1px solid #ddd", fontSize: "16px", height: "50px" }}>
                          <td>{item.entry.serviceCategory}</td>
                          <td>{typeButtonsSelector.find(btn => btn.key === serviceType)?.value}</td>
                          <td>{item.entry.peopleRange}</td>
                          <td>{bookingType.morningSelection || bookingType.eveningSelection}</td>
                          <td>${item.price}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right Section - Payment Info */}
                <div style={{ width: "35%", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Price Details</h2>
                  <div className="space-y-3 text-gray-800">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal:</span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>GST (18%):</span>
                      <span className="font-semibold">${item.price * 0.18}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Service Fee:</span>
                      <span className="font-semibold">$10.00</span>
                    </div>
                    <hr className="my-4 border-gray-400" />
                    <div className="flex justify-between text-xl font-bold text-blue-700">
                      <p style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>Grand Total: ${item.price + (item.price * 0.18) + 10}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Voucher"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    
<button className="mt-2 w-full border border-red-400 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
Apply
</button>
</div>
<button
onClick={handleCheckout}
className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
>
<ShoppingCartCheckoutIcon /> Proceed to Checkout
</button>
</div>
</div>
))
)}
</Box>

{/* Snackbar for notifications */}
<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
{snackbarMessage}
</Alert>
</Snackbar>

{/* Login Dialog */}
<Dialog open={open} onClose={() => setOpen(false)}>
<DialogContent>
<Login />
</DialogContent>
</Dialog>
</Box>
</>
);
};

export default Checkout;
