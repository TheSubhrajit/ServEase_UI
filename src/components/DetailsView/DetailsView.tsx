import { CircularProgress, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";
import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseIcon from '@mui/icons-material/Close';

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const DetailsView: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar
  const [loading, setLoading] = useState(false);

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

  // Callback function to receive search results from Search_form
  const handleSearchResults = (data: any[]) => {
    setSearchResults(data);
    setSidebarOpen(false); // Optionally close the sidebar after search
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/api/serviceproviders/serviceproviders/all'
        ); // Change to your endpoint
        setServiceProvidersData(response.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <LoadingIndicator />
        </Box>
      )}
      {!loading && (
        <div className="details-view-container">
          {/* Sidebar with conditional class for open/closed state */}
          <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <Button
              style={{ float: "right" }}
              variant="outlined"
              onClick={() => setSidebarOpen(false)}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Search_form 
              open={open} 
              selectedValue={""} 
              onClose={handleClose} 
              onSearch={handleSearchResults} // Pass callback for search results
            />
          </div>

          {/* Main body content */}
          <div className="main-content">
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
              {(searchResults.length > 0 ? searchResults : ServiceProvidersData).map((provider, index) => (
                <div className="views" key={index}>
                  <ServiceProvidersDetails {...provider} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsView;
