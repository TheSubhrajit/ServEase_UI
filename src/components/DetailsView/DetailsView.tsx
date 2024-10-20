import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";
import axios from 'axios';
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
        // Fetch data with credentials (if your backend requires them)
        const response = await fetch("65.2.153.173:8080/api/serviceproviders/serviceproviders/all", {
          method: "GET",  // You can specify the HTTP method if needed
          headers: {
            "Content-Type": "application/json",  // or any other required headers
            // You can add more headers if needed, e.g. Authorization token
          },
          credentials: "include", // To send cookies with the request if necessary
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        // Parse the JSON data
        const data = await response.json();
        setServiceProvidersData(data);  // Update the state with the fetched data
  
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  
    fetchData();
  }, []);


  useEffect (()=>{
    axios.get('http://localhost:8081/api/serviceproviders/serviceproviders/all', { 
      withCredentials: false  // Include cookies and credentials with the request (optional)
    })
  .then(response => {
    console.log('Response data:', response.data); // Log the data returned from the server
  })
  .catch(error => {
    console.error('There was an error!', error);  // Handle any errors
  });
  })

  
  

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
