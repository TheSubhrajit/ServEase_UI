import { CircularProgress, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";
import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseIcon from '@mui/icons-material/Close'; 
import Confirmationpage from "../ServiceProvidersDetails/Confirmationpage"; // Adjust the path accordingly

interface DetailsViewProps {
  sendDataToParent: (data: string) => void;
  selected? : string; // Define the prop type
  checkoutItem?: (data: any) => void;
}
  

export const DetailsView: React.FC<DetailsViewProps> = ({ sendDataToParent , selected , checkoutItem}) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("DetailsView");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const [checkoutData, setCheckoutData] = useState(null);

  // Callback to receive data from Confirmationpage
  const handleCheckoutData = (data) => {
    setCheckoutData(data); // Save the data sent from the child component
    console.log('Received checkout data:', data);

    // Send the received data back to the parent via the callback function
    if (checkoutItem) {
      checkoutItem(data); // Send data to the parent component
    }
  };

  useEffect(() => {
    console.log(selected)
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if(selected){
         
          response = await axiosInstance.get('api/serviceproviders/role?role='+selected.toUpperCase());
        } 
        else {
          response = await axiosInstance.get('/api/serviceproviders/serviceproviders/all');
        }
        
        setServiceProvidersData(response?.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    setSelectedProvider(provider);
    setCurrentView("Confirmation");
  };

  const handleBackToDetails = () => {
    setCurrentView("DetailsView");
    setSelectedProvider(null);
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
            {currentView === "DetailsView" && (
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
            )}

            {currentView === "Confirmation" && selectedProvider && (
              <Confirmationpage
                firstName={selectedProvider.firstName}
                middleName={selectedProvider.middleName}
                lastName={selectedProvider.lastName}
                age={selectedProvider.age}
                gender={selectedProvider.gender}
                diet={selectedProvider.diet}
                cookingSpeciality={selectedProvider.cookingSpeciality}
                language={selectedProvider.language}
                experience={selectedProvider.experience}
                otherServices={selectedProvider.otherServices}
                rating={selectedProvider.rating}
                ratingsCount={selectedProvider.ratingsCount}
                availability={selectedProvider.availability}
                profilePic={selectedProvider.profilePic}
                role = {selected}
                onBack={handleCheckoutData}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsView;
