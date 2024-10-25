import React from "react";
import { Tooltip } from "@mui/material";
import "./Landingpage.css";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Landingpage: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {
  const handleClick = (data: string) => {
    sendDataToParent(data);
  };

  return (
    <section className="landing-container">
       <div className="selector-container">
        <Tooltip title="Cook" arrow>
          <div className="selectors" onClick={() => handleClick("cook")}>
            <img src="../cook_b.png" alt="Cook" />
          </div>
        </Tooltip>
        <p className="label-text">Cook</p> {/* Label below the circle */}
      </div>
      
      <div className="selector-container">
        <Tooltip title="Maid" arrow>
          <div className="selectors" onClick={() => handleClick("maid")}>
            <img src="../maid_b.png" alt="Maid" />
          </div>
        </Tooltip>
        <p className="label-text">Maid</p> {/* Label below the circle */}
      </div>
      
      <div className="selector-container">
        <Tooltip title="Nanny" arrow>
          <div className="selectors" onClick={() => handleClick("nanny")}>
            <img src="../nanny_a.png" alt="Nanny" />
          </div>
        </Tooltip>
        <p className="label-text">Nanny</p> {/* Label below the circle */}
      </div>
     
    </section>
    
  );
};