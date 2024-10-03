
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
// import { ServiceProvidersDetails } from "../ServiceProvidersDetails/ServiceProvidersDetails";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void; // Adjust the type if needed
}

export const DetailsView: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar

  const handleBackClick = () => {
    sendDataToParent("");
  };

  const handleSearchClick = () => {
    //setOpen(true);
    setSidebarOpen(true)

  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSidebarOpen(false); // Close sidebar when search form closes
  };

  const toggleSidebar = (open: boolean) => {
    setSidebarOpen(open);
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
        <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`} ref={sidebarRef}>
          <button className=" w3-bar-item w3-button w3-large " onClick={() => toggleSidebar(false)}>
            Close &times;
          </button>
          <Search_form
          open={open}
          selectedValue={""}
          onClose={handleClose}
        ></Search_form>
        </div>
        <div className="body">
          <header className="headers">
            <Button onClick={handleBackClick} variant="outlined">
              Back
            </Button>
            <Button variant="outlined" onClick={handleSearchClick}>
              Search
            </Button>
          </header>

          <div className="providers-view">
            {ServiceProvidersData.map((serviceproviders) => (
             <div className="views" key={serviceproviders.id}>
             <ServiceProvidersDetails {...serviceproviders} />
           </div>
           
            ))}
          </div>
        </div>

      </div>
    
  );
};
