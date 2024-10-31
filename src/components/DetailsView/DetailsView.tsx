// DetailsView.tsx
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
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/api/serviceproviders/serviceproviders/all'); // Change to your endpoint
        setServiceProvidersData(response.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      }
      finally{
        setTimeout(() => {
                  setLoading(false);
                }, 2000);
      }
    };
    fetchData();
  }, []);



  const handleCardClick = () => {
    sendDataToParent("Confirmation");  // Trigger transition to Confirmation page
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <LoadingIndicator />
        </Box>
      ) : (
        <div className="details-view">
          <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <Button
              style={{ float: "right" }}
              variant="outlined"
              onClick={() => setSidebarOpen(false)}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Search_form open={false} selectedValue={""} onClose={() => {}} />
          </div>

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
                  onClick={handleCardClick}  // Trigger on card click
                >
                  <ServiceProvidersDetails {...serviceProvider} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
