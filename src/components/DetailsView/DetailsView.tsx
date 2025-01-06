
import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Search_form from "../Search-Form/Search_form";
import "./DetailsView.css";
import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { CONFIRMATION } from "../../Constants/pagesConstants";
import ProviderDetails from "../ProviderDetails/ProviderDetails";

interface DetailsViewProps {
  sendDataToParent: (data: string) => void;
  selected?: string; 
  checkoutItem?: (data: any) => void;
  selectedProvider?: (data: any) => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({ sendDataToParent, selected, checkoutItem, selectedProvider }) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProviderType, setSelectedProviderType] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleCheckoutData = (data) => {
    if (checkoutItem) {
      checkoutItem(data);
    }
  };

  useEffect(() => {
    setSelectedProviderType(selected || "");
    fetchInitialData();
  }, [selected]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      let response;
      if (selected) {
        response = await axiosInstance.get(`api/serviceproviders/role?role=${selected.toUpperCase()}&page=0`);
      } else {
        response = await axiosInstance.get("api/serviceproviders/serviceproviders/all?page=0");
      }
      setServiceProvidersData(response?.data || []);
      setHasMore(response?.data?.length > 0);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      let response;
      if (selected) {
        response = await axiosInstance.get(`api/serviceproviders/role?role=${selected.toUpperCase()}&page=${nextPage}`);
      } else {
        response = await axiosInstance.get(`api/serviceproviders/serviceproviders/all?page=${nextPage}`);
      }
      const newData = response?.data || [];
      setServiceProvidersData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length > 0);
      setPage(nextPage);
    } catch (err) {
      console.error("Error fetching more data:", err);
    }
  };

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
    setSidebarOpen(false);
    setHasMore(false);
  };

  const handleSelectedProvider = (provider: any) => {
    if (selectedProvider) {
      selectedProvider(provider);
    }
    sendDataToParent(CONFIRMATION);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <LoadingIndicator />
        </Box>
      ) : (
        <div className="details-view-container">
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
                <InfiniteScroll
                  pageStart={0}
                  loadMore={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <div className="loader" key="loader">
                      Loading ...
                    </div>
                  }
                >
                  {(searchResults.length > 0 ? searchResults : ServiceProvidersData).map((provider) => (
                    <div
                      className="views"
                      key={provider.serviceproviderId}
                    >
                      <ProviderDetails {...provider} selectedProvider={handleSelectedProvider} />
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsView;
