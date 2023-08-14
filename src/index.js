import {
  useElement,
  useStaleLayout,
  usePromise,
  useRect,
  useSelections,
} from "@nebula.js/stardust";
import data from "./extension/data";
import ext from "./extension/ext";
import properties from "./extension/properties";
import paint from "./paint";

import "./styles.css";

const metaData = {
  name: "Word cloud",
  icon: "treemap",
  id: "sn-word-cloud",
};

function supernova() {
  return {
    qae: {
      properties,
      data: data(),
    },
    component() {
      const el = useElement();
      const layout = useStaleLayout();
      const selections = useSelections();
      const rect = useRect();

      usePromise(() => {
        const component = {
          beginSelections: (root) => {
            if (!selections.isActive()) {
              selections.begin("/qHyperCubeDef");
              if (root) {
                root.classList.toggle("in-selections");
              }
            }
          },
          selectValues: (dim, values, toggle) => {
            selections.select({
              method: "selectHyperCubeValues",
              params: ["/qHyperCubeDef", dim, values, toggle],
            });
          },
        };
        return paint(el, layout, component);
      }, [el, layout, selections, rect]);
    },
    ext: ext(),
  };
}

supernova.metaData = metaData;

export default supernova;
