import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";
import Confirmationpage from "./Confirmationpage"; // Import Child Component
import './serviceCard.css';
interface ServiceProvidersDetailsProps {
  providerDetails: ProviderDetails; // Accept providerDetails as a prop
}

interface ProviderDetails {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  language: string;
  diet: string;
  experience: string;
  otherServices: string;
  currentLocation: string;
  distance: number;
  rating: number;
  ratingsCount: number;
  availability: string;
  profilePic: string;
}

const ServiceProvidersDetails: React.FC = () => {
  const [providerDetails, setProviderDetails] = useState<ProviderDetails | null>(null); // Store data
  const [showConfirmation, setShowConfirmation] = useState(false); // Manage visibility of Confirmationpage
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Simulate fetching data
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/serviceproviders/serviceproviders/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ProviderDetails[] = await response.json();
        setProviderDetails(data[0]); // Assuming you want to show the first provider
      } catch (error) {
        setError("Error fetching provider details");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, []);

  const handleConfirmationClick = () => {
    setShowConfirmation(true); // Show confirmation page on button click
  };
  const handleBackToDetails = () => {
    setShowConfirmation(false); // Navigate back to details
  };

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>{error}</p>; // Error state

  if (!providerDetails) return null; // If provider details are still null, return null

  const {
    firstName,
    lastName,
    age,
    gender,
    language,
    diet,
    experience,
    otherServices,
    currentLocation,
    distance,
    rating,
    ratingsCount,
    availability,
    profilePic,
  } = providerDetails;

  return (
    <div className="content-box"> {/* Wrapper div */}
      <Card className="service-card"
        style={{
          background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        }}>
        
        <div className="avatar-section"> {/* Section for avatar */}
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={`/${profilePic}`}
            className="service-avatar"
          />
        </div>

        <div className="service-details"> {/* Section for service details */}
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '0.5px', marginTop: '0.5px' }}>
            Name:
            <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>
              {firstName} {lastName}
            </span>,
            <span style={{ fontWeight: 'normal', fontSize: '1.2rem', marginLeft: '4px' }}>
              (F, {age})
            </span>
          </Typography>

          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
            Language:
            <span style={{ fontWeight: 'normal', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
              {language || 'English'}
              <img
                src="nonveg.png"
                alt="Diet Symbol"
                style={{ width: '20px', height: '20px', marginLeft: '5px' }}
              />
            </span>
          </Typography>

          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '2px' }}>
            Experience:
            <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>
              {experience || '1 year'}
            </span>,
            Other Services:
            <span style={{ fontWeight: 'normal', fontSize: '1.2rem', marginLeft: '8px' }}>
              {otherServices}
            </span>
          </Typography>
        </div>

        {/* Ratings Section */}
        <div className="service-ratings">
          <div className="rating-summary">
            <Typography variant="body1" className="rating-description">
              {rating >= 4.5 ? "Excellent" : rating >= 3.5 ? "Very Good" : rating >= 2.5 ? "Good" : rating >= 1.5 ? "Fair" : "Poor"}
            </Typography>
            <span className="rating-score">{rating}</span>
          </div>

          <div className="ratings">
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" className="rating-count">
              ({ratingsCount} Ratings)
            </Typography>
          </div>

          <Typography variant="body2" className="availability">
            Availability: {availability}
          </Typography>
        </div>

      </Card>

      {/* Render Confirmationpage if 'showConfirmation' is true */}
      {showConfirmation && (
        <Confirmationpage
          providerDetails={providerDetails}
          onBack={handleBackToDetails} // Pass the onBack function here
        />
      )}
    </div>
  );
};

export default ServiceProvidersDetails;
