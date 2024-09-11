import { Tooltip } from "@mui/material";
import "./Landingpage.css";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void; // Adjust the type if needed
}

export const Landingpage: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const handleClick = (e: any) => {
    sendDataToParent(e);
  };

  return (
    <section className="landing-container">
      <Tooltip title="Cook" arrow>
        <div className="selectors" onClick={(e) => handleClick("cook")}>
          <img src="../cooking.png"></img>
        </div>
      </Tooltip>
      <Tooltip title="Maid" arrow>
        <div className="selectors" onClick={(e) => handleClick("maid")}>
          <img src="../cleaner.png"></img>
        </div>
      </Tooltip>
      <Tooltip title="Nanny" arrow>
        <div className="selectors" onClick={(e) => handleClick("nanny")}>
          <img src="../babysitter.png"></img>
        </div>
      </Tooltip>
    </section>
  );
};
