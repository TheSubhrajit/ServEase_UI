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
          <img src="../cook_animated.png" alt="Cook" />
        </div>
      </Tooltip>
      <Tooltip title="Maid" arrow>
        <div className="selectors" onClick={() => handleClick("maid")}>
          <img src="../maid.png" alt="Maid" />
        </div>
      </Tooltip>
      <Tooltip title="Nanny" arrow>
        <div className="selectors" onClick={() => handleClick("nanny")}>
          <img src="../nanny.png" alt="Nanny" />
        </div>
      </Tooltip>
    </section>
  );
};
