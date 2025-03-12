import {
  Card,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  DialogContent,
  Dialog,
  Tabs,
  Tab,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingDetails } from "../../types/engagementRequest";
import { Bookingtype } from "../../types/bookingTypeData";
import axiosInstance from "../../services/axiosInstance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import axios from "axios";
import Login from "../Login/Login";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { BOOKINGS, CONFIRMATION } from "../../Constants/pagesConstants";
import { add, remove } from "../../features/cart/cartSlice";

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

const Checkout: React.FC<ChildComponentProps> = ({
  providerDetails,
  sendDataToParent,
}) => {
  const [checkout, setCheckout] = useState<any>([]);
  const [bookingTypeFromSelection, setBookingTypeFromSelection] =
    useState<Bookingtype>();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  const cart = useSelector((state: any) => state.cart?.value);
  const bookingType = useSelector((state: any) => state.bookingType?.value);
  const user = useSelector((state: any) => state.user?.value);
  const pricing = useSelector((state: any) => state.pricing?.groupedServices); // Get groupedServices from the store
  const dispatch = useDispatch();
  const customerId = user?.customerDetails?.customerId || null;
  const currentLocation = user?.customerDetails?.currentLocation;
  const firstName = user?.customerDetails?.firstName;
  const lastName = user?.customerDetails?.lastName;
  const customerName = `${firstName} ${lastName}`;
  console.log("pricing data ", pricing);
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
    { key: 1, value: "Regular" },
    { key: 2, value: "Premium" },
  ];
  // Handle service type change for a specific meal
  const handleServiceTypeChange = (
    mealType: string,
    newServiceType: number
  ) => {
    setMealStates((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        serviceType: newServiceType,
      },
    }));
  };
  // Handle service type change for Nanny
  const handleNannyServiceTypeChange = (
    serviceType: string,
    newServiceType: number
  ) => {
    setNannyStates((prev) => ({
      ...prev,
      [serviceType]: {
        serviceType: newServiceType,
      },
    }));
  };

  // Handle service type change for Maid
  const handleMaidServiceTypeChange = (
    serviceType: string,
    newServiceType: number
  ) => {
    setMaidStates((prev) => ({
      ...prev,
      [serviceType]: {
        ...prev[serviceType],
        serviceType: newServiceType,
      },
    }));
  };
  const [serviceType, setServiceType] = useState<number>(
    typeButtonsSelector[0].key
  ); // Default to Regular
  const [filteredCookPricing, setFilteredCookPricing] = useState<any[]>([]);
  const [mealStates, setMealStates] = useState<
    Record<string, { serviceType: number; pax: number }>
  >({});
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const toggleMealSelection = (mealType: string) => {
    setSelectedMeals(
      (prevSelected) =>
        prevSelected.includes(mealType)
          ? prevSelected.filter((meal) => meal !== mealType) // Remove if already selected
          : [...prevSelected, mealType] // Add if not selected
    );
  };
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const toggleServiceSelection = (serviceType: string) => {
    setSelectedServices(
      (prevSelected) =>
        prevSelected.includes(serviceType)
          ? prevSelected.filter((service) => service !== serviceType) // Remove if already selected
          : [...prevSelected, serviceType] // Add if not selected
    );
  };

  // Filter Cook data based on booking type
  useEffect(() => {
    if (bookingTypes?.role === "cook") {
      const cookPricing = pricing?.Cook || []; // Extract Cook data
      console.log("Cook Pricing:", cookPricing); // Log Cook data

      const filteredCook = cookPricing.filter((item) => {
        if (bookingType.bookingPreference !== "Date") {
          return item.BookingType === "Regular";
        } else {
          return item.BookingType === "On Demand";
        }
      });

      console.log("Filtered Cook Pricing:", filteredCook); // Log filtered Cook data
      setFilteredCookPricing(filteredCook);
    }
  }, [bookingType, pricing]);

  // Initialize meal states when filteredCookPricing changes
  useEffect(() => {
    if (bookingTypes?.role === "cook") {
      const initialMealStates: Record<
        string,
        { serviceType: number; pax: number }
      > = {};
      filteredCookPricing.forEach((meal) => {
        initialMealStates[meal.Categories] = {
          serviceType: 1, // Default to Regular
          pax: 3, // Default number of persons
        };
      });
      setMealStates(initialMealStates);
    }
  }, [filteredCookPricing]);

  // Increment number of persons for a specific meal
  const incrementPax = (mealType: string) => {
    setMealStates((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        pax: prev[mealType].pax + 1,
      },
    }));
  };

  const updatePax = (mealType, newValue) => {
    setMealStates((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        pax: newValue,
      },
    }));
  };

  // Decrement number of persons for a specific meal
  const decrementPax = (mealType: string) => {
    setMealStates((prev) => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        pax: Math.max(1, prev[mealType].pax - 1), // Ensure pax doesn't go below 1
      },
    }));
  };

  // Calculate price based on number of persons and service type
  const getPeopleCount = (data: any, pax: number, serviceType: number) => {
    let field =
      bookingType.bookingPreference !== "Date"
        ? "Price /Month (INR)"
        : "Price /Day (INR)";
    const basePrice = data[field];
  
    let totalPrice = basePrice;
  
    if (pax > 3 && pax <= 6) {
      totalPrice += basePrice * 0.2 * (pax - 3);
    } else if (pax > 6 && pax <= 9) {
      totalPrice += basePrice * 0.2 * 3 + basePrice * 0.1 * (pax - 6);
    } else if (pax > 9) {
      totalPrice +=
        basePrice * 0.2 * 3 +
        basePrice * 0.1 * 3 +
        basePrice * 0.05 * (pax - 9);
    }
  
    if (serviceType === 2) {
      totalPrice += totalPrice * 0.3; // Premium service adds 30%
    }
  
    return totalPrice;
  };
  const [filteredMaidPricing, setFilteredMaidPricing] = useState<any[]>([]);
  const [maidStates, setMaidStates] = useState<
    Record<string, { serviceType: number; pax: number }>
  >({});

  // Filter Maid data based on booking type
  useEffect(() => {
    if (bookingTypes?.role === "maid") {
      const maidPricing = pricing?.Maid || []; // Extract Maid data
      console.log("Maid Pricing:", maidPricing); // Log Maid data

      const filteredMaid = maidPricing.filter((item) => {
        if (bookingType.bookingPreference !== "Date") {
          return item.BookingType === "Regular";
        } else {
          return item.BookingType === "On Demand";
        }
      });

      console.log("Filtered Maid Pricing:", filteredMaid); // Log filtered Maid data
      const subCategories = filteredMaid.map((item) => item["Sub-Categories"]);
      console.log("All Sub-Categories:", subCategories);
      const numbersSizeArray = filteredMaid.map((item) => item["Numbers/Size"]);
      console.log("All Numbers/Size:", numbersSizeArray);
      setFilteredMaidPricing(filteredMaid);
    }
  }, [bookingType, pricing]);
  const incrementNO = (serviceType: string) => {
    setMaidStates((prevState) => ({
      ...prevState,
      [serviceType]: {
        ...prevState[serviceType],
        pax: prevState[serviceType].pax + 1,
      },
    }));
  };

  const decrementNo = (serviceType: string) => {
    setMaidStates((prevState) => ({
      ...prevState,
      [serviceType]: {
        ...prevState[serviceType],
        pax: Math.max(1, prevState[serviceType].pax - 1), // Ensure pax doesn't go below 1
      },
    }));
  };
  // Initialize maid states when filteredMaidPricing changes
  useEffect(() => {
    if (bookingTypes?.role === "maid") {
      const initialMaidStates: Record<
        string,
        { serviceType: number; pax: number }
      > = {};
      filteredMaidPricing.forEach((service) => {
        initialMaidStates[service.Categories] = {
          serviceType: 1, // Default to Regular
          pax: 3, // Default number of persons
        };
      });
      setMaidStates(initialMaidStates);
    }
  }, [filteredMaidPricing]);

  const [filteredNannyPricing, setFilteredNannyPricing] = useState<any[]>([]);
  const [nannyStates, setNannyStates] = useState<
    Record<string, { serviceType: number }>
  >({});

  // Filter Nanny data based on booking type
  useEffect(() => {
    if (bookingTypes?.role === "nanny") {
      const nannyPricing = pricing?.Nanny || []; // Extract Nanny data
      console.log("Nanny Pricing:", nannyPricing); // Log Nanny data

      const filteredNanny = nannyPricing.filter((item) => {
        if (bookingType.bookingPreference !== "Date") {
          return item.BookingType === "Regular";
        } else {
          return item.BookingType === "On Demand";
        }
      });

      console.log("Filtered Nanny Pricing:", filteredNanny); // Log filtered Nanny data
      const subCategories = filteredNanny.map((item) => item["Sub-Categories"]);
      console.log("All Sub-Categories:", subCategories);
      const numbersSizeArray = filteredNanny.map(
        (item) => item["Numbers/Size"]
      );
      console.log("All Numbers/Size:", numbersSizeArray);

      setFilteredNannyPricing(filteredNanny);
    }
  }, [bookingType, pricing]);

  // Initialize nanny states when filteredNannyPricing changes
  useEffect(() => {
    if (bookingTypes?.role === "nanny") {
      const initialNannyStates: Record<string, { serviceType: number }> = {};
      filteredNannyPricing.forEach((service) => {
        initialNannyStates[service.Categories] = {
          serviceType: 1, // Default to Regular
        };
      });
      setNannyStates(initialNannyStates);
    }
  }, [filteredNannyPricing]);

  // Handle service type change for a specific service
  // const handleServiceTypeChange = (serviceType: string, newServiceType: number) => {
  //   setNannyStates((prev) => ({
  //     ...prev,
  //     [serviceType]: {
  //       serviceType: newServiceType,
  //     },
  //   }));
  // };



  // Calculate price based on service type
  const getPrice = (data: any, serviceType: number) => {
    let field =
      bookingType.bookingPreference !== "Date"
        ? "Price /Month (INR)"
        : "Price /Day (INR)";
    const basePrice = data[field];

    let totalPrice = basePrice;

    if (serviceType === 2) {
      totalPrice += totalPrice * 0.3; // Premium service adds 30%
    }

    return totalPrice;
  };

  useEffect(() => {
    setCheckout(cart);
    setBookingTypeFromSelection(bookingType);
  }, [cart, bookingType]);

  const handleRemoveItem = (index: number) => {
    const updatedCheckout = checkout["selecteditem"]?.filter(
      (_, i) => i !== index
    );
    setCheckout(updatedCheckout);
    dispatch(add({ grandTotal, selecteditem: updatedCheckout }));
  };

  useEffect(() => {
    if (user?.role === "CUSTOMER") {
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
            alert(
              `Payment successful! Payment ID: ${razorpayResponse.razorpay_payment_id}`
            );

            bookingDetails.serviceProviderId =
              providerDetails.serviceproviderId;
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
            bookingDetails.timeslot = [
              bookingType.morningSelection,
              bookingType.eveningSelection,
            ]
              .filter(Boolean)
              .join(", ");

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

  const handleNumbersSizeChange = (serviceType: string, value: string) => {
    setMaidStates((prev) => ({
      ...prev,
      [serviceType]: {
        ...prev[serviceType],
        numbersSize: value,
      },
    }));
  };
  

  const calculateNannySubtotal = () => {
    let subtotal = 0;

    filteredNannyPricing.forEach((service) => {
      if (selectedServices.includes(service.Categories)) {
        const selectedServiceType =
          nannyStates?.[service.Categories]?.serviceType || 1;
        subtotal += getPrice(service, selectedServiceType);
      }
    });

    return subtotal;
  };
  const calculateSubtotal = () => {
    let subtotal = 0;

    // Calculate Cook subtotal
    filteredCookPricing.forEach((meal) => {
      if (selectedMeals.includes(meal.Categories)) {
        const { serviceType, pax } = mealStates[meal.Categories] || {
          serviceType: 1,
          pax: 3,
        };
        subtotal += getPeopleCount(meal, pax, serviceType);
      }
    });

    // Calculate Maid subtotal
    filteredMaidPricing.forEach((service) => {
      if (selectedServices.includes(service.Categories)) {
        const { serviceType: selectedServiceType, pax } = maidStates[
          service.Categories
        ] || {
          serviceType: 1,
          pax: 3,
        };
        subtotal += getPeopleCount(service, pax, selectedServiceType);
      }
    });

    // Calculate Nanny subtotal
    subtotal += calculateNannySubtotal();

    return subtotal;
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
    console.log("role checkout", bookingTypes?.role);
  }, [bookingType]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
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
            marginTop: "65px",
          }}
        >
          <Button
            variant="outlined"
            style={{ marginRight: "30%" }}
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Selected Services
          </Typography>
        </Box>

        {/* Scrollable Content Section */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            overflowY: "auto",
            marginTop: "8%",
            marginBottom: "8%",
            height: "84%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!checkout || checkout?.selecteditem?.length === 0 ? (
            <Typography variant="h6">No items selected</Typography>
          ) : (
            checkout["selecteditem"]?.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "40px",
                  gap: "20px",
                  fontFamily: "Poppins, sans-serif",
                  background: "#f8f9fa",
                }}
              >
                {/* Left Section - Service Cart */}
                {bookingTypes?.role === "cook" && (
                  <div
                    style={{
                      width: "60%",
                      background: "#fff",
                      padding: "30px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
                        COOK
                      </h2>
                      <Tooltip title="Remove this service">
                        <IconButton
                          sx={{ color: "#d32f2f" }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <table
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            textAlign: "left",
                            borderBottom: "2px solid #ddd",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          <th style={{ padding: "15px 10px" }}>Select</th>{" "}
                          {/* New column for checkboxes */}
                          <th style={{ padding: "15px 10px" }}>Meal Type</th>
                          <th style={{ padding: "15px 10px" }}>Service Type</th>
                          <th style={{ padding: "15px 10px" }}>No of Person</th>
                          <th style={{ padding: "15px 10px" }}>Time Slot</th>
                          <th style={{ padding: "15px 10px" }}>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCookPricing.map((meal, index) => {
                          const mealType = meal.Categories;
                          const { serviceType, pax } = mealStates[mealType] || {
                            serviceType: 1,
                            pax: 3,
                          };

                          return (
                            <tr
                              key={`${mealType}-${serviceType}-${pax}`}
                              style={{
                                borderBottom: "1px solid #ddd",
                                fontSize: "16px",
                                height: "50px",
                              }}
                            >
                              {/* Checkbox for selecting meal */}
                              <td style={{ padding: "15px 10px" }}>
                                <input
                                  type="checkbox"
                                  checked={selectedMeals.includes(mealType)}
                                  onChange={() => toggleMealSelection(mealType)}
                                />
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                {mealType}
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                <select
                                  value={
                                    serviceType === 1 ? "Regular" : "Premium"
                                  }
                                  onChange={(e) =>
                                    handleServiceTypeChange(
                                      mealType,
                                      e.target.value === "Regular" ? 1 : 2
                                    )
                                  }
                                  style={{
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                    cursor: "pointer",
                                  }}
                                >
                                  <option value="Regular">Regular</option>
                                  <option value="Premium">Premium</option>
                                </select>
                              </td>
                              <td
                                style={{
                                  padding: "15px 10px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  style={{
                                    margin: "0 10px",
                                    cursor: "pointer",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                  }}
                                  onClick={() => decrementPax(mealType)}
                                >
                                  -
                                </button>

                                {/* <input
                                  type="number"
                                  value={pax}
                                  onChange={(e) => {
                                    const newValue = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    if (!isNaN(newValue) && newValue > 0) {
                                      updatePax(mealType, newValue);
                                    }
                                  }} */}
                                {/*                                   
                                  style={{
                                    width: "50px",
                                    textAlign: "center",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                  }}
                                /> */}
                                <input
                                  type="text" // Change to text input
                                  value={pax || 0} // Default to 0 if pax is undefined or null
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Allow only numeric input
                                    if (/^\d*$/.test(inputValue)) {
                                      // Regex to allow only digits
                                      const newValue =
                                        inputValue === ""
                                          ? 0
                                          : parseInt(inputValue, 10); // Default to 0 if empty
                                      updatePax(mealType, newValue);
                                    }
                                  }}
                                  onKeyPress={(e) => {
                                    // Prevent non-numeric characters from being entered
                                    if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  style={{
                                    width: "50px",
                                    textAlign: "center",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                  }}
                                />
                                <button
                                  style={{
                                    margin: "0 10px",
                                    cursor: "pointer",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                  }}
                                  onClick={() => incrementPax(mealType)}
                                >
                                  +
                                </button>
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                {mealType.includes(meal.Categories) && (
                                  <>
                                    {bookingType.morningSelection && (
                                      <span>
                                        {bookingType.morningSelection}
                                      </span>
                                    )}
                                    {bookingType.eveningSelection && (
                                      <span>
                                        {bookingType.eveningSelection}
                                      </span>
                                    )}
                                  </>
                                )}
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                ₹{getPeopleCount(meal, pax, serviceType)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* MAID Table */}
                {bookingTypes?.role === "maid" && (
  <div
    style={{
      width: "60%",
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>MAID</h2>
      <Tooltip title="Remove this service">
        <IconButton
          sx={{ color: "#d32f2f" }}
          onClick={() => handleRemoveItem(index)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
    </div>
    <table
      style={{
        width: "100%",
        marginTop: "10px",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            textAlign: "left",
            borderBottom: "2px solid #ddd",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <th style={{ padding: "15px 10px" }}>Select</th>
          <th style={{ padding: "15px 10px" }}>Service Type</th>
          <th style={{ padding: "15px 10px" }}>Service Category</th>
          <th style={{ padding: "15px 10px" }}>Sub-Category</th>
          <th style={{ padding: "15px 10px" }}>Numbers/Size</th>
          <th style={{ padding: "15px 10px" }}>Time Slot</th>
          <th style={{ padding: "15px 10px" }}>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {filteredMaidPricing.map((service, index) => {
          const serviceType = service.Categories;
          const subCategory = service["Sub-Categories"] || "N/A";
          const numbersSize = service["Numbers/Size"] || "N/A";
          const { serviceType: selectedServiceType, pax } =
            maidStates[serviceType] || { serviceType: 1, pax: 3 };

          // Check if the current service is a major option
          const isMajorOption = index < 3;

          // Check if a major option is selected
          const isMajorSelected = selectedServices.some((selected) =>
            filteredMaidPricing.slice(0, 3).map((s) => s.Categories).includes(selected)
          );

          // Render only major options or add-ons if a major option is selected
          if (isMajorOption || isMajorSelected) {
            return (
              <tr
                key={`${serviceType}-${selectedServiceType}`}
                style={{
                  borderBottom: "1px solid #ddd",
                  fontSize: "16px",
                  height: "50px",
                }}
              >
                {/* Checkbox for selecting service */}
                <td style={{ padding: "15px 10px" }}>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(serviceType)}
                    onChange={() => toggleServiceSelection(serviceType)}
                  />
                </td>
                <td style={{ padding: "15px 10px" }}>{serviceType}</td>
                <td style={{ padding: "15px 10px" }}>
                  <select
                    value={
                      selectedServiceType === 1 ? "Regular" : "Premium"
                    }
                    onChange={(e) =>
                      handleMaidServiceTypeChange(
                        serviceType,
                        e.target.value === "Regular" ? 1 : 2
                      )
                    }
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #0288D1",
                      background: "#E3F2FD",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Premium">Premium</option>
                  </select>
                </td>
                <td style={{ padding: "15px 10px" }}>{subCategory}</td>
                <td style={{ padding: "15px 10px" }}>
                  {subCategory === "People" || subCategory === "Number" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        style={{
                          cursor: "pointer",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "1px solid #0288D1",
                          background: "#E3F2FD",
                        }}
                        onClick={() => decrementNo(serviceType)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={pax}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value, 10);
                          if (!isNaN(newValue)) {
                            updatePax(serviceType, newValue);
                          }
                        }}
                        style={{
                          width: "50px",
                          textAlign: "center",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #0288D1",
                          background: "#E3F2FD",
                        }}
                      />
                      <button
                        style={{
                          cursor: "pointer",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "1px solid #0288D1",
                          background: "#E3F2FD",
                        }}
                        onClick={() => incrementNO(serviceType)}
                      >
                        +
                      </button>
                    </div>
                  ) : subCategory === "House" ? (
                    <select
                      value={numbersSize}
                      onChange={(e) =>
                        handleNumbersSizeChange(serviceType, e.target.value)
                      }
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #0288D1",
                        background: "#E3F2FD",
                        cursor: "pointer",
                      }}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={`${i + 1} BHK`}>
                          {i + 1} BHK
                        </option>
                      ))}
                    </select>
                  ) : (
                    numbersSize
                  )}
                </td>
                <td style={{ padding: "15px 10px" }}>
                  {serviceType.includes(service.Categories) && (
                    <>
                      {bookingType.morningSelection && (
                        <span>{bookingType.morningSelection}</span>
                      )}
                      {bookingType.eveningSelection && (
                        <span>{bookingType.eveningSelection}</span>
                      )}
                    </>
                  )}
                </td>
                <td style={{ padding: "15px 10px" }}>
                  ₹
                  {getPeopleCount(service, pax, selectedServiceType)}
                </td>
              </tr>
            );
          } else {
            return null; // Hide add-ons if no major option is selected
          }
        })}
      </tbody>
    </table>
  </div>
)}

                {/* NANNY Table */}
                {bookingTypes?.role === "nanny" && (
                  <div
                    style={{
                      width: "60%",
                      background: "#fff",
                      padding: "30px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
                        NANNY
                      </h2>
                      <Tooltip title="Remove this service">
                        <IconButton
                          sx={{ color: "#d32f2f" }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <table
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            textAlign: "left",
                            borderBottom: "2px solid #ddd",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          <th style={{ padding: "15px 10px" }}>Select</th>{" "}
                          {/* Checkbox Column */}
                          <th style={{ padding: "15px 10px" }}>Service Type</th>
                          <th style={{ padding: "15px 10px" }}>
                            Service Category
                          </th>
                          <th style={{ padding: "15px 10px" }}>Age</th>
                          <th style={{ padding: "15px 10px" }}>Time Slot</th>
                          <th style={{ padding: "15px 10px" }}>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNannyPricing.map((service, index) => {
                          const serviceType = service.Categories;
                          const selectedServiceType =
                            nannyStates?.[serviceType]?.serviceType || 1;

                          return (
                            <tr
                              key={`${serviceType}-${selectedServiceType}`}
                              style={{
                                borderBottom: "1px solid #ddd",
                                fontSize: "16px",
                                height: "50px",
                              }}
                            >
                              {/* Checkbox for selecting service */}
                              <td style={{ padding: "15px 10px" }}>
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(
                                    serviceType
                                  )}
                                  onChange={() =>
                                    toggleServiceSelection(serviceType)
                                  }
                                />
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                {serviceType}
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                <select
                                  value={
                                    selectedServiceType === 1
                                      ? "Regular"
                                      : "Premium"
                                  }
                                  onChange={(e) =>
                                    handleNannyServiceTypeChange(
                                      serviceType,
                                      e.target.value === "Regular" ? 1 : 2
                                    )
                                  }
                                  style={{
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #0288D1",
                                    background: "#E3F2FD",
                                    cursor: "pointer",
                                  }}
                                >
                                  <option value="Regular">Regular</option>
                                  <option value="Premium">Premium</option>
                                </select>
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                {service["Numbers/Size"]}
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                {String(serviceType).includes(
                                  service.Categories
                                ) && (
                                  <>
                                    {bookingType?.morningSelection && (
                                      <span>
                                        {bookingType.morningSelection}
                                      </span>
                                    )}
                                    {bookingType?.eveningSelection && (
                                      <span>
                                        {bookingType.eveningSelection}
                                      </span>
                                    )}
                                  </>
                                )}
                              </td>
                              <td style={{ padding: "15px 10px" }}>
                                ₹{getPrice(service, selectedServiceType)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Right Section - Payment Info */}
                <div
                  style={{
                    width: "35%",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                    Price Details
                  </h2>
                  <div className="space-y-3 text-gray-800">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal:</span>
                      <span className="font-semibold">
                        ₹{calculateSubtotal()}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>GST (18%):</span>
                      <span className="font-semibold">
                        ₹{calculateSubtotal() * 0.18}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Service Fee:</span>
                      <span className="font-semibold">₹10.00</span>
                    </div>
                    <hr className="my-4 border-gray-400" />
                    <div className="flex justify-between text-xl font-bold text-blue-700">
                      <p
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          marginTop: "20px",
                        }}
                      >
                        Grand Total: ₹
                        {calculateSubtotal() + calculateSubtotal() * 0.18 + 10}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Voucher"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button className="mt-2 w-full border border-red-400 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-100 transition">
                      Apply Voucher
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </Box>
        {/* Fixed Footer */}
        {checkout["selecteditem"]?.length > 0 && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px",
              backgroundColor: "#fff",
              zIndex: 10,
              boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              height: "8%",
              marginBottom: "65px",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "1.1rem",
                color: "#2e7d32",
                backgroundColor: "#e8f5e9",
                border: "1px solid #2e7d32",
                padding: "8px 16px",
                borderRadius: "6px",
                textAlign: "center",
                marginRight: "20px",
              }}
            >
              Grand Total: Rs. {grandTotal}
            </div>

            <div style={{ float: "right", display: "flex" }}>
              {!loggedInUser && (
                <Tooltip title="Proceed to checkout">
                  <Button
                    startIcon={<ShoppingCartCheckoutIcon />}
                    variant="contained"
                    style={{
                      fontWeight: "600",
                      color: "#fff",
                      background: loggedInUser
                        ? "linear-gradient(to right, #1a73e8, #1565c0)"
                        : "#b0bec5",
                      border: "1px solid rgb(63, 70, 146)",
                      padding: "10px 24px",
                      borderRadius: "8px",
                    }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Tooltip>
              )}

              {loggedInUser && (
                <Tooltip title="Proceed to checkout">
                  <Button
                    startIcon={<ShoppingCartCheckoutIcon />}
                    variant="contained"
                    style={{
                      fontWeight: "600",
                      color: "#fff",
                      background: loggedInUser
                        ? "linear-gradient(to right, #1a73e8, #1565c0)"
                        : "#b0bec5",
                      border: "1px solid rgb(63, 70, 146)",
                      padding: "10px 24px",
                      borderRadius: "8px",
                    }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Tooltip>
              )}
            </div>
          </Box>
        )}

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: "60px" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog
          style={{ padding: "0px" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Login bookingPage={handleBookingPage} />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Checkout;
