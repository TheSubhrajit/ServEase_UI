import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../features/user/userSlice";

//   interface ChildComponentProps {
//     sendDataToParent: (data: string) => void; // Callback to close UserProfile
//   goBack: () => void;
// }

interface UserProfileProps {
  goBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ goBack}) => {
  const dispatch = useDispatch();

  // Access user data from Redux store
  const userData = useSelector((state: any) => state.user.value);

  const [formData, setFormData] = useState({
    account: {
      firstName: "",
      lastName: "",
      mobileNo: "",
      emailId: "",
      age: "",
    },
    location: {
      buildingName: "",
      locality: "",
      street: "",
      pincode: "",
      nearbyLocation: "",
      currentLocation: "",
    },
    additional: {
      idNo: "",
      languageKnown: "",
      housekeepingRole: "",
      cookingSpeciality: "",
      diet: "",
    },
  });

  // Populate formData from Redux store
  useEffect(() => {
    if (userData) {
      setFormData({
        account: {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          mobileNo: userData.mobileNo || "",
          emailId: userData.emailId || "",
          age: userData.age || "",
        },
        location: {
          buildingName: userData.buildingName || "",
          locality: userData.locality || "",
          street: userData.street || "",
          pincode: userData.pincode || "",
          nearbyLocation: userData.nearbyLocation || "",
          currentLocation: userData.currentLocation || "",
        },
        additional: {
          idNo: userData.idNo || "",
          languageKnown: userData.languageKnown || "",
          housekeepingRole: userData.housekeepingRole || "",
          cookingSpeciality: userData.cookingSpeciality || "",
          diet: userData.diet || "",
        },
      });
    }
  }, [userData]);

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Merge all sections into one object and dispatch to Redux
    const updatedData = {
      ...formData.account,
      ...formData.location,
      ...formData.additional,
    };

    dispatch(add(updatedData)); // Update Redux store
    alert("Form data updated successfully!");
  };

  return (
    
    <>
     
      <div>
      {/* <button onClick={sendDataToParent}>Back</button> */}
        <div
          style={{
            gap: "10px",
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
            display: "grid",
            backgroundColor: "beige",
          }}
        >
          {/* Account Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Account</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={formData.account.firstName}
                onChange={(e) =>
                  handleChange("account", "firstName", e.target.value)
                }
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={formData.account.lastName}
                onChange={(e) =>
                  handleChange("account", "lastName", e.target.value)
                }
              />
              <TextField
                label="Mobile Number"
                fullWidth
                margin="normal"
                value={formData.account.mobileNo}
                onChange={(e) =>
                  handleChange("account", "mobileNo", e.target.value)
                }
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={formData.account.emailId}
                onChange={(e) =>
                  handleChange("account", "emailId", e.target.value)
                }
              />
              <TextField
                label="Age"
                fullWidth
                margin="normal"
                value={formData.account.age}
                onChange={(e) => handleChange("account", "age", e.target.value)}
              />
            </AccordionDetails>
          </Accordion>

          {/* Location Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Location Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Location fields */}
              <TextField
                label="Building Name"
                fullWidth
                margin="normal"
                value={formData.location.buildingName}
                onChange={(e) =>
                  handleChange("location", "buildingName", e.target.value)
                }
              />
              <TextField
                label="Locality"
                fullWidth
                margin="normal"
                value={formData.location.locality}
                onChange={(e) =>
                  handleChange("location", "locality", e.target.value)
                }
              />
              <TextField
                label="Street"
                fullWidth
                margin="normal"
                value={formData.location.street}
                onChange={(e) =>
                  handleChange("location", "street", e.target.value)
                }
              />
              <TextField
                label="Pin Code"
                fullWidth
                margin="normal"
                value={formData.location.pincode}
                onChange={(e) =>
                  handleChange("location", "pincode", e.target.value)
                }
              />
              <TextField
                label="Nearby Location"
                fullWidth
                margin="normal"
                value={formData.location.nearbyLocation}
                onChange={(e) =>
                  handleChange("location", "nearbyLocation", e.target.value)
                }
              />
              <TextField
                label="Current Location"
                fullWidth
                margin="normal"
                value={formData.location.currentLocation}
                onChange={(e) =>
                  handleChange("location", "currentLocation", e.target.value)
                }
              />
            </AccordionDetails>
          </Accordion>

          {/* Additional Details Accordion */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Additional Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Additional fields */}
              <TextField
                label="Aadhaar Card Number"
                fullWidth
                margin="normal"
                value={formData.additional.idNo}
                onChange={(e) =>
                  handleChange("additional", "idNo", e.target.value)
                }
              />
              <TextField
                label="Languages"
                fullWidth
                margin="normal"
                value={formData.additional.languageKnown}
                onChange={(e) =>
                  handleChange("additional", "languageKnown", e.target.value)
                }
              />
              <TextField
                label="Housekeeping Role"
                fullWidth
                margin="normal"
                value={formData.additional.housekeepingRole}
                onChange={(e) =>
                  handleChange("additional", "housekeepingRole", e.target.value)
                }
              />
              <TextField
                label="Cooking Speciality"
                fullWidth
                margin="normal"
                value={formData.additional.cookingSpeciality}
                onChange={(e) =>
                  handleChange(
                    "additional",
                    "cookingSpeciality",
                    e.target.value
                  )
                }
              />
              <TextField
                label="Diet"
                fullWidth
                margin="normal"
                value={formData.additional.diet}
                onChange={(e) =>
                  handleChange("additional", "diet", e.target.value)
                }
              />
            </AccordionDetails>
          </Accordion>

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ width: "30px", marginTop: "30px" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
