import type * as colors from "./colors";
export * from "./component";
export * from "./features";

type Colors = `--color-${keyof typeof colors}`;
type Keys = Colors | "--value";
type CSSProps = {
  // eslint-disable-next-line no-unused-vars
  [key in Keys]?: string | number;
};
declare module "csstype" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends CSSProps {}
}
