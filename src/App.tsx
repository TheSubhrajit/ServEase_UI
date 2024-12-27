import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header/Header";
import { Landingpage } from "./components/Landing_Page/Landingpage";
import { DetailsView } from "./components/DetailsView/DetailsView";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Confirmationpage from "./components/ServiceProvidersDetails/Confirmationpage";
import Checkout from "./components/Checkout/Checkout";
// import Bookings from "./components/User-Profile/Bookings";
// import UserProfile from "./components/User-Profile/UserProfile";

function App() {
  const [selection, setSelection] = useState<string | undefined>(); // State to manage selections
  const [handleDropDownValue, setDropDownValue] = useState<
    string | undefined
  >(); // Fixed typo
  const [checkoutData, setCheckoutData] = useState<any>();
  const [selectedBookingType, setSelectedBookingType] = useState<
    string | undefined
  >(); // Fixed typo

  // Function to handle child component communication
  const handleDataFromChild = (e: string) => {
    setSelection(e); // Update selection based on child component's input
  };

  const handleCheckoutItems = (item: any) => {
    console.log("checkout Item => ", item);
    setCheckoutData(item); // Save the checkout data
  };

  const getSelectedFromDropDown = (e: string) => {
    setSelection(undefined);
    setCheckoutData(undefined); // Reset selection on dropdown change
    setDropDownValue(e);
  };

  const handleSelectedBookingType = (e: string) => {
    console.log("Selected booking type:", e);
    setSelectedBookingType(e); // Update selected booking type
  };

  // Render content based on different conditions
  const renderContent = () => {
    if (checkoutData) {
      // Render Checkout if checkoutData is available
      return <Checkout selectedcheckout={checkoutData} />;
    }

    if (handleDropDownValue === "login") {
      return (
        <div className="w-full max-w-4xl h-[75%]">
          <Login />
        </div>
      );
    }

    if (handleDropDownValue === "admin") {
      return <Admin />;
    }

    if(handleDropDownValue === "profile"){
      return <UserProfile goBack={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    }

    if (selection === "Confirmation" || selectedBookingType) {
      return <Confirmationpage role={selection} />;
    }

    return !selection ? (
      <Landingpage
        sendDataToParent={handleDataFromChild}
        bookingType={handleSelectedBookingType}
      />
    ) : (
      <DetailsView
        selected={selection}
        sendDataToParent={handleDataFromChild}
        checkoutItem={handleCheckoutItems}
      />
    );
  };

  return (
    <div className="App">
      <div className="header-class">
        <Header sendDataToParent={getSelectedFromDropDown} />
      </div>

      <section className="flex-grow flex justify-center items-center px-4 py-6 relative">
        {renderContent()}
      </section>

      <footer className="footer-container">
        <Footer />
      </footer> */}
      {/* <UserProfile goBack={function (): void {
  throw new Error("Function not implemented.");
} }/>
      {/* <Bookings /> */}
    </div>
  );
}

export default App;
