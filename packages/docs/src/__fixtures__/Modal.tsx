import { Button, createModalContext, Popover } from "@elysium/uikit";
import { useRef } from "react";

const { ModalProvider } = createModalContext();

export default () => {
  const ref = useRef(null);
  return (
    <ModalProvider>
      <Popover containerRef={ref}>
        <div>olololololololo</div>
      </Popover>
      <Button ref={ref}>Press me</Button>
    </ModalProvider>
  );
};
