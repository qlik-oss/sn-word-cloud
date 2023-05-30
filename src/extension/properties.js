export default {
  /**
   * Current version of this generic object definition
   * @type {string}
   */
  version: process.env.PACKAGE_VERSION,
  /**
   * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
   * @extends {EngineAPI.HyperCubeDef}
   */
  qHyperCubeDef: {
    qDimensions: [],
    qMeasures: [],
    qInitialDataFetch: [
      {
        qWidth: 2,
        qHeight: 100,
      },
    ],
  },
  /**
   * Color scale to use
   * @type {Array<string>}
   */
  ScaleColor: [
    "#FEE391",
    "#FEC44F",
    "#FE9929",
    "#EC7014",
    "#CC4C02",
    "#993404",
    "#662506",
  ],
  /**
   * Number of orientations to use
   * @type {Number}
   */
  Orientations: 2,
  /**
   * Font size minimum
   * @type {Number}
   */
  MinSize: 20,
  /**
   * Font size maximun
   * @type {Number}
   */
  MaxSize: 100,
  /**
   * Rotation start in degrees
   * @type {Number}
   */
  RadStart: -90,
  /**
   * Rotation end in degrees
   * @type {Number}
   */
  RadEnd: 90,
  /**
   * Scale type, linear or logarithmic
   * @type {'linear'|'log'}
   */
  Scale: "linear",
  /**
   * Use of a custom range
   * @type {boolean=}
   */
  customRange: false,
  /**
   * Custom coloring from color
   * @type {customRangeConfig}
   */
  customRangeFrom: {
    index: -1,
    color: "#4477aa",
  },
  /**
   * Custom coloring to color
   * @type {customRangeConfig}
   */
  customRangeTo: {
    index: -1,
    color: "#ffcf02",
  },
};

/**
 * @typedef {object}
 */
const customRangeConfig = {
  /**
   * Index in palette
   * @type {Number}
   */
  index: -1,
  /**
   * Custom color not from palette
   * @type {string}
   */
  color: "ffcf02",
};
