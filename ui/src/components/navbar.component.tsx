import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const AppNavbar = () => {
  return (
    <Navbar variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand>
          <img
            src="assets/cnc.png"
            className="d-inline-block align-top"
            width={48}
            height={48}
          ></img>{" "}
          CNC Controller
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
