import React, { useEffect } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { geoPath } from "d3-geo";
import { scaleQuantize } from "d3-scale";
import { csv, json } from "d3-fetch";

export default function VNMap() {
  useEffect(() => {
    var width = 800;
    var height = 800;

    var zoomHandler = zoom()
      .scaleExtent([1, 60])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", zoomed);

    var svg = select("#drawChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoomHandler);

    var g = svg.append("g");

    const projection = d3
      .geoAlbers()
      .center([100, 4.4])
      .rotate([2, 32])
      .parallels([11, 20])
      .scale([2000])
      .translate([width / 5, height / 1.2]);
    const path = geoPath().projection(projection);

    var colorScale = scaleQuantize().range([
      "rgb(198, 151, 116)",
      "rgb(99, 126, 118)",
    ]);

    var tooltip = select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    csv(
      "https://raw.githubusercontent.com/petertran410/data_visual_project/main/src/Home-2/MapData.csv"
    ).then((data) => {
      colorScale.domain([
        d3.min(data, function (d) {
          return d.Diploma && d.Population;
        }),
        d3.max(data, function (d) {
          return d.Diploma && d.Population;
        }),
      ]);

      json(
        "https://raw.githubusercontent.com/TungTh/tungth.github.io/master/data/vn-provinces.json"
      ).then((json) => {
        json.features.forEach((feature) => {
          var dataProvince = parseFloat(feature.properties.Ma);
          var correspondingData = data.find(
            (d) => dataProvince === parseFloat(d.ma)
          );

          if (correspondingData) {
            feature.properties.province = correspondingData.Province;
            feature.properties.population = correspondingData.Population;
            feature.properties.diploma = correspondingData.Diploma;
            feature.properties.gdp = correspondingData.GDP;
          }
        });

        var map = g
          .selectAll("path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", function (d) {
            var value =
              d.properties.diploma && d.properties.population && d.properties.gdp;

            console.log(map);
            if (value > 0) {
              return colorScale(value);
            } else {
              return "#ccc";
            }
          })
          .on("mouseover", function (event, d) {
            select(this)
              .transition()
              .duration(200)
              .style("opacity", 1)
              .style("stroke", "black");
            tooltip
              .transition()
              .duration(200)
              .style("opacity", 0.9)
              .style("font-size", 50)
              .style("stroke", "black");
            tooltip.html(d.properties.province);
          })
          .on("mousemove", function (event, d) {
            tooltip
              .style("top", event.pageY + "px")
              .style("left", event.pageX + 10 + "px");

            tooltip.html(
              "<strong>Province: </strong>" + 
              d.properties.province.bold() +
                " <br><strong>Population: </strong>" +
              d.properties.population.bold()
            );
          })
          .on("mouseout", function (event, d) {
            select(this)
              .transition()
              .duration(200)
              .style("stroke", "transparent");
            tooltip.transition().duration(200).style("opacity", 0);
          });
      });
    });

    function zoomed(event) {
      g.selectAll("path").attr("transform", event.transform);
    }
  }, []);

  return (
    <div className="drawChart border-4 border-black bg-white ml-20 pl-8">
      <h1 className="flex justify-center items-center font-bold text-lg">
        MAP POPULATION OF VIETNAM
      </h1>
      <div id="drawChart"></div>
    </div>
  );
}
