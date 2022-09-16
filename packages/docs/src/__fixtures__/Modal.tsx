import { Button, createModalContext, Popover } from "@elysium/uikit";
import { useDropdownDirection } from "@elysium/utils";
import { useRef } from "react";

const { ModalProvider } = createModalContext();

export default () => {
  const ref = useRef(null);
  const { horizontal, vertical} = useDropdownDirection(ref);
  return (
    <ModalProvider>
      <Popover containerRef={ref}>
        <div>olololololololo</div>
      </Popover>
      <Button ref={ref}>Press me</Button>
    </ModalProvider>
  );
};
