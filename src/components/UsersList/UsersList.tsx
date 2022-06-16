import React, { useId, useState } from "react";
import { useGetUserQuery } from "../../services";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UserSearch } from "../../services/types";
import Button from "react-bootstrap/Button";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const inputId: string = useId();

  const { data, error, isLoading } = useGetUserQuery(searchValue, {
    skip: !searchValue,
  });

  const onItemClick = (e: React.MouseEvent, value: string) => {
    dispatch(setUser(value));
  };

  return (
    <section className="mt-4 mt-md-5">
      <h2 className="mb-4 mb-md-5">Users List</h2>
      <Form>
        <Form.Label htmlFor={inputId}>Find user</Form.Label>
        <Form.Control
          type="text"
          id={inputId}
          aria-describedby="inputHelpBlock"
          placeholder="Start typing..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <Form.Text id="inputHelpBlock" muted>
          You can type a specific username to find it in the list below
        </Form.Text>
      </Form>
      {isLoading ? (
        <span className="d-inline-block my-3 my-sm-4 fs-4 fst-italic">
          Loading ...
        </span>
      ) : error ? (
        <span className="d-inline-block my-3 my-sm-4 fs-4">
          API rate limit exceeded... Please reload the page and try again.
        </span>
      ) : (
        data &&
        searchValue && (
          <ListGroup className="mt-3 mt-sm-4 d-block usersList__list">
            {data.items.map(
              ({ login, id, avatar_url, html_url }: UserSearch) => (
                <ListGroup.Item
                  action
                  onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                    onItemClick(e, login)
                  }
                  key={id}
                >
                  <Row className="align-items-center">
                    <Col xs={3} sm={2} md={3} lg={2}>
                      <img
                        className="img-fluid list__item-picture"
                        src={avatar_url}
                        alt="avatar"
                      />
                    </Col>
                    <Col xs={4} sm={7} md={6} lg={7}>
                      {login}
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={3}>
                      <Button
                        as="a"
                        size="sm"
                        href={`${html_url}?tab=repositories`}
                        onClick={(
                          e: React.MouseEvent<HTMLElement, MouseEvent>
                        ) => e.stopPropagation()}
                      >
                        see repositories
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        )
      )}
    </section>
  );
};

export default UsersList;
