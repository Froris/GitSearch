import React from "react";
import Header from "../Header";
import UsersList from "../UsersList";
import UserProfile from "../UserProfile";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container fluid="xl" className="mb-4">
        <Row className="gy-3">
          <Col className="col-12 col-md-6">
            <UsersList />
          </Col>
          <Col className="col-12 col-md-6">
            <UserProfile />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
