
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import UserProfile from "./components/User-Profile/UserProfile";
import { Header } from "./components/Header/Header";
import { Landingpage } from "./components/Landing_Page/Landingpage";
import { DetailsView } from "./components/DetailsView/DetailsView";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";



// function App() {
//   return (

//    <>
//   <UserProfile/>
//    </>

//   );
function App() {
  const [selection, setSelection] = useState();
  const [handleDropDownValue , setDropDownvalue] = useState(undefined);
  const handleDataFromChild = (e: any) => {
    setSelection(e);
  };

  const getSelectedFromDropDown = (e:any) =>{
    setSelection(undefined)
      setDropDownvalue(e);
  }
return (
    <div className="App">
    <div className="header-class">
      <Header sendDataToParent={(e) => getSelectedFromDropDown(e)} />
    </div>
    <section className="flex-grow flex justify-center items-center px-4 py-6 relative">
      {
        handleDropDownValue === 'login' ? (
          <div className="w-full max-w-4xl h-[75%]">
          <Login />
          </div>
        ) : handleDropDownValue === 'admin' ? (
          <Admin />
        ) : (
          <>
            {!selection ? (
              <Landingpage sendDataToParent={(e) => handleDataFromChild(e)} />
            ) : (
              <DetailsView sendDataToParent={(e) => handleDataFromChild(e)} />
            )}
          </>
        )
      }
    </section>
  
    <footer className="footer-container">
      <Footer />
    </footer>
  </div>
  
  );
}

export default App;