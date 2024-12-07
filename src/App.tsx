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
import ChipInput from "./components/Common/ChipInput/ChipInput";
import Dashboard from "./components/Dashboard/Dashboard";
import Edit_provider from "./components/Edit_provider";
import ForgotPassword from "./components/Login/ForgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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

  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipChange = (newChips: string[]) => {
    setSelectedChips(newChips);
    console.log(selectedChips)
  };

  const movieOptions = [
    'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Forrest Gump', 'Inception'
  ];

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit-provider" element={<Edit_provider />} />
      </Routes>
    </Router>
    </>
  //   <div className="App">
  //  <div className="header-class">
  //     <Header sendDataToParent={(e) => getSelectedFromDropDown(e)} />
  //   </div> 
  //   <section className="flex-grow flex justify-center items-center px-4 py-6 relative">
  //   {handleDropDownValue === "login" ? (
  //         <div className="w-full max-w-4xl h-[75%]">
  //           <Login />
  //         </div>
  //       ) : handleDropDownValue === "admin" ? (
  //         <Admin />
  //       ) : selection === "Confirmation" ? (
  //         <Confirmationpage />
  //       ) : !selection ? (
  //         <Landingpage sendDataToParent={handleDataFromChild} />
  //       ) : (
  //         <DetailsView sendDataToParent={handleDataFromChild} />
  //       )}
  //     </section>
  //     <footer className="footer-container">
  //       <Footer />
  //     </footer>
  //     {/* <ForgotPassword></ForgotPassword> */}


  //       {/* {To be used by Subhrajit for chip input}  */}
  //     {/* <ChipInput options={movieOptions} onChange={handleChipChange} label="Movie" placeholder="Select your favorite movies" /> */}
  //   </div>
  );
}


export default App;