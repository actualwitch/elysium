import * as React from "react";
import { Button, ButtonGroup } from "@elysium/uikit";
import styled from "@emotion/styled";
import { lengthScale } from "src/reset/reset";

const Container = styled.article`
  * + * {
    margin-left: 1ch;
  }
`;

export default {
  Default: (
    <Container>
      <button>Default</button>
      <Button>This</Button>
      <Button isHovered>Hover</Button>
    </Container>
  ),
  Widths: (
    <Container>
      {lengthScale.map((width) => (
        <Button key={width} width={width}>
          Do the thing
        </Button>
      ))}
    </Container>
  ),
  Group: (
    <ButtonGroup>
      <Button>One</Button>

      <Button>Two</Button>

      <Button>Three</Button>
    </ButtonGroup>
  ),
};
