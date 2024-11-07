import { CircularProgress, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ServiceProvidersDetails from "../ServiceProvidersDetails/ServiceProvidersDetails";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";

import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseIcon from '@mui/icons-material/Close'; 
import Confirmationpage from "../ServiceProvidersDetails/Confirmationpage";// Adjust the path accordingly

interface DetailsViewProps {
  sendDataToParent: (data: string) => void; // Define the prop type
}

export const DetailsView: React.FC<DetailsViewProps> = ({ sendDataToParent }) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("DetailsView");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/serviceproviders/serviceproviders/all');
        setServiceProvidersData(response.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (provider: any) => {
    setSelectedProvider(provider);
    setCurrentView("Confirmation");
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <LoadingIndicator />
        </Box>
      ) : (
        <div className="details-view">
          {currentView === "DetailsView" && (
            <div className="body-parser">
              <header className="headers">
                <Button onClick={() => sendDataToParent("")} variant="outlined">
                  Back
                </Button>
                <Button variant="outlined" onClick={() => setSidebarOpen(true)}>
                  Search
                </Button>
              </header>
              <div className="providers-view">
                {ServiceProvidersData.map((serviceProvider) => (
                  <div
                    className="views"
                    key={serviceProvider.serviceproviderId}
                    onClick={() => handleCardClick(serviceProvider)}
                  >
                    <ServiceProvidersDetails {...serviceProvider} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === "Confirmation" && selectedProvider && (
            <Confirmationpage
              firstName={selectedProvider.firstName}
              lastName={selectedProvider.lastName}
              age={selectedProvider.age}
              gender={selectedProvider.gender}
              language={selectedProvider.language}
              experience={selectedProvider.experience}
              profilePic={selectedProvider.profilePic}
              onBack={() => {
                setCurrentView("DetailsView");
                setSelectedProvider(null);
              }} 
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailsView;
