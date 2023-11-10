import React, { Component } from "react";
import * as d3 from "d3";
import "./DrawChar.scss";

const drawChart = (svgSelector) => {
  let width = 700;
  let height = 700;
  let marginTop = 20;
  let marginRight = 20;
  let marginBottom = 30;
  let marginLeft = 40;

  const data = [12, 5, 20, 6, 9, 10];

  d3.csv(
    '../TongDanSo.csv'
  ).then(function(data) {
    let year = "Năm 2016";
    let dataByYear = year.map(function (d) {
      return {
        
      }
    })
  })

  const svg = d3
    .select(svgSelector)
    .append("svg")
    .attr("width", 700)
    .attr("height", 700);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", (d, i) => 400 - 10 * d)
    .attr("width", 65)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "green");

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 70)
    .attr("y", (d, i) => 400 - 10 * d - 3);

  // // Declare the x (horizontal position) scale.
  // const x = d3
  //   .scaleUtc()
  //   .domain([new Date("2023-01-01"), new Date("2024-01-01")])
  //   .range([marginLeft, width - marginRight]);

  // // Declare the y (vertical position) scale.
  // const y = d3
  //   .scaleLinear()
  //   .domain([0, 100])
  //   .range([height - marginBottom, marginTop]);

  // // Create the SVG container.

  // // Add the x-axis.
  // svg
  //   .append("g")
  //   .attr("transform", `translate(0,${height - marginBottom})`)
  //   .call(d3.axisBottom(x));

  // // Add the y-axis.
  // svg
  //   .append("g")
  //   .attr("transform", `translate(${marginLeft},0)`)
  //   .call(d3.axisLeft(y));
};

export default class DrawChart extends Component {
  componentDidMount() {
    drawChart("#chart");
  }

  render() {
    return (
      <div className="d-flex chart" id="chart">
        {/* {this.componentDidMount} */}
      </div>
    );
  }
}
