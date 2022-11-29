import { Tooltip } from "@elysium/uikit";
import { ForceDropdownDirection } from "@elysium/utils";

export default () => {
  return (
    <div>
      <ForceDropdownDirection horizontal="center" vertical="center">
        <Tooltip content={<div>Want some... tooltip?</div>}>Psst</Tooltip>
      </ForceDropdownDirection>
    </div>
  );
};
