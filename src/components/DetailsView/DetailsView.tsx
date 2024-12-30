import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";
import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseIcon from '@mui/icons-material/Close'; 
import { CONFIRMATION } from "../../Constants/pagesConstants";

interface DetailsViewProps {
  sendDataToParent: (data: string) => void;
  selected?: string; // Define the prop type
  checkoutItem?: (data: any) => void;
  selectedProvider?: (data: any) => void; // Optional callback
}

export const DetailsView: React.FC<DetailsViewProps> = ({ sendDataToParent, selected, checkoutItem, selectedProvider }) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProviderType , setSelectedProviderType] = useState("");

  const handleCheckoutData = (data) => {
    console.log('Received checkout data:', data);

    if (checkoutItem) {
      checkoutItem(data); // Send data to the parent component
    }
  };

  useEffect(() => {
    console.log("Selected ...",selected);
    setSelectedProviderType(selected || ''); // Set a default empty string if `selected` is undefined
  
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (selected) {
          response = await axiosInstance.get('api/serviceproviders/role?role=' + selected.toUpperCase());
        } else {
          response = await axiosInstance.get('api/serviceproviders/serviceproviders/all');
        }
        setServiceProvidersData(response?.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selected]);
  

  const handleBackClick = () => {
    sendDataToParent("");
  };

  const handleSearchClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearchResults = (data: any[]) => {
    setSearchResults(data);
    setSidebarOpen(false); // Close the sidebar after receiving results
  };

  const handleCardClick = (provider: any) => {
    if (selectedProvider) {
      selectedProvider(provider); // Ensure selectedProvider is defined before calling it
    }
    sendDataToParent(CONFIRMATION);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <LoadingIndicator />
        </Box>
      ) : (
        <div className="details-view-container">
          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <Button
              style={{ float: "right" }}
              variant="outlined"
              onClick={handleCloseSidebar}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Search_form
              open={sidebarOpen}
              selectedValue={""}
              onClose={handleCloseSidebar}
              onSearch={handleSearchResults}
            />
          </div>

          {/* Main Content */}
          <div className="main-content">
            <>
              <header className="headers">
                <Button onClick={handleBackClick} variant="outlined">
                  Back
                </Button>
                <Button variant="outlined" onClick={handleSearchClick}>
                  Search
                </Button>
              </header>

              <div className="providers-view">
                {(searchResults.length > 0 ? searchResults : ServiceProvidersData).map((provider) => (
                  <div
                    className="views"
                    key={provider.serviceproviderId}
                    onClick={() => handleCardClick(provider)}
                  >
                    <ServiceProvidersDetails {...provider} />
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsView;
