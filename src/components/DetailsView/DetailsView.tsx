import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Button } from '@mui/material';
import Search_form from "../Search-Form/Search_form";
// import { ServiceProvidersDetails } from "../ServiceProvidersDetails/ServiceProvidersDetails"; 
import "./DetailsView.css";
import React from 'react';


interface ChildComponentProps {
  sendDataToParent: (data: string) => void; // Adjust the type if needed
}
const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
const [open, setOpen] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar

const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar



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


export const DetailsView: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  
  
const axiosInstance = axios.create({
  baseURL: "https://freetestapi.com/api/v1/",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent, like adding headers
    console.log("Request sent", config);
    return config;
  },
  (error) => {
    // Handle the error in the request
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    console.log("Response received", response);
    return response;
  },
  (error) => {
    // Handle response errors globally
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

// const ServiceProvidersList = () => {
  const [loading, setLoading] = useState(false);
  const [ServiceProvidersData, setServiceProvidersData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get("users");
        setServiceProvidersData(response.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = (isOpen) => setSidebarOpen(isOpen);
  const handleBackClick = () => console.log("Back button clicked");
  const handleSearchClick = () => console.log("Search button clicked");
  const handleClose = () => console.log("Search form closed");

  return (
    <>
      {
        loading && <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
      {
        !loading && <div className="details-view">
          <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
            <button className="w3-bar-item w3-button w3-large" onClick={() => toggleSidebar(false)}>
              Close &times;
            </button>
            <Search_form
              open={true}
              selectedValue={""}
              onClose={handleClose}
            />
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
                <div className="views" key={serviceproviders}>
                  {/* <ServiceProvidersDetails
                    props={serviceproviders}
                  /> */}
                </div>
              ))}
            </div>
          </div>

        </div>
      }
    </>
  );
};

