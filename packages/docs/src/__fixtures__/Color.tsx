import styled from "@emotion/styled";
import { color } from "d3-color";

const swatch = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
];

const basicColors = {
  base: swatch.map((c) => color(c)),
  bright: swatch.map((c) => color(c)),
};

const Container = styled.article`
  display: flex;
  height: 4ch;
  margin-bottom: 1ch;
`;

const Item = styled.section<{ color: string }>`
  flex: 1 0 4ch;
  background: ${(p) => p.color};
`;

export default (
  <>
    <Container>
      {basicColors.base.map((color) => (
        <Item key={color.toString()} color={color.toString()} />
      ))}
    </Container>
    <Container>
      {basicColors.bright.map((color) => (
        <Item key={color.toString()} color={color.toString()} />
      ))}
    </Container>
  </>
);
