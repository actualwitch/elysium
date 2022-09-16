import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAsyncDebounce } from "../hooks";

export type HorizontalDirection = "left" | "center" | "right";
export type VerticalDirection = "top" | "center" | "bottom";
export type DropdownDirection = {
  horizontal: HorizontalDirection;
  vertical: VerticalDirection;
};
const DEFAULT_DIRECTION: Readonly<DropdownDirection> = {
  horizontal: "center",
  vertical: "center",
};

const DropdownDirectionContext = createContext<Partial<DropdownDirection> | null>(null);

export function useDropdownDirection(ref: React.RefObject<HTMLElement>) {
  const forcedDirection = useContext(DropdownDirectionContext);
  const [direction, setDirection] = useState<DropdownDirection>(DEFAULT_DIRECTION);
  const updateRect = useCallback(() => {
    const docWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const docHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const { top, left, width } = ref.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0 };
    const horizontal = forcedDirection?.horizontal || left + width / 2 > docWidth / 2 ? "left" : "right";
    const vertical = forcedDirection?.vertical || top < docHeight / 2 ? "bottom" : "top";
    if (direction.horizontal !== horizontal || direction.vertical !== vertical) {
      setDirection({ horizontal, vertical });
    }
  }, [ref.current]);

  const debouncedUpdateDirection = useAsyncDebounce(updateRect, 50);

  useEffect(() => {
    document.addEventListener("scroll", debouncedUpdateDirection);
    document.addEventListener("resize", debouncedUpdateDirection);
    debouncedUpdateDirection();
    return () => {
      document.removeEventListener("scroll", debouncedUpdateDirection);
      document.removeEventListener("resize", debouncedUpdateDirection);
    };
  }, [debouncedUpdateDirection]);
  return direction;
}
