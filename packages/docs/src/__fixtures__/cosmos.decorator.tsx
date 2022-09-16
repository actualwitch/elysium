import React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { WithChildren } from "src/types";

const interactable = css`
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;
const focusable = css`
  transition: all 100ms ease-in-out;
  :focus-visible {
    box-shadow: 2px 2px 7px -1px #0001;
    transform: translate(0, -1px);
    outline: 0;
  }
`;

const reset = css`
  body {
    margin: 0;
  }
  :root {
    font-family: Helvetica, Arial, sans-serif;
    hyphens: auto;
  }
  p {
    max-width: 80ch;
  }
  button {
    border: 0;
    border-radius: 0.65ch;
    padding: 0.6ch 1.2ch;
    ${interactable}
    ${focusable}
  }
`;

const styles = css`
  ${reset}
  body {
    min-height: 200vh;
    background: repeating-conic-gradient(#bdbaba 0% 25%, #b3b3b3 0% 50%) 50%/8px 8px;
  }
`;
 
const Container = styled.div`
  margin: 3ch 4ch;
`;

const Shell: React.FC<WithChildren> = ({ children }) => (
  <Container>
    {children}
    <Global styles={styles} />
  </Container>
);

export default Shell;
