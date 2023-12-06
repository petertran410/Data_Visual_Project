import React from "react";
import * as d3 from "d3";
const Graph = () => {
  function rowConverter(d) {
    return {
      year: d["Year"],
      year1: parseFloat(d["Toàn Quốc"]),
    };
  }
  d3.csv(
    "https://raw.githubusercontent.com/petertran410/data_visual_project/GDP/TocDoTangTruongGRDP.csv",
    rowConverter
  ).then((originalData) => {
    console.log(originalData);
    const svg = d3
      .select("#grap")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .attr("padding", 500);
    var Tooltip = d3
      .select("#grap")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute");
    var mouseover = function (event, d) {
      Tooltip.style("opacity", 1);
      d3.select(this)
        .style("stroke", "black")
        .attr("opacity", (d) => d.cases / 100000 + 0.7);
    };
    var mousemove = function (event, d) {
      Tooltip.style("top", event.pageY + 10 + "px")
        .style("left", event.pageX + 10 + "px")
        .html(
          "<br> Year: " +
            d.year +
            "<br>" +
            "Percentage: " +
            d.year1 +
            "<br>" +
            "<br>"
        );
    };
    var mouseleave = function (event, d) {
      Tooltip.style("opacity", 0)
        .style("top", event.pageY + 200 + "px")
        .style("left", event.pageX + 200 + "px");
      d3.select(this)
        .attr("opacity", (d) => d.cases / 100000 + 0.07)
        .style("stroke", "none");
    };

    let xScale = d3
      .scaleBand()
      .range([0, svg.attr("width")])
      .domain(originalData.map((d) => d.year))
      .padding(0.4);

    let yScale = d3
      .scaleLinear()
      .range([500, 0])
      .domain([0, d3.max(originalData, (d) => d.year1) + 2]);

    let bar = svg
      .selectAll("rect")
      .data(originalData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.year1) - 30)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => svg.attr("height") - yScale(d.year1) + 0)
      .attr("fill", "steelblue")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    let labels = svg
      .selectAll("text")
      .data(originalData)
      .enter()
      .append("text")
      .text((d) => d.year1)
      .attr("x", (d) => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.year1) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "17px")
      .attr("fill", "black");

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 20 + ",-30)")
      .call(yAxis)
      .attr("font-size", "20px");

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (svg.attr("height") - 30) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(0)")
      .attr("x", 100 / 2)
      .attr("font-size", "15px")
      .style("text-anchor", "end");

    var width = 500;
    var height = 500;
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height)
      .text("Years")
      .attr("font-family", "times new roman")
      .attr("font-size", "20px");
  });

  return (
    <div className="grap">
      ,
      <div className="title" id="grap" style={{ padding: 50 }}>
        GRDP-Percentage{" "}
      </div>
    </div>
  );
};

export default Graph;
