import { Button } from "@mui/material";
import "./DetailsView.css";
import { useEffect, useState } from "react";
import { ServiceProvidersDetails } from "../ServiceProvidersDetails/ServiceProvidersDetails";

import Search_form from "../Search-Form/Search_form";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void; // Adjust the type if needed
}

export const DetailsView: React.FC<ChildComponentProps> = ({
  sendDataToParent,
}) => {
  const [ServiceProvidersData, setServiceProvidersData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleBackClick = () => {
    sendDataToParent("");
  };

  const handleSearchClick = () => {
    console.log("handleSearch");
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
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
        console.log("ServiceProvidersData =>", ServiceProvidersData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="details-view">
        <header className="headers">
          <Button onClick={handleBackClick} variant="outlined">
            Back
          </Button>
          <Button variant="outlined" onClick={handleSearchClick}>
            Search
          </Button>
        </header>

        <div className="providers-view">
          {ServiceProvidersData.map((serviceproviders) => {
            return (
              <div className="views">
                <ServiceProvidersDetails
                  key={serviceproviders["id"]}
                  props={serviceproviders}
                ></ServiceProvidersDetails>
              </div>
            );
          })}
        </div>

        <Search_form
          open={open}
          selectedValue={""}
          onClose={handleClose}
        ></Search_form>
      </div>
    </>
  );
};
