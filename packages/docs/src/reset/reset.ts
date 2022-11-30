import { noAnimations } from "@elysium/uikit";
import { css } from "@emotion/react";
import { hsl } from "d3-color";

const fontSerif = "'Georgia', serif";
const fontMono = "'PT Mono', serif";
const fontSansSerif = "'Proxima Nova', 'Helvetica Neue', 'Segoe UI', sans-serif";

const interactable = css`
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;
const focusable = css`
  transition: all 100ms ease-in-out;
  :focus-visible {
    box-shadow: 2px 2px 7px -1px #0001;
    transform: translate(0, -1px);
    outline: 0;
  }
`;
const accent = "#ff22cb";
const accentPale = hsl(accent);
accentPale.s = 0.75;
accentPale.l = 0.6;
const slightBlur = "blur(7px)";
const spotlight = css`
  background: radial-gradient(at 51% 52%, #d5d5d5ab 16%, #bbbbbbcf 49%, transparent 69%);
  color: #3e3e3ed6;
`;
const radius = "0.65ch";
const glitchTextShadow = `-0.1ch 0px 0.1ch rgba(255, 0, 0, 0.3), 0.1ch 0px 0.1ch rgba(0, 255, 0, 0.28)`;

export const lengthScale = new Array(5).fill("").map((_, index) => `${8 + index * 2}ch`);

const tables = css`
  table {
    border-collapse: collapse;
    white-space: nowrap;
    caption {
      text-align: start;
      font-weight: 600;
      padding-inline-start: 0.6ch;
    }
  }
  th,
  td {
    padding: 0.6ch 1.2ch;
    font-weight: 400;
    text-align: start;
    :first-of-type {
      text-align: end;
    }
  }
  thead,
  tfoot {
    th {
      font-weight: 500;
    }
  }
  thead th {
    border-bottom: 0.25ch solid currentColor;
  }
  tfoot th {
    border-top: 0.25ch solid currentColor;
  }
`;

export const reset = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  :root {
    font-family: ${fontSansSerif};
    font-weight: 500;
    hyphens: auto;
    color: #282828;
    accent-color: ${accentPale.toString()};
  }
  ::selection {
    background-color: ${accentPale.toString()};
  }
  a::selection {
    color: #7c0074;
  }
  a,
  :visited {
    color: ${accentPale.toString()};
    text-decoration-thickness: 0.15ch;
    text-decoration-style: solid;
    border-top-right-radius: 0.3ch;
    border-top-left-radius: 0.3ch;
    :hover {
      background-color: #7c007420;
    }
  }
  :visited {
    text-decoration-style: wavy;
  }
  p:first-of-type {
    margin-block-start: 0.65ch;
  }
  p,
  fieldset {
    max-width: 70ch;
  }
  p,
  dl,
  multicol {
    margin-block: 1.3ch;
  }
  button {
    border: 0;
    border-radius: ${radius};
    padding: 0.6ch 1.2ch;
    :active {
      transform: scale(0.99);
    }
    ${interactable}
    ${focusable}
  }
  mark {
    background: ${accent}69;
    padding: 0 0.3ch 0;
    border-radius: 0.4ch;
    color: inherit;
  }
  mark::selection {
    padding: 0;
    border-radius: 0;
  }
  kbd,
  code,
  samp,
  pre,
  textarea {
    font-family: ${fontMono};
    font-size: 0.9rem;
  }
  textarea resizer {
    border-bottom-right-radius: 0.65ch;
    padding-right: 1ch;
    background-size: 115% 115%;
    border-right: 0.6ch solid transparent;
    height: 1ch;
    width: 1ch;
  }
  form fieldset + fieldset {
    margin-top: 1ch;
  }
  fieldset {
    position: relative;
    border-radius: 1.3ch;
    backdrop-filter: ${slightBlur};
    box-shadow: 1px 1px 5px 0px #0000001c, inset -1px -1px 0px 0px #a4a4a41c;
    border: 0.15ch solid #f0f8ff33;
    border-top-color: #ffffff69;
    margin-inline: 0;
    padding-inline: 2.2ch;
    padding-block-start: 0ch;
    padding-block-end: 0.6ch;
    &:has(legend) {
      padding-block-start: 3ch;
    }
    label {
      margin-left: 0.3ch;
    }
  }
  legend {
    position: absolute;
    left: 0;
    top: -1px;
    font-size: 14px;
    letter-spacing: 0.2px;
    padding: 1ch 2ch 0 2ch;
    border-top: 0.15ch solid #fff;
    border-top-left-radius: 1.3ch;
    color: #fff;
    opacity: 0.6;
    text-shadow: ${glitchTextShadow};
    svg {
      path {
        box-shadow: ${glitchTextShadow};
      }
      margin-left: -8px;
      margin-right: 4px;
    }
  }
  label {
    display: block;
    width: fit-content;
    font-size: small;
    color: #5c5c5c;
    text-shadow: 0ch 0.08ch 0.1ch rgba(255, 255, 255, 0.5), 0 -0.08ch 0.1ch rgba(47, 47, 47, 0.25);
    + input,
    + textarea {
      margin-top: 0.5ch;
    }
  }
  input${["checkbox", "radio", "range", "file"].reduce((acc, item) => `${acc}:not([type="${item}"])`, "")}, textarea {
    border-radius: ${radius};
    border: 0.2ch solid transparent;
    padding: 0.8ch 0.9ch 0.5ch;
    transition: all 100ms ease-in-out;
    background: #ffffff4f;
    color: #3e3e3ed6;
    :hover {
      background: #ffffff88;
    }
    :focus {
      border-bottom: 0.2ch solid white;
      background: #ffffffa8;
      outline: 0;
    }
    :focus:hover {
      border-top-color: #ffffff44;
      border-left-color: #ffffff81;
      border-right-color: #ffffff81;
    }
    ::placeholder {
      color: #404040f0;
      font-family: ${fontSansSerif};
    }
  }
  textarea::placeholder {
    font-family: ${fontMono};
  }
  input[type="range"] {
    --range-height: 1.3ch;
    height: var(--range-height);
    -webkit-appearance: none;
    margin: 0;
    background: none;
    :focus {
      outline: none;
    }
    ::-webkit-slider-thumb {
      border: none;
      height: var(--range-height);
      width: 2ch;
      border-radius: 100%;
      background: transparent;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -11px;
    }
    ::-moz-range-track {
      height: 100%;
      cursor: pointer;
      background: #ffffff4f;
      border-radius: 10ch;
      transition: background 100ms ease-in-out;
      border: none;
    }
    ::-moz-range-thumb {
      border: none;
      height: 100%;
      width: 0.25ch;
      border-radius: 100%;
      background: transparent;
      cursor: pointer;
    }
    ::-moz-range-progress {
      background: white;
      height: 100%;
      border-radius: ${radius};
      cursor: pointer;
    }
  }
  input[type="range" i]::-webkit-slider-runnable-track {
    height: 2ch;
    cursor: pointer;
    background: linear-gradient(to right, white 0%, white var(--value, 100%), #ffffff4f var(--value, 100%));
    border-radius: 10ch;
    border: none;
  }
  hr {
    border: none;
    border-bottom: 0.25ch solid currentColor;
    color: unset;
  }
  ${tables}
  @media (prefers-reduced-motion: reduce) {
    ${noAnimations}
  }
`;
