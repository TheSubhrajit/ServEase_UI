
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./components/Header/Header";
import { Landingpage } from "./components/Landing_Page/Landingpage";
import { DetailsView } from "./components/DetailsView/DetailsView";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Confirmationpage from "./components/ServiceProvidersDetails/Confirmationpage";


function App() {
  const [selection, setSelection] = useState<string | undefined>(); // State to manage selections
  const [handleDropDownValue, setDropDownvalue] = useState<string | undefined>();

  // Function to handle child component communication
  const handleDataFromChild = (e: string) => {
    setSelection(e);  // Update selection based on child component's input
  };

  const getSelectedFromDropDown = (e: string) => {
    setSelection(undefined); // Reset selection on dropdown change
    setDropDownvalue(e);
  };

  return (
    <div className="App">
    <div className="header-class">
      <Header sendDataToParent={(e) => getSelectedFromDropDown(e)} />
    </div>
    <section className="flex-grow flex justify-center items-center px-4 py-6 relative">
    {handleDropDownValue === "login" ? (
          <div className="w-full max-w-4xl h-[75%]">
            <Login />
          </div>
        ) : handleDropDownValue === "admin" ? (
          <Admin />
        ) : selection === "Confirmation" ? ( // Show confirmation page only if selection is "Confirmation"
          <Confirmationpage />
        ) : !selection ? (
          <Landingpage sendDataToParent={handleDataFromChild} />
        ) : (
          <DetailsView sendDataToParent={handleDataFromChild} />
        )}
      </section>
      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );
}


export default App;