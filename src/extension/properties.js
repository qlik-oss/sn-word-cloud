export default {
  /**
   * Current version of this generic object definition
   * @type {string}
   */
  version: process.env.PACKAGE_VERSION,
  /**
   * @typedef
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
  ScaleColor: [
    "#FEE391",
    "#FEC44F",
    "#FE9929",
    "#EC7014",
    "#CC4C02",
    "#993404",
    "#662506",
  ],
  Orientations: 2,
  MinSize: 20,
  MaxSize: 100,
  RadStart: -90,
  RadEnd: 90,
  Scale: "linear",
  customRange: false,
  customRangeFrom: {
    index: -1,
    color: "#4477aa",
  },
  customRangeTo: {
    index: -1,
    color: "#ffcf02",
  },
};
