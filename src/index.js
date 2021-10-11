import {
  useElement,
  useStaleLayout,
  usePromise,
  useSelections,
} from "@nebula.js/stardust";
import data from "./extension/data";
import ext from "./extension/ext";
import properties from "./extension/properties";
import paint from "./paint";

import "./styles.css";

/*
clearSelectedValues(a){
    a.find(".selected")[0].classList.replace("selected","selectable"); //to make it "look" faster
    this.$scope.selectionsApi.cancel();
  },
*/

export default function supernova() {
  return {
    qae: {
      properties,
      data: data(),
    },
    component() {
      const el = useElement();
      const layout = useStaleLayout();
      const selections = useSelections();

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
      }, [el, layout, selections]);
    },
    ext: ext(),
  };
}
