import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  return (
    <>
      <Navbar bg="white" data-bs-theme="white">
        <Container>
          <Navbar.Brand href="#home" className="h1">
           <h1>ServEase</h1>
           <h4>innovative</h4>
          </Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Cooks</Nav.Link>
            <Nav.Link href="#features">Maids</Nav.Link>
            <Nav.Link href="#pricing">Nanny</Nav.Link>
          </Nav> */}


        </Container>
      </Navbar>
    </>
  );
};
