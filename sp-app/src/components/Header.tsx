import { Navbar, Container, Nav } from "react-bootstrap";
import { RocketTakeoff } from "react-bootstrap-icons";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <RocketTakeoff /> School App
        </Navbar.Brand>
        <Nav>
        <Nav.Link href="/">Sign Up</Nav.Link>
          <Nav.Link href="search">Edit a Form</Nav.Link>
          <Nav.Link href="viewall">View Forms</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
