export { };
// import * as React from "react";
// import { createContext, FC, RefObject, useContext, useLayoutEffect, useMemo, useRef } from "react";
// import { createPortal } from "react-dom";

// interface Context { 
//     ref: RefObject<HTMLDivElement>;

// }

// const ModalContext = createContext<null | Context>(null);

// interface Props {
//   children: React.ReactNode;
// }

// export const createModalContext = () => {
//   const ModalProvider: React.FC<Props> = ({ children }) => {
//     const ref = useRef(null);
//     return (
//       <ModalContext.Provider value={ref}>
//         {children}
//         <div ref={ref} />
//       </ModalContext.Provider>
//     );
//   };
//   return { ModalProvider };
// };

// const useModalNode = () => {
//   const node = useMemo(() => {
//     return document.createElement("div");
//   }, []);
//   const ref = useContext(ModalContext);
//   useLayoutEffect(() => {
//     const element = ref?.current;
//     if (element) {
//       element.appendChild(node);
//       return () => void element.removeChild(node);
//     }
//   }, [ref?.current, node]);
//   return node;
// };

// interface PopoverProps {
//   children: React.ReactNode;
//   containerRef: React.RefObject<HTMLElement>;
// }

// export const Portal: React.FC<Props> = ({ children }) => {
//     const node = useModalNode();
//   return createPortal(children, node);
// };

// export const Popover: FC<PopoverProps> = ({ children, containerRef }) => { 
//     const node = useModalNode();

//     useLayoutEffect(() => {
//       if (containerRef.current) {
//         const { observe, unobserve } = observeRect(props.containerRef.current, ({ x, y, width, height }) => {
//           setRect({ x, y, width, height });
//         });
//         observe();
//         return () => {
//           unobserve();
//         };
//       }
//     }, []);
//   return createPortal(children, node);
// }