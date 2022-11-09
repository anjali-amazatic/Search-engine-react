import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  color: black;
  position: absolute;
  right: 4px;
  top: -8px;
`;

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="button"
        primary
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
    </div>
  );
}

export default BackButton;
