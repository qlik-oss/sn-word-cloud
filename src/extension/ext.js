/* eslint-disable max-len */
const COLOR_SCALES = Object.freeze({
  SEQUENTIAL: Object.freeze([
    "#FEE391",
    "#FEC44F",
    "#FE9929",
    "#EC7014",
    "#CC4C02",
    "#993404",
    "#662506",
  ]),
  QLIK_SENSE_DIVERGING: Object.freeze([
    "#3C52A1",
    "#3A82C4",
    "#69ACDE",
    "#9FD0F1",
    "#F4AA73",
    "#E67A56",
    "#CD473E",
    "#AE1C3E",
  ]),
  DIVERGING_RDYLBU: Object.freeze([
    "#D73027",
    "#F46D43",
    "#FDAE61",
    "#ABD9E9",
    "#74ADD1",
    "#4575B4",
  ]),
  DIVERGING_BUYLRD: Object.freeze(["#D73027", "#FDAE61", "#ABD9E9", "#4575B4"]),
  BLUES: Object.freeze([
    "#C6DBEF",
    "#9ECAE1",
    "#6BAED6",
    "#4292C6",
    "#2171B5",
    "#08519C",
    "#08306B",
  ]),
  REDS: Object.freeze([
    "#FCBBA1",
    "#FC9272",
    "#FB6A4A",
    "#EF3B2C",
    "#CB181D",
    "#A50F15",
    "#67000D",
  ]),
  YLGNBU: Object.freeze([
    "#C7E9B4",
    "#7FCDBB",
    "#41B6C4",
    "#1D91C0",
    "#225EA8",
    "#253494",
    "#081D58",
  ]),
});
/* eslint-enable max-len */

export default function ext() {
  return {
    definition: {
      type: "items",
      component: "accordion",
      items: {
        data: {
          uses: "data",
          items: {
            dimensions: {
              disabledRef: "",
            },
            measures: {
              disabledRef: "",
            },
          },
        },
        sorting: {
          uses: "sorting",
        },
        settings: {
          uses: "settings",
          items: {
            design: {
              label: "Design",
              type: "items",
              items: {
                Orientations: {
                  ref: "Orientations",
                  label: "Orientations",
                  type: "number",
                  defaultValue: 2,
                  min: 2,
                  max: 10,
                },
                RadStart: {
                  ref: "RadStart",
                  label: "Start Angle",
                  type: "number",
                  defaultValue: -90,
                  min: -90,
                  max: 90,
                },
                RadEnd: {
                  ref: "RadEnd",
                  label: "End Angle",
                  type: "number",
                  defaultValue: 90,
                  min: -90,
                  max: 90,
                },
                MaxSize: {
                  ref: "MaxSize",
                  label: "Font Max Size",
                  type: "integer",
                  defaultValue: 100,
                  min: 10,
                  max: 200,
                },
                MinSize: {
                  ref: "MinSize",
                  label: "Font Min Size",
                  type: "integer",
                  defaultValue: 20,
                  min: 10,
                  max: 200,
                },
                Scale: {
                  type: "string",
                  component: "dropdown",
                  label: "Scale",
                  ref: "Scale",
                  options: [
                    {
                      value: "log",
                      label: "Log",
                    },
                    {
                      value: "linear",
                      label: "Linear",
                    },
                  ],
                  defaultValue: "linear",
                },
                customRange: {
                  type: "boolean",
                  component: "switch",
                  label: "Enable Custom Range",
                  ref: "customRange",
                  options: [
                    {
                      value: true,
                      label: "On",
                    },
                    {
                      value: false,
                      label: "Off",
                    },
                  ],
                  defaultValue: false,
                },
                customRangeFrom: {
                  type: "object",
                  label: "From",
                  component: "color-picker",
                  dualOutput: true,
                  defaultValue: {
                    index: -1,
                    color: "#4477aa",
                  },
                  ref: "colorFrom",
                  show: function (data) {
                    if (data.customRange) {
                      return true;
                    }
                  },
                },
                customRangeTo: {
                  type: "object",
                  label: "To",
                  component: "color-picker",
                  dualOutput: true,
                  defaultValue: {
                    index: -1,
                    color: "#ffcf02",
                  },
                  ref: "colorTo",
                  show: function (data) {
                    if (data.customRange) {
                      return true;
                    }
                  },
                },
                ScaleColor: {
                  label: "Scale Color",
                  ref: "ScaleColor",
                  type: "string",
                  component: "item-selection-list",
                  defaultValue: COLOR_SCALES.SEQUENTIAL,
                  items: [
                    {
                      label: "Sequential",
                      component: "color-scale",
                      value: COLOR_SCALES.SEQUENTIAL,
                      colors: COLOR_SCALES.SEQUENTIAL,
                    },
                    {
                      label: "Qlik Sense Diverging",
                      component: "color-scale",
                      value: COLOR_SCALES.QLIK_SENSE_DIVERGING,
                      colors: COLOR_SCALES.QLIK_SENSE_DIVERGING,
                    },
                    {
                      label: "Diverging RdYlBu",
                      component: "color-scale",
                      value: COLOR_SCALES.DIVERGING_RDYLBU,
                      colors: COLOR_SCALES.DIVERGING_RDYLBU,
                    },
                    {
                      label: "Diverging BuYlRd 5 values",
                      component: "color-scale",
                      value: COLOR_SCALES.DIVERGING_BUYLRD,
                      colors: COLOR_SCALES.DIVERGING_BUYLRD,
                    },
                    {
                      label: "Blues",
                      component: "color-scale",
                      value: COLOR_SCALES.BLUES,
                      colors: COLOR_SCALES.BLUES,
                    },
                    {
                      label: "Reds",
                      component: "color-scale",
                      value: COLOR_SCALES.REDS,
                      colors: COLOR_SCALES.REDS,
                    },
                    {
                      label: "YlGnBu",
                      component: "color-scale",
                      value: COLOR_SCALES.YLGNBU,
                      colors: COLOR_SCALES.YLGNBU,
                    },
                  ],
                  show: function (data) {
                    if (!data.customRange) {
                      return true;
                    }
                  },
                },
              },
            },
          },
        },
        about: {
          component: "items",
          label: "About",
          items: {
            header: {
              label: "Word cloud chart",
              style: "header",
              component: "text",
            },
            paragraph1: {
              label: `Word cloud chart is a graphic representation of a text dimension where size is based on the measure value.`,
              component: "text",
            },
            paragraph2: {
              label:
                "Word cloud chart is based upon an extension created by Clever Anjos.",
              component: "text",
            },
            paragraph3: {
              label: "sn-word-cloud",
              component: "text",
            },
          },
        },
      },
    },
    snapshot: {
      canTakeSnapshot: true,
    },
    support: {
      export: true,
    },
  };
}
