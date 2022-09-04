import * as React from "react";
import { createContext, FC, RefObject, useContext, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

interface Context {
  ref: RefObject<HTMLDivElement>;
}

const ModalContext = createContext<null | Context>(null);

interface Props {
  children: React.ReactNode;
}

export const createModalContext = () => {
  const ModalProvider: React.FC<Props> = ({ children }) => {
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

const useModalNode = (resetPosition = false) => {
  const node = useMemo(() => {
    const node = document.createElement("div");
    if (resetPosition) {
      node.style.position = "absolute";
      node.style.top = "0px";
      node.style.left = "0px";
      node.style.border = "1px solid red";
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

interface PopoverProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLElement>;
}

export const Portal: React.FC<Props> = ({ children }) => {
  const node = useModalNode();
  return createPortal(children, node);
};

export const Popover: FC<PopoverProps> = ({ children, containerRef }) => {
  const node = useModalNode(true);

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry) {
          const {
            boundingClientRect: { top, left, width, height },
          } = entry;
          node.style.transform = `translate(${left}px, ${top}px)`;
          node.style.height = `${height}px`;
          node.style.width = `${width}px`;
        }
      });
      observer.observe(containerRef.current);
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }
  }, [containerRef.current]);
  return createPortal(children, node);
};
