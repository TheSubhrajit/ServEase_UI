import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Header } from "./components/Header/Header";
// import { Landingpage } from "./components/Landing_Page/Landingpage";
// import { DetailsView } from "./components/DetailsView/DetailsView";
// import Footer from "./components/Footer/Footer";
import ServiceProviderRegistration from './components/Registration/ServiceProviderRegistration';
function App() {
  const [selection, setSelection] = useState();
  const handleDataFromChild = (e: any) => {
    setSelection(e);
  };

  return (
    <div className="App">
      {/* <Login />
       */}
      {/* <Header></Header> */}
      {/* {!selection && (
        <Landingpage sendDataToParent={(e) => handleDataFromChild(e)} />
      )} */}
      {/* {selection && (
        <DetailsView sendDataToParent={(e) => handleDataFromChild(e)} />
      )} */}
       {/* Footer */}
       {/* <Footer /> */}

       <ServiceProviderRegistration />
    </div>
  );
}

export default App;
