import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PoorLineChart() {
  const [data] = useState([32,44,59,72,40]);

  const svgRef = useRef();


 

  useEffect(() => {
    
    // setting up svg

    const w = 1000;
    const h = 100;

    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h*6)
      .style('background', '#d3d3d3')
      .style('margin-top', '50px')
      .style('overflow', 'visible');

    // setting the scaling
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);

    const yScale = d3.scaleLinear()
      .domain([0,h])
      .range([h*6, 0]);

    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);
    // setting the axes
    
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 2016);

    const yAxis = d3.axisLeft(yScale)
      .ticks(6);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h*6})`);

    svg.append('g')
      .call(yAxis)
      
    // setting up the data for the svg
      svg.selectAll('.line')
      .data([data])
      .join('path')
        .attr('d', d => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
  }, [data]);

  return (
    <div >
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default PoorLineChart;
