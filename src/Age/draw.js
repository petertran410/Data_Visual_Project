import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
const PopulationPyramidChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {  
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 450 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 450 350')
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
      d3.csv("https://raw.githubusercontent.com/GDS-ODSSS/unhcr-dataviz-platform/master/data/distribution/population_pyramid.csv")
      .then(function(data){
    
      // X scale and Axis
    const xScaleMale = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.male)])
      .range([width/2, 0]);
    svg
      .append("g")
          .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScaleMale).tickSize(0).tickPadding(3).ticks(7, "%"))
      .call(function(d) { return d.select(".domain").remove()});
  
    const xScaleFemale = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.female)])
      .range([width/2, width]);
    svg
      .append("g")
          .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScaleFemale).tickSize(0).tickPadding(3).ticks(7, "%"))
      .call(function(d) { return d.select(".domain").remove()});
  
    // set vertical grid line
    const GridLineF = function() { return d3.axisBottom().scale(xScaleFemale)};
    svg
      .append("g")
        .attr("class", "grid")
      .call(GridLineF()
        .tickSize(height,0,0)
        .tickFormat("")
        .ticks(7)
    );
    const GridLineM = function() { return d3.axisBottom().scale(xScaleMale)};
    svg
      .append("g")
        .attr("class", "grid")
      .call(GridLineM()
        .tickSize(height,0,0)
        .tickFormat("")
        .ticks(7)
    );
  
    // Y scale and Axis
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.ages))
        .range([height, 0])
        .padding(.25);
    svg
        .append("g")
        .call(d3.axisLeft(yScale).tickSize(0).tickPadding(15))
        .call(d => d.select(".domain").remove());
  
    // create a tooltip
    const tooltip = d3.select("body")
      .append("div")
        .attr("class", "tooltip");
  
    // tooltip events
    const mouseover = function(d) {
        tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "#EF4A60")
          .style("opacity", .5)
    };
    const mousemove1 = function(event,d) {
  
        tooltip
        .html( `${d.male*100}%`)
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
    };
    const mousemove2 = function(event,d) {
      tooltip
      .html( `${d.female*100}%`)
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px")
    };
    const mouseleave = function(d) {
        tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
    };
  
    // create male bars
    svg
      .selectAll(".maleBar")
        .data(data)
      .join("rect")
        .attr("class", "barMale")
        .attr("x", d => xScaleMale(d.male))
        .attr("y", d => yScale(d.ages))
        .attr("width", d => width/2 - xScaleMale(d.male))
        .attr("height", yScale.bandwidth())
        .style("fill", "#18375F")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove1)
      .on("mouseleave", mouseleave)
  
    // create female bars
    svg
        .selectAll(".femaleBar")
          .data(data)
        .join("rect")
          .attr("class", "barFemale")
          .attr("x", xScaleFemale(0))
          .attr("y", d => yScale(d.ages))
          .attr("width", d => xScaleFemale(d.female) - xScaleFemale(0))
          .attr("height", yScale.bandwidth())
          .style("fill", "#0072BC")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave)
  
    // set title
    svg
      .append("text")
        .attr("class", "chart-title")
        .attr("x", -(margin.left)*0.7)
        .attr("y", -(margin.top)/1.5)
        .attr("text-anchor", "start")
      .text("Demographics of forcibly displaced people | 2020")
  
    // set source
    svg
      .append("text")
        .attr("class", "chart-source")
        .attr("x", -(margin.left)*0.7)
        .attr("y", height + margin.bottom*0.7)
        .attr("text-anchor", "start")
      .text("Source: UNHCR")
  
    // set copyright
    svg
      .append("text")
        .attr("class", "copyright")
        .attr("x", -(margin.left)*0.7)
        .attr("y", height + margin.bottom*0.9)
        .attr("text-anchor", "start")
      .text("©UNHCR, The UN Refugee Agency")
  
    //set legend
    svg
        .append("rect")
            .attr("x", -(margin.left)*0.7)
            .attr("y", -(margin.top/3))
            .attr("width", 13)
            .attr("height", 13)
            .style("fill", "#18375F")
    svg
        .append("text")
            .attr("class", "legend")
            .attr("x", -(margin.left)*0.6+15)
            .attr("y", -(margin.top/5.5))
        .text("Male")
    svg
        .append("rect")
            .attr("x", 40)
            .attr("y", -(margin.top/3))
            .attr("width", 13)
            .attr("height", 13)
            .style("fill", "#0072BC")
    svg
        .append("text")
            .attr("class", "legend")
            .attr("x", 60)
            .attr("y", -(margin.top/5.5))
        .text("Female")  
  });
  return (
    <div ref={chartRef} id="viz_container">
      {/* Chart will be rendered here */}
    </div>
  );
});
};
export default PopulationPyramidChart;