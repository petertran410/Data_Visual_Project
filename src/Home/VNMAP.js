import React from "react";
import * as d3 from "d3";
// import { select, csv, json, geoAlbers, geoPath, zoom } from "d3";

export default function VNMap() {
  var width = 1500;
  var height = 1500;

  var projection = d3
    .geoAlbers()
    .center([100, 4.4])
    .rotate([2, 32])
    .parallels([11, 20])
    .translate([width / 38, height / 2])
    .scale([3000]);

  var path = d3.geoPath().projection(projection);

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

   
}