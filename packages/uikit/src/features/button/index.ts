import styled from "@emotion/styled";
import { p } from "@elysium/utils";
import { cover } from "polished";

type P<T extends (props: Record<string, unknown>) => string> = Parameters<T>[0];

const isHovered = p("isHovered");

export const Button = styled.button<P<typeof isHovered>>`
  background: none;
  transition: all 100ms ease-in-out;
  background-color: #8272;
  backdrop-filter: blur(2px);
  color: #422c;
  :before {
    content: "";
    ${cover()}
    border-radius: 0.65ch;
    box-shadow: #0004 2px 2px 7px -1px;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
  }
  ${isHovered}, &:hover {
    background-color: pink;
    :before {
      opacity: 1;
    }
  }
`;
