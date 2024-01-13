import React, { Component } from "react";
import * as d3 from "d3";

export default class DiplomaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConvince: this.getConvinceFromURL() || "Hà Nội",
    };
    this.infoChart = this.infoChart.bind(this);
    this.draw = this.draw.bind(this);
    this.handleConvinceChange = this.handleConvinceChange.bind(this);
  }
  componentDidMount() {
    if (!this.state.selectedConvince) {
      // Set the default value only if it's not already set
      this.setState({ selectedConvince: "Hà Nội" });
    }
    this.infoChart();
  }

  getConvinceFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("convince");
  }

  infoChart() {
    const { selectedConvince } = this.state;
    d3.csv(
      "https://raw.githubusercontent.com/petertran410/data_visual_project/diploma/TyLeLaoDongQuaDaoTao.csv"
    )
      .then((data) => {
        console.log(data);
        let year2016 = "2016";
        let year2017 = "2017";
        let year2018 = "2018";
        let year2019 = "2019";
        let year2020 = "2020";
        let year2021 = "2021";
        let year2022 = "2022";
        let filteredData = data.filter((d) => d.CONVINCE === selectedConvince);
        // let parseTime = d3.timeParse("%Y");
        let dataByConvince = filteredData.map(function (d) {
          return {
            convince: d.CONVINCE,
            year2016: year2016,
            confirmYear2016: parseFloat(d[year2016]),
            year2017: year2017,
            confirmYear2017: parseFloat(d[year2017]),
            year2018: year2018,
            confirmYear2018: parseFloat(d[year2018]),
            year2019,
            confirmYear2019: parseFloat(d[year2019]),
            year2020,
            confirmYear2020: parseFloat(d[year2020]),
            year2021,
            confirmYear2021: parseFloat(d[year2021]),
            year2022: year2022,
            confirmYear2022: parseFloat(d[year2022]),
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
    var Tooltip = d3
      .select("#drawChart")
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
          d.year +
          "<br>" +
          "Percentage: " +
          d.confirm +
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
    console.log(data);
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#drawChart")
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
        "year2022",
      ])
      .range([0, width])
      .padding(0.3);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("font-size", "15px")
      .attr("dx", "1.55em")
      .attr("dy", ".1em");
    // .attr("transform", "rotate(-90)");

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data([
        { year: "year2016", confirm: d3.mean(data, (d) => d.confirmYear2016) },
        { year: "year2017", confirm: d3.mean(data, (d) => d.confirmYear2017) },
        { year: "year2018", confirm: d3.mean(data, (d) => d.confirmYear2018) },
        { year: "year2019", confirm: d3.mean(data, (d) => d.confirmYear2019) },
        { year: "year2020", confirm: d3.mean(data, (d) => d.confirmYear2020) },
        { year: "year2021", confirm: d3.mean(data, (d) => d.confirmYear2021) },
        { year: "year2022", confirm: d3.mean(data, (d) => d.confirmYear2022) },
      ])
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.confirm))
      .attr("width", x.bandwidth())
      .attr("height", (d) => d.confirm * 5.6)
      .attr("fill", "#91a8b4")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    svg
      .selectAll("text.label")
      .data([
        { year: "year2016", confirm: d3.mean(data, (d) => d.confirmYear2016) },
        { year: "year2017", confirm: d3.mean(data, (d) => d.confirmYear2017) },
        { year: "year2018", confirm: d3.mean(data, (d) => d.confirmYear2018) },
        { year: "year2019", confirm: d3.mean(data, (d) => d.confirmYear2019) },
        { year: "year2020", confirm: d3.mean(data, (d) => d.confirmYear2020) },
        { year: "year2021", confirm: d3.mean(data, (d) => d.confirmYear2021) },
        { year: "year2022", confirm: d3.mean(data, (d) => d.confirmYear2022) },
      ])
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("fill", "white")
      .text((d) => d.confirm + "%")
      .attr("x", (d) => x(d.year) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.confirm))
      .attr("dy", "1em") // Offset by half the height of the text to center it
      .attr("text-anchor", "middle");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 30)
      .text("Years")
      .attr("font-family", "times new roman")
      .attr("font-size", "20px");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 200)
      .attr("y", 10)
      .text("Proportion of qualified trained workers (%)")
      .attr("font-family", "times new roman")
      .attr("font-size", "20px");
  }

  handleConvinceChange(event) {
    const newConvince = event.target.value;
    this.setState({ selectedConvince: newConvince }, () => {
      // Add a random query parameter to force a complete reload
      const randomQuery = Math.random().toString(36).substring(7);
      window.location.href = `${window.location.origin}${window.location.pathname}?convince=${newConvince}&${randomQuery}`;
    });
  }

  render() {
    const { selectedConvince } = this.state;
    const convinceOptions = [
      "TOÀN QUỐC",
      "Hà Nội",
      "Hà Giang",
      "Cao Bằng",
      "Bắc Kạn",
      "Tuyên Quang",
      "Lào Cai",
      "Điện Biên",
      "Lai Châu",
      "Sơn La",
      "Yên Bái",
      "Hòa Bình",
      "Thái Nguyên",
      "Lạng Sơn",
      "Quảng Ninh",
      "Bắc Giang",
      "Phú Thọ",
      "Vĩnh Phúc",
      "Bắc Ninh",
      "Hải Dương",
      "Hải Phòng",
      "Hưng Yên",
      "Thái Bình",
      "Hà Nam",
      "Nam Định",
      "Ninh Bình",
      "Thanh Hóa",
      "Nghệ An",
      "Hà Tĩnh",
      "Quảng Bình",
      "Quảng Trị",
      "Thừa Thiên-Huế",
      "Đà Nẵng",
      "Quảng Nam",
      "Quảng Ngãi",
      "Bình Định",
      "Phú Yên",
      "Khánh Hòa",
      "Ninh Thuận",
      "Bình Thuận",
      "Kon Tum",
      "Gia Lai",
      "Đắk Lắk",
      "Đắk Nông",
      "Lâm Đồng",
      "Bình Phước",
      "Tây Ninh",
      "Bình Dương",
      "Đồng Nai",
      "Bà Rịa - Vũng Tàu",
      "TP. Hồ Chí Minh",
      "Long An",
      "Tiền Giang",
      "Bến Tre",
      "Trà Vinh",
      "Vĩnh Long",
      "Đồng Tháp",
      "An Giang",
      "Kiên Giang",
      "Cần Thơ",
      "Hậu Giang",
      "Sóc Trăng",
      "Bạc Liêu",
      "Cà Mau",
    ];
    return (
      <div>
        <label>Select convince:</label>
        <select value={selectedConvince} onChange={this.handleConvinceChange} className="border-2 border-black ml-1">
          {convinceOptions.map((convince) => (
            <option key={convince} value={convince}>
              {convince}
            </option>
          ))}
        </select>
        <div className="drawChart" id="drawChart"></div>
      </div>
    );
  }
}
