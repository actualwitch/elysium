import type { WithChildren } from "@elysium/utils";
import styled from "@emotion/styled";
import React, { createContext, useContext } from "react";

const IconContext = createContext("");

export const IconProvider: React.FC<WithChildren & { url: string }> = ({ children, url }) => {
  return <IconContext.Provider value={url}>{children}</IconContext.Provider>;
};
const Svg = styled.svg`
`;

export const Icon: React.FC<{ type: string; size?: number; stroke?: number }> = ({ type, size = 24, stroke = 2 }) => {
  const url = useContext(IconContext);
  return (
    <Svg width={size} height={size} strokeWidth={stroke}>
      <use xlinkHref={`${url}#tabler-${type}`} />
    </Svg>
  );
};
