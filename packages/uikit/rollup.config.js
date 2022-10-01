const ts = require("rollup-plugin-ts");
const pkg = require("./package.json");

const config = {
  input: "src/index.tsx",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
      browserslist: ["last 1 version", "> 1%"],
    }),
  ],
  external: [...Object.keys(pkg.dependencies)],
};

module.exports = config;
