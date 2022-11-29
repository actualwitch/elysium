import { useEventEffect, WithChildren } from "@elysium/utils";
import { css } from "@emotion/css";
import * as React from "react";
import { createContext, RefObject, useCallback, useContext, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

interface Context {
  ref: RefObject<HTMLDivElement>;
}

const ModalContext = createContext<null | Context>(null);

export const createModalContext = () => {
  const ModalProvider: React.FC<WithChildren> = ({ children }) => {
    const ref = useRef(null);
    return (
      <ModalContext.Provider value={{ ref }}>
        {children}
        <div ref={ref} />
      </ModalContext.Provider>
    );
  };
  return { ModalProvider };
};

const modalCss = css`
  user-select: none;
  pointer-events: none;
  z-index: 101;
  & > * {
    pointer-events: all;
    user-select: all;
  }
`;

const useModalNode = (resetPosition = false) => {
  const node = useMemo(() => {
    const node = document.createElement("div");
    node.classList.add(modalCss);
    if (resetPosition) {
      node.style.position = "fixed";
      node.style.top = "0px";
      node.style.left = "0px";
    }
    return node;
  }, []);
  const { ref } = useContext(ModalContext) || {};
  useLayoutEffect(() => {
    const element = ref?.current;
    if (element) {
      element.appendChild(node);
      return () => void element.removeChild(node);
    }
  }, [ref?.current, node]);
  return node;
};

interface PopoverProps extends WithChildren {
  containerRef: React.RefObject<HTMLElement>;
}

export const Portal: React.FC<WithChildren> = ({ children }) => {
  const node = useModalNode();
  return createPortal(children, node);
};

export const Popover: React.FC<PopoverProps> = ({ children, containerRef }) => {
  const node = useModalNode(true);

  const updateRect = useCallback(() => {
    if (containerRef.current) {
      const { width, height, x, y } = containerRef.current.getBoundingClientRect();
      node.style.transform = `translate(${x}px, ${y}px)`;
      node.style.height = `${height}px`;
      node.style.width = `${width}px`;
      // node.style.userSelect
    }
  }, [node]);

  useEventEffect("scroll", updateRect);
  return createPortal(children, node);
};
