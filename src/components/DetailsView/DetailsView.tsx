// DetailsView.tsx
import { CircularProgress, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/serviceproviders/serviceproviders/all");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setServiceProvidersData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
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
          <CircularProgress />
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
