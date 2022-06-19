import styled from "@emotion/styled";
import { p } from "@elysium/utils";

const pHover = p("isHovered");

export const Button = styled.button<Parameters<typeof pHover>[0]>`
  background: none;
  border-radius: 10px;
  ${pHover}, &:hover {
    transform: translate(1px, 0);
    background-color: pink;
    border-color: red;
  }
`;
