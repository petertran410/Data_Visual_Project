import React, { useEffect } from 'react';
import { GoogleCharts } from 'google-charts';
import * as d3 from 'd3';

const Draw = () => {
  useEffect(() => {
    // Load data using d3.csv
    d3.csv(
      'https://raw.githubusercontent.com/petertran410/data_visual_project/GDP/TocDoTangTruongGRDP.csv',
      rowConverter
    )
      .then((originalData) => {
        console.log(originalData);
        const formattedData = formatData(originalData);
        GoogleCharts.load(() => drawChart(formattedData), { packages: ['corechart'] });
      })
      .catch((error) => {
        console.error('Error loading CSV:', error);
      });
  }, []);
  const rowConverter = (row) => {
    // Customize this function to convert and format each row as needed
    return row;
  };
  const formatData = (csvData) => {
    return csvData;
  };
  const drawChart = (data) => {
    const dataTable = GoogleCharts.api.visualization.arrayToDataTable(data);

    const barChart = new GoogleCharts.api.visualization.BarChart(
      document.getElementById('chart')
    );

    const options = {
      title: 'Tuoi tho binh quan nguoi viet nam',
      height: 500,
      width: 400,
      isStacked: true,
      hAxis: {
        format: ';',
        direction: -1,
      },
      vAxis: {
        direction: -1,
      },
      focusTarget: 'category',
      allowHtml: true,
    };

    barChart.draw(dataTable, options);
  };

  return <div id="chart" />;
};
export default Draw;
