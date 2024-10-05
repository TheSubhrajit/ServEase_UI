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
      <Tooltip title="Cook" arrow>
        <div className="selectors" onClick={() => handleClick("cook")}>
          <img className="icon" src="../cooking.png" alt="Cook" />
        </div>
      </Tooltip>
      <Tooltip title="Maid" arrow>
        <div className="selectors" onClick={() => handleClick("maid")}>
          <img className="icon" src="../cleaner.png" alt="Maid" />
        </div>
      </Tooltip>
      <Tooltip title="Nanny" arrow>
        <div className="selectors" onClick={() => handleClick("nanny")}>
          <img className="icon" src="../babysitter.png" alt="Nanny" />
        </div>
      </Tooltip>
    </section>
  );
};
