const path = require("path");

const pkg = require(path.resolve(__dirname, "../package.json")); // eslint-disable-line

module.exports = {
  fromJsdoc: {
    glob: ["./src/extension/properties.js"],
    api: {
      stability: "experimental",
      visibility: "public",
      properties: {
        "x-qlik-visibility": "public",
      },
      name: `${pkg.name}:properties`,
      version: pkg.version,
      description: "Word cloud generic object definition",
    },
    output: {
      sort: {
        alpha: false,
      },
      file: "./api-specifications/properties.json",
    },
    parse: {
      types: {
        undefined: {},
        "EngineAPI.ValueExpression": {
          url: "https://qlik.dev/apis/json-rpc/qix/schemas#%23%2Fdefinitions%2Fschemas%2Fentries%2FValueExpression",
        },
        "EngineAPI.HyperCubeDef": {
          url: "https://qlik.dev/apis/json-rpc/qix/schemas#%23%2Fdefinitions%2Fschemas%2Fentries%2FListObjectDef",
        },
      },
    },
  },
  toDts: {
    spec: "./api-specifications/properties.json",
    output: {
      file: "./types/index.d.ts",
    },
    dependencies: {
      references: ["qlik-engineapi"],
    },
  },
};
