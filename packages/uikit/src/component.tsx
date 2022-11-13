import * as React from "react";

// This works and is typed
// export const Component = () => {
//   return <div style={{ "--color-brand": "white" }}></div>;
// };

export const Selected: React.FC<{ children: string }> = ({ children }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const sel = window.getSelection();
    if (ref.current && sel && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);
  return <span ref={ref}>{children}</span>;
};
