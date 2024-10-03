
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header/Header";
import { Landingpage } from "./components/Landing_Page/Landingpage";
import { DetailsView } from "./components/DetailsView/DetailsView";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";

function App() {
  const [selection, setSelection] = useState();
  const [handleDropDownValue , setDropDownvalue] = useState(undefined);
  const handleDataFromChild = (e: any) => {
    setSelection(e);
  };

  const getSelectedFromDropDown = (e:any) =>{
    console.log(e)
    setSelection(undefined)
      setDropDownvalue(e);
  }

  return (
    <div className="App">
      <Header sendDataToParent={(e) => getSelectedFromDropDown(e)} />
{
  handleDropDownValue === 'login' ? (
    <Login />
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

{/* <Footer></Footer> */}
    </div>
  );
}

export default App;