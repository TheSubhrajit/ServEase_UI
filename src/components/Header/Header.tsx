import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



export const Header = () => {
  
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="header">
          <Navbar.Brand href="#home" className="h1">
           <h1>ServEase</h1>
           <h4>innovative</h4>
          </Navbar.Brand>
          </Container>
          
          <DropdownButton id="dropdown-basic-button"
           title="Location" className="header">
          <Dropdown.Item  href="#/action-1"></Dropdown.Item>
           </DropdownButton>

          <DropdownButton id="dropdown-basic-button"
           title="My Account" className="header">
      <Dropdown.Item  href="#/action-1">Login / Register</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Privacy Policy</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Notification</Dropdown.Item>
      <Dropdown.Item href="#/action-4">Sign Out</Dropdown.Item>
    </DropdownButton>
    
    </Navbar>
      
    </>
  );
};
