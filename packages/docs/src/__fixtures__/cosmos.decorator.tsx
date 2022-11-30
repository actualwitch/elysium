import React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { createModalContext, IconProvider, noAnimations } from "@elysium/uikit";
import { WithChildren } from "@elysium/utils";
import iconSprite from "../icon-sprite.svg";
import { reset } from "src/reset/reset";


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
const { ModalProvider } = createModalContext();

const Shell: React.FC<WithChildren> = ({ children }) => (
  <ModalProvider>
    <IconProvider url={iconSprite}>
      <Container>
        {children}
        <Global styles={styles} />
      </Container>
    </IconProvider>
  </ModalProvider>
);

export default Shell;
