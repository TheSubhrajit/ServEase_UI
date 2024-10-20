import React, { useEffect } from "react";
import { 
  Card, 
  Typography, 
  Avatar, 
  Rating 
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import './serviceCard.css';

const ServiceProvidersDetails = (props: any) => {
  const { name, age, category, service, language, address, distance, rating, ratingsCount, availability, profilePic } = props;
  // Function to determine rating description based on score
  const getRatingDescription = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Very Good";
    if (rating >= 2.5) return "Good";
    if (rating >= 1.5) return "Fair";
    return "Poor";
  };
  return (
    <div className="content-box"> {/* Wrapper div */}
      <Card className="service-card">
        <div className="avatar-section"> {/* Section for avatar */}
          <Avatar
            alt={service}
            src={`/${profilePic}`}
            className="service-avatar"
          />
        </div>

        <div className="service-details"> {/* Section for service details */}
          <Typography variant="h6">Name: {name}</Typography>
          <Typography>Male, {age} yrs</Typography>
          <Typography>Category: {category}</Typography>
          <Typography>Service: {service}</Typography>
          <Typography>Language: {language}</Typography>
          <Typography>Address: {address}</Typography>
        </div>

        <div className="service-ratings"> 
          <div className="rating-summary">
            <Typography variant="body1" className="rating-description">
              {getRatingDescription(rating)} 
            </Typography>
            <span className="rating-score">{rating.toFixed(1)}</span>
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

          <div className="location">
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              {distance} km from your location
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

function App() {
  const services = [{"serviceproviderId":1,"firstName":"shaiqua","middleName":null,"lastName":"Taj","mobileNo":8171340887,"alternateNo":9113117819,"emailId":"shaiquataj098@gmail.com","gender":"MALE","buildingName":"jamal","locality":"sahrsa","street":"meertola","pincode":852111,"currentLocation":"sahrsaBihar","nearbyLocation":"saba","enrolledDate":"2024-10-10T05:09:53.718+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"AZ2433","active":true,"kyc":"PAN"},{"serviceproviderId":2,"firstName":"Diya","middleName":null,"lastName":"singha","mobileNo":1236547896,"alternateNo":4563217896,"emailId":"diya@gmail.com","gender":"FEMALE","buildingName":"UB","locality":"Bangalore","street":"12A","pincode":789654,"currentLocation":"shreenagar","nearbyLocation":"narayanpur","enrolledDate":"2024-10-10T05:44:11.326+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"ASD124","active":true,"kyc":"PAN"},{"serviceproviderId":3,"firstName":"Subhrajit","middleName":null,"lastName":"Dutta","mobileNo":9093287705,"alternateNo":8250288181,"emailId":"subhrajitdutta123@gmail.com","gender":"MALE","buildingName":"Dutta","locality":"Haringhata","street":"Jaleshwar Road","pincode":741257,"currentLocation":"Haripara","nearbyLocation":"Nagarukhra","enrolledDate":"2024-10-10T05:45:46.167+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"AZ2369","active":true,"kyc":"PAN"},{"serviceproviderId":4,"firstName":"Subhrajit","middleName":null,"lastName":"Dutta","mobileNo":9093287705,"alternateNo":8250288181,"emailId":"subhrajitdutta123@gmail.com","gender":"MALE","buildingName":"Dutta","locality":"Haringhata","street":"Jaleshwar Road","pincode":741257,"currentLocation":"Haripara","nearbyLocation":"Nagarukhra","enrolledDate":"2024-10-10T05:48:40.056+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"1234 4321 5678 8765","active":true,"kyc":"AADHAR"},{"serviceproviderId":5,"firstName":"riya","middleName":null,"lastName":"Roy","mobileNo":1236544596,"alternateNo":4563240896,"emailId":"riya@gmail.com","gender":"FEMALE","buildingName":"Ab","locality":"XYZ","street":"10A","pincode":789664,"currentLocation":"Srirampur","nearbyLocation":"nayanpur","enrolledDate":"2024-10-10T05:51:51.851+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"1234568563","active":true,"kyc":"DL"},{"serviceproviderId":6,"firstName":"Horidas","middleName":null,"lastName":"Pal","mobileNo":6969287705,"alternateNo":8250698169,"emailId":"horidaspal69@gmail.com","gender":"MALE","buildingName":"TaposPal","locality":"Haringhata","street":"Jaleshwar Road","pincode":741001,"currentLocation":"Haripara","nearbyLocation":"Nagarukhra","enrolledDate":"2024-10-10T05:52:13.253+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"1234 4321 5678 6959","active":true,"kyc":"AADHAR"},{"serviceproviderId":7,"firstName":"Ananya","middleName":null,"lastName":"Das","mobileNo":9856471230,"alternateNo":7894561230,"emailId":"ananya.das@yahoo.com","gender":"FEMALE","buildingName":"Skyview Apartments","locality":"Park Street","street":"2B","pincode":700016,"currentLocation":"Kolkata","nearbyLocation":"Esplanade","enrolledDate":"2024-10-10T05:56:31.207+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"9876543210","active":true,"kyc":"AADHAR"},{"serviceproviderId":8,"firstName":"Sourav","middleName":null,"lastName":"Chakraborty","mobileNo":9876543212,"alternateNo":7856421596,"emailId":"sourav.chak@gmail.com","gender":"MALE","buildingName":"Green View Residency","locality":"Salt Lake","street":"5D","pincode":700091,"currentLocation":"Kolkata","nearbyLocation":"Newtown","enrolledDate":"2024-10-10T05:56:56.401+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"4567891234","active":true,"kyc":"PAN"},{"serviceproviderId":9,"firstName":"Priya","middleName":null,"lastName":"Sen","mobileNo":9564781230,"alternateNo":8569741203,"emailId":"priya.sen@hotmail.com","gender":"FEMALE","buildingName":"Lake Town Residency","locality":"Lake Town","street":"8F","pincode":700089,"currentLocation":"Kolkata","nearbyLocation":"Dumdum","enrolledDate":"2024-10-10T05:57:20.602+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"1452369874","active":true,"kyc":"PAN"},{"serviceproviderId":10,"firstName":"Rajesh","middleName":null,"lastName":"Sharma","mobileNo":9965471235,"alternateNo":7569845623,"emailId":"rajesh.sharma@gmail.com","gender":"MALE","buildingName":"Sunshine Towers","locality":"Andheri East","street":"7A","pincode":400069,"currentLocation":"Mumbai","nearbyLocation":"Powai","enrolledDate":"2024-10-10T05:57:46.811+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"3256897412","active":true,"kyc":"DL"},{"serviceproviderId":11,"firstName":"Sumit","middleName":null,"lastName":"Roy","mobileNo":7854123698,"alternateNo":9632147856,"emailId":"sumit.roy@gmail.com","gender":"MALE","buildingName":"Galaxy Heights","locality":"Garia","street":"12B","pincode":700084,"currentLocation":"Kolkata","nearbyLocation":"Narendrapur","enrolledDate":"2024-10-10T05:58:17.602+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"5487932145","active":true,"kyc":"DL"},{"serviceproviderId":12,"firstName":"Meera","middleName":null,"lastName":"Sharma","mobileNo":8745963210,"alternateNo":7410258963,"emailId":"meera.sharma@gmail.com","gender":"FEMALE","buildingName":"Sunrise Apartments","locality":"Borivali","street":"4C","pincode":400092,"currentLocation":"Mumbai","nearbyLocation":"Kandivali","enrolledDate":"2024-10-10T05:58:44.191+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"7854129630","active":true,"kyc":"AADHAR"},{"serviceproviderId":13,"firstName":"Pooja","middleName":null,"lastName":"Gupta","mobileNo":9632145789,"alternateNo":8529631475,"emailId":"pooja.gupta@gmail.com","gender":"FEMALE","buildingName":"Elite Residency","locality":"Banjara Hills","street":"3A","pincode":500034,"currentLocation":"Hyderabad","nearbyLocation":"Jubilee Hills","enrolledDate":"2024-10-10T05:59:03.846+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"6321458796","active":true,"kyc":"PAN"},{"serviceproviderId":14,"firstName":"Rahul","middleName":null,"lastName":"Mukherjee","mobileNo":8529631475,"alternateNo":7412589632,"emailId":"rahul.mukherjee@yahoo.com","gender":"MALE","buildingName":"Palm Grove","locality":"Behala","street":"1D","pincode":700034,"currentLocation":"Kolkata","nearbyLocation":"Tollygunge","enrolledDate":"2024-10-10T05:59:22.696+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"7854126985","active":true,"kyc":"DL"},{"serviceproviderId":15,"firstName":"Ankita","middleName":null,"lastName":"Sinha","mobileNo":9876543120,"alternateNo":8529637410,"emailId":"ankita.sinha@gmail.com","gender":"FEMALE","buildingName":"Diamond City","locality":"Alipore","street":"15C","pincode":700027,"currentLocation":"Kolkata","nearbyLocation":"New Alipore","enrolledDate":"2024-10-10T05:59:50.834+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"8745963214","active":true,"kyc":"AADHAR"},{"serviceproviderId":16,"firstName":"Ram","middleName":null,"lastName":"Pal","mobileNo":7250967401,"alternateNo":7451258960,"emailId":"ram12@gmail.com","gender":"MALE","buildingName":"Annapurna","locality":"Diamond Harbour","street":"69C","pincode":700001,"currentLocation":"Haridas Road","nearbyLocation":" Milan Park","enrolledDate":"2024-10-10T06:35:13.009+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"ASW12365K","active":true,"kyc":"PAN"},{"serviceproviderId":17,"firstName":"Srinita","middleName":null,"lastName":"Roy","mobileNo":7252167401,"alternateNo":null,"emailId":"srinu12@gmail.com","gender":"FEMALE","buildingName":"Annapurna","locality":"Diamond Harbour","street":"69C","pincode":700001,"currentLocation":"Haridas Road","nearbyLocation":" Milan Park","enrolledDate":"2024-10-10T06:37:40.844+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"ASW12365K","active":true,"kyc":"PAN"},{"serviceproviderId":18,"firstName":"Rinita","middleName":null,"lastName":"Roy","mobileNo":7252167422,"alternateNo":null,"emailId":"rinu12@gmail.com","gender":"FEMALE","buildingName":"Annapurna","locality":"Diamond Bridge","street":"Bagmore","pincode":700012,"currentLocation":"Milan Sangha","nearbyLocation":"Collage Square","enrolledDate":"2024-10-10T06:40:31.332+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"ASW1265K","active":true,"kyc":"DL"},{"serviceproviderId":19,"firstName":"Diya","middleName":null,"lastName":"Das","mobileNo":9252167422,"alternateNo":null,"emailId":"diya62@gmail.com","gender":"FEMALE","buildingName":"Anupa","locality":"Girish Park","street":"Ring Road","pincode":700212,"currentLocation":"Kashi Bose Lane","nearbyLocation":"City College","enrolledDate":"2024-10-10T06:43:54.816+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"BINGO1234","active":true,"kyc":"DL"},{"serviceproviderId":20,"firstName":"Riya","middleName":null,"lastName":"Das","mobileNo":9252167422,"alternateNo":null,"emailId":"riya62@gmail.com","gender":"FEMALE","buildingName":"Rupa","locality":"Belgachia","street":"GT Road","pincode":700212,"currentLocation":"Central","nearbyLocation":"Tong","enrolledDate":"2024-10-10T07:43:02.858+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"BINGO1234","active":true,"kyc":"AADHAR"},{"serviceproviderId":21,"firstName":"Siya","middleName":null,"lastName":"Sharma","mobileNo":9252167002,"alternateNo":null,"emailId":"siya69@gmail.com","gender":"FEMALE","buildingName":"Rupa","locality":"Tullygange","street":"GT Road","pincode":700212,"currentLocation":"Central","nearbyLocation":"Park","enrolledDate":"2024-10-10T07:45:01.738+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"123445677621","active":true,"kyc":"AADHAR"},{"serviceproviderId":22,"firstName":"Manish","middleName":null,"lastName":"Sharma","mobileNo":9252067002,"alternateNo":null,"emailId":"manish69@gmail.com","gender":"MALE","buildingName":"Quarter","locality":"BAllygange","street":"GT Road","pincode":700001,"currentLocation":"Central","nearbyLocation":"Park","enrolledDate":"2024-10-10T07:46:37.515+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"123445677622","active":true,"kyc":"AADHAR"},{"serviceproviderId":23,"firstName":"Harsh","middleName":null,"lastName":"Sharma","mobileNo":6252067002,"alternateNo":null,"emailId":"harsh69@gmail.com","gender":"MALE","buildingName":"Quarter","locality":"Kumarrtuli","street":"Sahid Road","pincode":700001,"currentLocation":"Kumartuli Ghat","nearbyLocation":"Kumartuli Potter's Lane","enrolledDate":"2024-10-10T07:48:58.024+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"HVVC12274","active":true,"kyc":"DL"},{"serviceproviderId":24,"firstName":"Nitesh","middleName":null,"lastName":"Kar","mobileNo":6252067002,"alternateNo":null,"emailId":"nitesh69@gmail.com","gender":"MALE","buildingName":"Quarter","locality":"Kumarrtuli","street":"Sahid Road","pincode":700001,"currentLocation":"Kumartuli Ghat","nearbyLocation":"Kumartuli Potter's Lane","enrolledDate":"2024-10-10T07:50:01.956+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"MCBC1234","active":true,"kyc":"DL"},{"serviceproviderId":25,"firstName":"Sachi","middleName":null,"lastName":"Kar","mobileNo":9052067002,"alternateNo":null,"emailId":"sachi2001@gmail.com","gender":"OTHER","buildingName":"Quarter","locality":"Kumarrtuli","street":"Sahid Road","pincode":700001,"currentLocation":"Kumartuli Ghat","nearbyLocation":"Kumartuli Potter's Lane","enrolledDate":"2024-10-10T07:55:52.918+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"MCBC1234","active":true,"kyc":"PAN"},{"serviceproviderId":26,"firstName":"Rohan","middleName":null,"lastName":"Sarkar","mobileNo":9052089002,"alternateNo":null,"emailId":"rohan2001@gmail.com","gender":"OTHER","buildingName":"Quarter","locality":"Kumarrtuli","street":"Sahid Road","pincode":700001,"currentLocation":"Kumartuli Ghat","nearbyLocation":"Kumartuli Potter Lane","enrolledDate":"2024-10-10T07:59:37.883+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"1234 5678 9852 6969","active":true,"kyc":"AADHAR"},{"serviceproviderId":28,"firstName":"Kanta","middleName":null,"lastName":"Bai","mobileNo":9052089023,"alternateNo":null,"emailId":"kantabai2001@gmail.com","gender":"FEMALE","buildingName":"Suruchi","locality":"Bagbazar","street":"kobi shubhash Road","pincode":700001,"currentLocation":"Bagbazar Ghat","nearbyLocation":"kobi shubhash songha","enrolledDate":"2024-10-10T08:03:43.550+00:00","profilePic":null,"housekeepingRole":"MAID","idNo":"1234 5678 9852 1269","active":true,"kyc":"AADHAR"},{"serviceproviderId":29,"firstName":"Santa","middleName":null,"lastName":"Bai","mobileNo":9052089023,"alternateNo":null,"emailId":"santabai2001@gmail.com","gender":"FEMALE","buildingName":"Suruchi","locality":"Bagbazar","street":"kobi shubhash Road","pincode":700001,"currentLocation":"Bagbazar Ghat","nearbyLocation":"kobi shubhash songha","enrolledDate":"2024-10-10T08:04:17.388+00:00","profilePic":null,"housekeepingRole":"COOK","idNo":"1234 5678 9692 1269","active":true,"kyc":"AADHAR"},{"serviceproviderId":30,"firstName":"Asha","middleName":null,"lastName":"Biswas","mobileNo":6252089023,"alternateNo":null,"emailId":"beasha2001@gmail.com","gender":"FEMALE","buildingName":"Suruchi","locality":"Bagbazar","street":"kobi shubhash Road","pincode":700001,"currentLocation":"Bagbazar Ghat","nearbyLocation":"kobi shubhash songha","enrolledDate":"2024-10-10T08:05:58.502+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"4314 5678 9692 1269","active":true,"kyc":"AADHAR"},{"serviceproviderId":34,"firstName":"Raj","middleName":null,"lastName":"Roy","mobileNo":9876543121,"alternateNo":null,"emailId":"raj.roy@gmail.com","gender":"MALE","buildingName":"Diamond City","locality":"Alipore","street":"15C","pincode":700027,"currentLocation":"Kolkata","nearbyLocation":null,"enrolledDate":"2024-10-10T09:45:20.941+00:00","profilePic":null,"housekeepingRole":"NANNY","idNo":"8745963214","active":true,"kyc":"AADHAR"}]
;

  return (
    <div>
      {services.map((service, index) => (
        <ServiceProvidersDetails key={index} {...service} />
      ))}
    </div>
  );
}

export default App;
