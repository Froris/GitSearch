import { Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { formatDate } from "../../../common/utils";
import React from "react";
import { User } from "../../api/types";

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    avatar_url,
    login,
    email,
    location,
    created_at,
    followers,
    following,
    bio,
  } = user;

  return (
    <Row className="gy-3 g-3 mb-2 mb-sm-4">
      <Col xs={12} sm={6} md={6}>
        <div className="userProfile__img mx-auto mt-3">
          <img
            src={avatar_url}
            alt="profile picture"
            className="img-fluid rounded-start"
          />
        </div>
      </Col>
      <Col xs={12} sm={6} md={6}>
        <ListGroup variant="flush" className="userProfile__info-list">
          <ListGroup.Item>UserName: {login}</ListGroup.Item>
          <ListGroup.Item>Email: {email}</ListGroup.Item>
          <ListGroup.Item>Location: {location}</ListGroup.Item>
          <ListGroup.Item>Join Date: {formatDate(created_at)}</ListGroup.Item>
          <ListGroup.Item>Followers: {followers}</ListGroup.Item>
          <ListGroup.Item>Following: {following}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col xs={12}>
        <Container fluid className="userProfile__bio">
          <span className="d-inline-block px-1 py-2">
            {bio || "This user has no bio."}
          </span>
        </Container>
      </Col>
    </Row>
  );
};

export default UserInfo;
