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

};

export default Draw;
