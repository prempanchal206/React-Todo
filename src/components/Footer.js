import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  const linkedinUrl = "https://www.linkedin.com/in/prempanchal206/";
  const gitHubUrl = "https://github.com/prempanchal206";

  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container>
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              &copy; {currentYear} Your Company. All rights reserved.
            </p>

            <div className="d-flex align-items-center">
              <span className="mx-3">
                <a href={linkedinUrl} target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </span>
              <span className="mx-3">
                <a href={gitHubUrl} target="_self" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
