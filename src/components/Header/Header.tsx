/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Avatar,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the path as necessary
import axios from "axios";
import { keys } from "../../env/env";
import "./Header.css";
import MapComponent from "../MapComponent/MapComponent";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
}

export const Header: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {
  const handleClick = (e: any) => {
    sendDataToParent(e);
  };

  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accountEl, setAccountEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Redux state
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json`,
              {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: keys.api_key,
                },
              }
            );
            const address = response.data.results[0]?.formatted_address;
            setLocation(address);
          } catch (error) {
            console.log("Failed to fetch location");
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setLocation(dataFromMap);
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [dataFromMap, setDataFromMap] = useState("");

  const updateLocationFromMap = (data: string): void => {
    setDataFromMap(data);
  };

  return (
    <>
      <Navbar className="header" expand="lg">
        <div className="header-alignment">
          <div className="logo-container">
            <img
              src="../logo.png"
              className="logo-style"
              alt="logo"
              onClick={() => handleClick("Landing_Page")}
              style={{ cursor: "pointer" }}
            />
            <div className="logo-text">
              <span className="home-text">Home</span>
              <span className="servease-text">ServEase</span>
            </div>
          </div>

          <div className="dropdowns-container">
            <TextField
              variant="outlined"
              fullWidth
              value={location}
              onClick={handleClickOpen}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon
                      sx={{ fontSize: 30, color: "#0d6efd", cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                width: "50%",
                "&:hover": {
                  cursor: "pointer",
                },
                cursor: "pointer",
              }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              onClick={handleAccountMenuOpen}
              color="inherit"
              sx={{ width: 60, height: 60 }}
            >
              <AccountCircle sx={{ fontSize: 30, color: "#0d6efd" }} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={accountEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(accountEl)}
              onClose={handleAccountMenuClose}
            >
              {user.isLoggedIn ? (
                <>
                  <MenuItem onClick={handleAccountMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleAccountMenuClose}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => handleClick("sign_out")}>
                    Sign Out
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleClick("login");
                    handleAccountMenuClose();
                  }}
                >
                  Login / Register
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Set Location</DialogTitle>
          <DialogContent
            sx={{ p: 0, display: "flex", flexDirection: "column", width: "600px" }}
          >
            <div style={{ height: "400px", width: "100%" }}>
              <MapComponent
                style={{ height: "100%", width: "100%" }}
                onLocationSelect={updateLocationFromMap}
              />
            </div>
          </DialogContent>

          <DialogActions sx={{ padding: "10px" }}>
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Navbar>
    </>
  );
};
