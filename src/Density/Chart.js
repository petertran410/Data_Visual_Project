import React, { Component } from "react";
import * as d3 from "d3";

export default class Chart extends Component {
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
      "https://raw.githubusercontent.com/petertran410/data_visual_project/tranngocnhan/TongDanSo%20(2).csv"
    ).then((data) => {
      let dataByDate = data.map(function (d) {
        return {
          convince: d(["TÊN TỈNH"]),
          year: parseInt(d(["NĂM 2016"])),
          toanQuoc: parseFloat(d(["TOÀN QUỐC"])),
          // confirmed: parseInt(d[date]),
        };
      });
      console.log(dataByDate);
      this.draw(dataByDate);
    });
  }

  draw(data) {
    let width = 1500;
    let height = 800;
    let spacing = 100;

    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${spacing / 2}, ${spacing / 2})`);
    let minCONVINCE = d3.min(data, function (d) {
      return d.CONVINCE;
    });
    let maxCONVINCE = d3.max(data, function (d) {
      return d.CONVINCE;
    });
    let minID = d3.min(data, function (d) {
      return d.ID;
    });
    let maxID = d3.max(data, function (d) {
      return d.ID;
    });

    // minCONVINCE = Math.ceil(minCONVINCE);
    // maxCONVINCE = Math.ceil(maxCONVINCE);
    // minID = Math.ceil(minID);
    // maxID = Math.ceil(maxID);

    console.log(minCONVINCE, maxCONVINCE, minID, maxID);

    let xScale = d3
      .scaleLinear()
      .domain([minID, maxID])
      .range([0, width - spacing]);
    let yScale = d3
      .scaleLinear()
      .domain([minCONVINCE, maxCONVINCE])
      .range([height - spacing, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // 1
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height - spacing / 2})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height + spacing / 2)
          .tickFormat("")
          .tickSizeOuter(0)
          .tickSizeInner(-height + spacing / 2)
          .tickPadding(10)
          .tickFormat("")
      );

    // 2
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${spacing / 2}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width + spacing / 2)
          .tickFormat("")
          .tickSizeOuter(0)
          .tickSizeInner(-width + spacing / 2)
          .tickPadding(10)
          .tickFormat("")
      );

    svg
      .append("g")
      .attr("id", "xAxis")
      .attr("transform", `translate(0, ${(height - spacing) / 2})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .filter(function (d) {
        return d === 0;
      })
      .attr("transform", "translate(-10,0)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("id", "yAxis")
      .attr("transform", `translate(${(width - spacing) / 2}, 0)`)
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .attr("transform", "translate(0,-3)")
      .filter(function (d) {
        return d === 0;
      })
      .remove();

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.long);
      })
      .attr("cy", function (d) {
        return yScale(d.lat);
      })
      .attr("r", 10) // Circle size
      .style("fill", "blue") // Color of circles
      .style("opacity", 0.7); // Opacity
  }

  render() {
    return <div></div>;
  }
}
