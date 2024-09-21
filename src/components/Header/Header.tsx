import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Header.css";


export const Header = () => {
  
  return (
    <>
    {/*bg="dark" data-bs-theme="dark" my-0 w-5  className="text-white py-0 px-0 space-x-0"  */}
      <Navbar className="header">
        <Container className="head">
          <Navbar.Brand href="#home">
           <h2>Home-ServEase</h2>
           {/* <h6>Care</h6> */}
          </Navbar.Brand>
          </Container>
        <div className="head2">
          <div className="head3">
          <DropdownButton id="dropdown-button-dark"
          title="Location"
          variant="dark"  >
          <Dropdown.Item> Choose Your Location</Dropdown.Item>
           </DropdownButton>
           </div>
        <div className="head4">
          <DropdownButton id="dropdown-button-dark"
          title="My Account"
          variant="dark">
      <Dropdown.Item  href="#/action-1">Login / Register</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Privacy Policy</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Notification</Dropdown.Item>
      <Dropdown.Item href="#/action-4">Sign Out</Dropdown.Item>
      </DropdownButton>
      </div>
    </div>
    </Navbar>
      
    </>
  );
};
