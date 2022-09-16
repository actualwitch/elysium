import * as React from "react";
import { Button } from "@elysium/uikit";
import styled from "@emotion/styled";

const Container = styled.article`
  * + * {
    margin-left: 1ch;
  }
`;

export default {
  Default: (
    <Container>
      <button>press me</button>
      <Button>press me</Button>
      <Button isHovered>press me</Button>
    </Container>
  ),
};
