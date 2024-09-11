import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
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
