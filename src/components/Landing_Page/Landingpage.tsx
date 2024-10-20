import React from "react";
import { Tooltip } from "@mui/material";
import "./Landingpage.css";
import MapComponent from "../MapComponent/MapComponent"

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Landingpage: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {
  const handleClick = (data: string) => {
    sendDataToParent(data);
  };

  return (
    <section className="landing-container">
       {/* <div className="selector-container">
        <Tooltip title="Cook" arrow>
          <div className="selectors" onClick={() => handleClick("cook")}>
            <img src="../cooking.png" alt="Cook" />
          </div>
        </Tooltip>
        <p className="label-text">Cook</p> 
      </div>
      
      <div className="selector-container">
        <Tooltip title="Maid" arrow>
          <div className="selectors" onClick={() => handleClick("maid")}>
            <img src="../cleaner.png" alt="Maid" />
          </div>
        </Tooltip>
        <p className="label-text">Maid</p>
      </div>
      
      <div className="selector-container">
        <Tooltip title="Nanny" arrow>
          <div className="selectors" onClick={() => handleClick("nanny")}>
            <img src="../nanny.png" alt="Nanny" />
          </div>
        </Tooltip>
        <p className="label-text">Nanny</p>
      </div> */}

<h1>Google Map with a Pin</h1>
<MapComponent />
     
    </section>
  );
};
