import React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { WithChildren } from "src/types";

const reset = css`
  body {
    margin: 0;
  }
  :root {
    font-family: Helvetica, Arial, sans-serif;
    hyphens: auto;
  }
`;

const Container = styled.div`
  margin: 3ch 4ch;
`;

const Shell: React.FC<WithChildren> = ({ children }) => (
  <Container>
    {children}
    <Global styles={reset} />
  </Container>
);

export default Shell;
