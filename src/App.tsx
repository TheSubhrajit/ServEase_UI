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

function App() {
  const [selection, setSelection] = useState<string | undefined>(); // State to manage selections
  const [handleDropDownValue, setDropDownvalue] = useState<string | undefined>();
  const [checkoutData, setCheckoutData] = useState<any>();

  // Function to handle child component communication
  const handleDataFromChild = (e: string) => {
    setSelection(e);  // Update selection based on child component's input
  };

  const handleCheckoutItems = (item: any) => {
    console.log("checkout Item => ", item);
    setCheckoutData(item); // Save the checkout data
  };

  const getSelectedFromDropDown = (e: string) => {
    setSelection(undefined);
    setCheckoutData(undefined) // Reset selection on dropdown change
    setDropDownvalue(e);
  };

  return (
    <div className="App">
      <div className="header-class">
        <Header sendDataToParent={(e) => getSelectedFromDropDown(e)} />
      </div>

      <section className="flex-grow flex justify-center items-center px-4 py-6 relative">
        {checkoutData ? (
          // Render only Checkout if checkoutData is available
          <Checkout selectedcheckout={checkoutData}/>
        ) : handleDropDownValue === "login" ? (
          <div className="w-full max-w-4xl h-[75%]">
            <Login />
          </div>
        ) : handleDropDownValue === "admin" ? (
          <Admin />
        ) : selection === "Confirmation" ? (
          <Confirmationpage />
        ) : !selection ? (
          <Landingpage sendDataToParent={handleDataFromChild} />
        ) : (
          <DetailsView
            selected={selection}
            sendDataToParent={handleDataFromChild}
            checkoutItem={handleCheckoutItems}
          />
        )}
      </section>

      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
