import { Button } from "@elysium/uikit";
import { TransitionState, useItemTransition } from "@elysium/utils";
import styled from "@emotion/styled";
import { useState } from "react";

const Paragraph = styled.p<{ transitionState: TransitionState }>`
  opacity: 0;
  transform: scale(0.85);
  transition: 100ms ease-in;
  width: fit-content;
  ${(p) =>
    p.transitionState?.startsWith("enter")
      ? `transform: scale(1);
    opacity: 1;`
      : p.transitionState === "exiting" && `transform: scale(1.15)`}
`;

export default () => {
  const [isActive, setIsActive] = useState(false);
  const { isActive: shouldRender, transitionState, nextState } = useItemTransition(isActive);
  return (
    <div>
      <Button onClick={() => setIsActive((isActive) => !isActive)}>
        Activate
      </Button>
      {shouldRender && (
        <Paragraph transitionState={transitionState} onTransitionEnd={nextState}>
          Text
        </Paragraph>
      )}
    </div>
  );
};
