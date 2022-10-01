import { Button, createModalContext, Popover, Tooltip } from "@elysium/uikit";
import { ForceDropdownDirection, useDropdownDirection, useItemTransition } from "@elysium/utils";
import { useCallback, useRef, useState } from "react";

export default () => {
  const [overrideIsOpen, setOverrideIsOpen] = useState(false);
  return (
    <div>
      <ForceDropdownDirection horizontal="center" vertical="center">
        <Tooltip content={<div>Want some... tooltip?</div>} overrideIsOpen={overrideIsOpen}>
          <Button onClick={() => setOverrideIsOpen(current => !current)}>Psst</Button>
        </Tooltip>
      </ForceDropdownDirection>
    </div>
  );
};
