import React, { useId } from "react";
import Form from "react-bootstrap/Form";

type Props = {
  onInputChange: (value: string) => void;
};

const ReposSearch: React.FC<Props> = ({ onInputChange }) => {
  const inputId: string = useId();

  return (
    <Form>
      <Form.Label htmlFor={inputId}>Find user`s repos</Form.Label>
      <Form.Control
        type="text"
        id={inputId}
        aria-describedby="inputHelpBlock"
        placeholder="Start typing..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value)
        }
      />
      <Form.Text id="inputHelpBlock" muted>
        You can type a specific repository name to find it in the list below
      </Form.Text>
    </Form>
  );
};

export default ReposSearch;
