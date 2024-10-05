import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";

import CloseIcon from '@mui/icons-material/Close'; 

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const DetailsView: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  const handleBackClick = () => {
    sendDataToParent("");
  };

  const handleSearchClick = () => {
    setSidebarOpen(true); // Open sidebar when Search is clicked
  };

  const handleClose = () => {
    setOpen(false);
    setSidebarOpen(false); // Close sidebar when search form closes
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setServiceProvidersData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="details-view">
      {/* Sidebar with conditional class for open/closed state */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      
          <Button style={{float : 'right'}} variant="outlined" onClick={() => setSidebarOpen(false)}  startIcon={<CloseIcon /> }>
        Close
      </Button>
        <Search_form open={open} selectedValue={""} onClose={handleClose} />
      </div>

      {/* Main body content */}
      <div className={`body-parser ${sidebarOpen ? 'hidden' : ''}`}>
        <header className="headers">
          <Button onClick={handleBackClick} variant="outlined">
            Back
          </Button>
          <Button variant="outlined" onClick={handleSearchClick}>
            Search
          </Button>
        </header>

        {/* List of Service Providers */}
        <div className="providers-view">
          {ServiceProvidersData.map((serviceProvider) => (
            <div className="views" key={serviceProvider.id}>
              <ServiceProvidersDetails {...serviceProvider} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
