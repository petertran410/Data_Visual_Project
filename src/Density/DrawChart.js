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
      "https://raw.githubusercontent.com/petertran410/data_visual_project/tranngocnhan/src/Density/TongDanSo.csv"
    )
      .then((data) => {
        let year2016 = "2016";
        let year2017 = "2017";
        let year2018 = "2018";
        let year2019 = "2019";
        let year2020 = "2020";
        let year2021 = "2021";
        let filteredData = data.filter((d) => d.CONVINCE === "Cao Bang");
        // let parseTime = d3.timeParse("%Y");
        let dataByConvince = filteredData.map(function (d) {
          return {
            convince: d.CONVINCE,
            year2016: year2016,
            confirmYear2016: parseInt(d[year2016]),
            year2017: year2017,
            confirmYear2017: parseInt(d[year2017]),
            year2018: year2018,
            confirmYear2018: parseInt(d[year2018]),
            year2019,
            confirmYear2019: parseInt(d[year2019]),
            year2020,
            confirmYear2020: parseInt(d[year2020]),
            year2021,
            confirmYear2021: parseInt(d[year2021]),
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
    console.log(data);
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1500 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis --> it is a date format
    var x = d3
      .scaleBand()
      .domain([
        "year2016",
        "year2017",
        "year2018",
        "year2019",
        "year2020",
        "year2021",
      ])
      .range([0, width])
      .padding(0.1);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.50em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");
    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        500000,
        d3.max(data, function (d) {
          return d3.max([
            d.confirmYear2016,
            d.confirmYear2017,
            d.confirmYear2018,
            d.confirmYear2019,
            d.confirmYear2020,
            d.confirmYear2021,
          ]);
        }),
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    // Add the line
    svg
      .append("path")
      .datum([
        { year: "year2016", confirm: d3.mean(data, (d) => d.confirmYear2016) },
        { year: "year2017", confirm: d3.mean(data, (d) => d.confirmYear2017) },
        { year: "year2018", confirm: d3.mean(data, (d) => d.confirmYear2018) },
        { year: "year2019", confirm: d3.mean(data, (d) => d.confirmYear2019) },
        { year: "year2020", confirm: d3.mean(data, (d) => d.confirmYear2020) },
        { year: "year2021", confirm: d3.mean(data, (d) => d.confirmYear2021) },
      ])

      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.year) + x.bandwidth() / 2; // Adjust for band scale positioning
          }) // Use x scale to map the year to x-coordinate
          .y(function (d) {
            return y(d.confirm);
          }) // Use y scale to map the confirmation to y-coordinate
      );
  }

  render() {
    return <div>
      <option value=""></option>
    </div>;
  }
}
