import * as d3 from "d3";
import $ from "jquery";
import d3cloud from "d3-cloud";
import { Random, MersenneTwister19937 } from "random-js";

const RANDOM_SEED = 0x12345;

function draw(
  words,
  layout,
  element,
  component,
  scaleColor,
  id,
  width,
  height,
  resolve
) {
  const data = words.map((d) => ({
    text: d.text,
    elemNumber: d.elemNumber,
    value: d.value,
    size: d.size,
    x: d.x,
    y: d.y,
    rotate: d.rotate,
  }));

  const maxWordValue = data.reduce(
    (accum, word) => Math.max(accum, word.value),
    0
  );
  let fill = null;
  if (layout.customRange) {
    fill = d3
      .scaleLinear()
      .interpolate(d3.interpolateHcl)
      .domain([1, maxWordValue])
      .range([layout.colorTo.color, layout.colorFrom.color]);
  } else {
    fill = d3
      .scaleLinear()
      .interpolate(d3.interpolateHcl)
      .domain(
        [...Array(scaleColor.length).keys()].map(
          (i) => ((i + 1) / scaleColor.length) * maxWordValue
        )
      )
      .range(scaleColor);
  }

  const svg = d3
    .select(`#${id}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "wordcloud")
    .append("g")
    .attr("transform", "translate(" + [width / 2, height / 2] + ")");

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .style("fill", function (d) {
      return fill(d.value);
    })
    .attr("class", "selectable")
    .attr("data-value", function (d) {
      return d.elemNumber;
    })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ") rotate(" + (d.rotate || 0) + ")";
    })
    .style("font-size", function (d) {
      return d.size + "px";
    })
    .text(function (d) {
      return d.text;
    })
    .append("svg:title")
    .text(function (d) {
      return d.text + ":" + d.value;
    });

  //when an item is clicked, add it to the selected values and show the Sense UI for selections
  $(element)
    .find(".selectable")
    .on("click", ({ target }) => {
      const valueFromHyperCube = layout.qHyperCube.qDataPages[0].qMatrix.find(
        (d) => d[0].qText === target.__data__.text // eslint-disable-line no-underscore-dangle
      );
      if (valueFromHyperCube[0].qIsNull) {
        return;
      }
      if (!target.hasAttribute("data-value")) {
        return;
      }

      if ($(target).hasClass("selected")) {
        const selClass = $(target).attr("class");
        $(target).attr("class", selClass.replace("selected", "selectable"));
      } else {
        $(target).attr("class", "selected");
      }

      component.beginSelections(element.querySelector(".wordcloud"));

      const value = parseInt(target.getAttribute("data-value"), 10);
      component.selectValues(0, [value], true);
    });

  resolve();
}

const wordcloud = () => ({
  Id: "",
  Width: 0,
  Height: 0,
  fill: null,

  go: function (words, layout, element, component) {
    const max = Math.max(layout.qHyperCube.qMeasureInfo[0].qMax, 1); // log scale should never cross zero
    const min = Math.max(layout.qHyperCube.qMeasureInfo[0].qMin, 1); // log scale should never cross zero

    const scaleFunction = layout.Scale === "log" ? d3.scaleLog : d3.scaleLinear;

    const scale = scaleFunction()
      .domain([min, max])
      .rangeRound([layout.MinSize, layout.MaxSize]);
    const from = Math.max(-90, Math.min(90, +layout.RadStart));
    const to = Math.max(-90, Math.min(90, +layout.RadEnd));
    const scaleRotate = d3
      .scaleLinear()
      .domain([0, +layout.Orientations - 1])
      .range([from, to]); // Input [0,1] convert into output [-90,90]
    const r = new Random(MersenneTwister19937.seed(RANDOM_SEED + words.length));
    var self = this;
    return new Promise(function (resolve) {
      d3cloud()
        .size([self.Width, self.Height])
        .words(words)
        .padding(5)
        .timeInterval(10)
        .random(function () {
          return r.real(0, 1);
        })
        .rotate(function () {
          return scaleRotate(
            Math.round(r.real(0, 1) * (layout.Orientations - 1))
          );
        })
        .fontSize(function (d) {
          return scale(+d.value);
        })
        .font(["QlikView Sans"])
        .on("end", (words) =>
          draw(
            words,
            layout,
            element,
            component,
            layout.ScaleColor,
            self.Id,
            self.Width,
            self.Height,
            resolve
          )
        )
        .start();
    });
  },

  id: function (x) {
    if (!arguments.length) {
      return this.Id;
    }
    this.Id = x;
    return this;
  },
  width: function (x) {
    if (!arguments.length) {
      return this.Width;
    }
    this.Width = x;
    return this;
  },

  height: function (x) {
    if (!arguments.length) {
      return this.Height;
    }
    this.Height = x;
    return this;
  },
});

function paint(element, layout, component) {
  const size = element.getBoundingClientRect();
  if (size.height < 10 || size.width < 10) {
    return;
  }
  var id = "wordcloud_" + layout.qInfo.qId;

  element.textContent = "";

  $("<div />")
    .attr("id", id)
    .width(size.width)
    .height(size.height)
    .appendTo(element);

  const words = layout.qHyperCube.qDataPages[0].qMatrix.map((row) => ({
    text: row[0].qText,
    elemNumber: row[0].qElemNumber,
    value: row[1].qNum,
  }));

  const cloud = wordcloud().id(id).width(size.width).height(size.height);
  return cloud.go(words, layout, element, component);
}

export default paint;
