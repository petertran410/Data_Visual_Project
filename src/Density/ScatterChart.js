import React, { Component } from "react";
import * as d3 from "d3";

export default class ScatterChart extends Component {
  constructor(props) {
    super(props);
    this.infoChart = this.infoChart.bind(this);
    this.draw = this.draw.bind(this);
  }
  componentDidMount() {
    // Call the infoChart method when the component is mounted
    this.infoChart();
  }

  infoChart() {
    d3.csv(
      "https://raw.githubusercontent.com/petertran410/data_visual_project/tranngocnhan/src/Density/TongDanSo.csv"
    )
      .then((data) => {
        let year2016 = "2016";
        let year2017 = "2017";
        // let parseTime = d3.timeParse("%Y");
        let dataByConvince = data.map(function (d) {
          return {
            convince: d.CONVINCE,
            year2016: year2016,
            confirmYear2016: parseInt(d[year2016]),
            year2017: year2017,
            confirmYear2017: parseInt(d[year2017]),
          };
        });
        console.log(dataByConvince);
        this.draw(dataByConvince);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  draw(data) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1600 - margin.left - margin.right,
      height = 1600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear().domain([0, 10000000]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 10000000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    // var tooltip = d3
    //   .select("body")
    //   .append("div")
    //   .style("opacity", 0)
    //   .attr("class", "tooltip")
    //   .style("background-color", "white")
    //   .style("border", "solid")
    //   .style("border-width", "1px")
    //   .style("border-radius", "5px")
    //   .style("padding", "10px");

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    // var mouseover = function (d) {
    //   tooltip.style("opacity", 1);
    // };

    // var mousemove = function (d) {
    //   tooltip
    //     .html("The exact value of<br>the Ground Living area is: " + d.GrLivArea)
    //     .style("left", d3.mouse(this)[0] + 90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    //     .style("top", d3.mouse(this)[1] + "px");
    // };

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    // var mouseleave = function (d) {
    //   tooltip.transition().duration(200).style("opacity", 0);
    // };

    // Add dots
    svg
      .append("g")
      .selectAll("dot")
      .data(
        data.filter(function (d, i) {
          return i < 70;
        })
      ) // the .filter part is just to keep a few dots on the chart, not all of them
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.confirmYear2016);
      })
      .attr("cy", function (d) {
        return y(d.confirmYear2016);
      })
      .attr("r", 20)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white");
  }

  render() {
    return <div></div>;
  }
}
