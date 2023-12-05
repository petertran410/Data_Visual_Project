import React from 'react'
import * as d3 from "d3";

const Grap = () => {
    function rowConverter(d) {
        return {
            year: d["Year"],
            year1: parseFloat(d["Toàn Quốc"])

        };
    }

    d3.csv(
        "https://raw.githubusercontent.com/petertran410/data_visual_project/GDP/TocDoTangTruongGRDP.csv",
        rowConverter
    )
        .then(originalData => {
            // Filter out non-zero rows
            // const nonZeroData = originalData.filter(row => row.province == "Toàn Quốc")
            // let first20Rows = originalData.slice(0, 1);
            // console.log(first20Rows);
            console.log(originalData);


            your_draw_chart_function(originalData);



        })
        .catch((error) => {
            console.log(error);
        });

    // FUNCTION HERE
    function your_draw_chart_function(data) {
        console.log(data);
        // d3.select("svg").remove();

        const svg = d3.select("#grap")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 1000)
            .attr("padding", 500)


        var Tooltip = d3.select("#grap")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", "absolute")

        // Three functions that change the tooltip when the user hovers / moves / leaves a bar
        var mouseover = function (event, d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .attr("opacity", d => (d.cases / 100000) + 0.7)
        }
        var mousemove = function (event, d) {
            Tooltip
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px")
                .html("<br> Year: " + d.year + "<br>" +
                    "Percentage: " + d.year1 + "<br>" +
                    "<br>")
        }
        var mouseleave = function (event, d) {
            Tooltip
                .style("opacity", 0)
                .style("top", (event.pageY + 200) + "px")
                .style("left", (event.pageX + 200) + "px")
            d3.select(this)
                .attr("opacity", d => (d.cases / 100000) + 0.07)
                .style("stroke", "none")
        }


        // Define x and y scales
        var xScale = d3
            .scaleBand()
            .domain(data.map(d => (d.year)))
            .range([0, svg.attr("width")])
            .padding(0.1);
        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.year1) + 2])
            .range([svg.attr("height") - 30, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Create x and y axes
        svg
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (svg.attr("height") - 30) + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(0)")
            .attr("x", 100 / 2)
            .attr("font-size", "20px")
            .style("text-anchor", "end");

        // label
        svg.selectAll("text")
            .data(data)
            .enter().append("text")
            .text(function (d) { return d.year1 })
            .attr("class", "text")
            .attr("x", function (d, i) { return (i * 60) + 36 })
            .attr("y", function (d, i) { return 415 - (d * 10) })
            .attr("text-anchor", "middle")
            .attr("font-family", "times new roman")
            .attr("font-size", "20px")
            .attr("fill", "red")
            .style("opacity", 1);

        // Create Bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("fill", "blue")
            .attr("x", d => xScale(d.year))
            .attr("y", d => yScale(d.year1))
            .attr("width", xScale.bandwidth())
            .attr("height", d => svg.attr("height") - yScale(d.year1) - 30)
            // .attr("opacity", d => (d.year1 / 1000) + 0.07)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) { return d.year1 })
            .attr("class", "text")
            .attr("x", function (d, i) { return (i * 60) + 36 })
            .attr("y", function (d, i) { return 415 - (d * 10) })
            .attr("text-anchor", "middle")
            .attr("font-family", "times new roman")
            .attr("font-size", "20px")
            .attr("fill", "red")
            .style("opacity", 1);

        svg.append("g")
            .attr("transform", "translate(" + 20 + ",0)")
            .call(yAxis)
            .attr("font-size", "20px");

    }

    return (
        <div className='grap' id="grap">
            <svg></svg>
            {/* <button id="AddData">Add new data</button>
            <button id="RemoveData">Remove data</button>
            <button id="Sort">Sort</button>
            <select id="sort">
                <option selected value="type">Type</option>
                <option value="name">Name</option>
                <option value="grdp">GRDP-VND</option>
            </select> */}
            <svg></svg>
        </div>
    )
}

export default Grap;
