import { css } from "@emotion/react";

export const noAnimations = css`
  *,
  :before,
  :after {
    transition: none !important;
    animation-delay: 0ms !important;
    animation-duration: 0ms !important;
  }
`;