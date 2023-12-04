// import React from "react";
// import * as d3 from "d3";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function Chart() {
//   const [drawChart, setDrawChart] = useState({});
//   useEffect(() => {
//     d3.csv(
//       "https://raw.githubusercontent.com/petertran410/data_visual_project/tranngocnhan/src/Density/totalpopulation.csv"
//     )
//       .then((result) => {
//         console.log(result);
//         setDrawChart(result);
//         if (Array.isArray(result)) {
//           let year = "2016";
//           let dataByYear = result.map(function (d) {
//             return {
//               ID: d["ID"],
//               CONVINCE: d["CONVINCE"],
//               year: year,
//               confirm: parseInt(d[year]),
//             };
//           });
//         }

//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return <div></div>;
// }

import React, { Component } from "react";
import * as d3 from "d3";

class Chart extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", 700)
      .attr("height", 300);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
  }
  render() {
    return <div id={"#" + this.props.id}></div>;
  }
}
export default Chart;
