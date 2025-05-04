import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";

function Header(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {props.isSearchBarVisible ? (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          ) : (
            false
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.defaultProps = {
  title: "My Todo App - default",
  isSearchBarVisible: false,
};

Header.propTypes = {
  title: PropTypes.string,
  isSearchBarVisible: PropTypes.bool.isRequired,
};

export default Header;