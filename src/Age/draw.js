import React, { useEffect } from 'react';
import { GoogleCharts } from 'google-charts';
import * as d3 from 'd3';

const Draw = () => {
    const rowConverter = (row) => {
    };

    const formatData = (originalData) => {
    };

    useEffect(() => {
        d3.csv(
            '/TuoiThoBinhQuan.csv',
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
