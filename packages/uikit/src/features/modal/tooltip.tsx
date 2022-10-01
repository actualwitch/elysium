import { TransitionState, useDropdownDirection, useItemTransition, WithChildren } from "@elysium/utils";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Popover } from "./context";

const TooltipContents = styled.div<{
  vertical?: "top" | "center" | "bottom";
  horizontal?: "left" | "center" | "right";
  transitionState: TransitionState;
}>`
  position: absolute;
  padding: 8px 10px;
  line-height: 20px;
  pointer-events: none;
  user-select: none;

  opacity: 0;
  border-radius: 8px;
  white-space: normal;
  max-width: 280px;
  z-index: 10;
  white-space: break-spaces;
  overflow-wrap: break-word;
  hyphens: none;
  display: block;
  width: max-content;
  transition: 100ms ease-in-out;
  ${({ vertical, horizontal }) => {
    let vCss = css``;
    let hCss = css`
      left: 50%;
      transform: translateX(-50%);
    `;
    if (vertical === "top") {
      vCss = css`
        bottom: 100%;
      `;
    }
    if (vertical === "bottom") {
      vCss = css`
        top: 100%;
      `;
    }
    if (horizontal === "left") {
      hCss = css`
        right: 100%;
      `;
    }
    if (horizontal === "right") {
      hCss = css`
        left: 100%;
      `;
    }

    return css`
      ${vCss}
      ${hCss}
    `;
  }}
  ${({ transitionState }) => {
    switch (transitionState) {
      case "entering":
      case "entered": {
        return css`
          opacity: 1;
        `;
      }
    }
  }}
`;
export const TooltipContainer = styled.div`
  position: relative;
  pointer-events: all;
  display: inline-flex;
`;

export const Tooltip: React.FC<WithChildren & { content: ReactNode; overrideIsOpen?: boolean }> = ({
  children,
  content,
  overrideIsOpen,
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onMouseEnter = useCallback(() => {
    if (content) setIsOpen(true);
  }, [content, setIsOpen]);
  const onMouseLeave = useCallback(() => {
    if (content) setIsOpen(false);
  }, [content, setIsOpen]);
  useEffect(() => {
    if (!content) {
      setIsOpen(false);
    }
  }, [content]);
  const { horizontal, vertical } = useDropdownDirection(ref);
  const { shouldRender, transitionState } = useItemTransition(
    typeof overrideIsOpen === "boolean" ? overrideIsOpen : isOpen,
  );
  return (
    <>
      <TooltipContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={ref}>
        {children}
      </TooltipContainer>
      {shouldRender && (
        <Popover containerRef={ref}>
          <TooltipContents horizontal={horizontal} vertical={vertical} transitionState={transitionState}>
            {content}
          </TooltipContents>
        </Popover>
      )}
    </>
  );
};
