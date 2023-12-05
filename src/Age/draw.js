import React from 'react';
import JSC from 'jscharting-react';

const Draw = () => {
    const config = {
        debug: true,
        type: 'horizontal column',
        title_label_text: 'VietNam population in 2022',
        yAxis: {
            scale_type: 'stacked',
            defaultTick_label_text: '{Math.abs(%Value):a2}'
        },
        xAxis: {
            label_text: 'Age',
            crosshair_enabled: true
        },
        defaultTooltip_label_text: 'Ages %xValue:<br><b>%points</b>',
        defaultPoint_tooltip: '%icon {Math.abs(%Value)}',
        legend_template: '%name %icon {Math.abs(%Value)}',
        series: [
            {
                name: 'Male',
                points: [
                    ['0-4', 10059740],
                    ["5-9", 3953190],
                    ["10-14", 3760862],
                    ["10-14", 3760862],
                    ["15-19", 73609132],
                    ["20-24", 3471122],
                    ["25-29", 3888681],
                    ["30-34",4058851],
                    ["35-39", 3888388],
                    ["40-44", 3744205],
                    ["45-49", 3421590],
                    ["50-54", 2749474],
                    ["55-59", 2393990,],
                    ["60-64", 2140145],
                    ["65-69", 1638986],
                    ["70-74", 999965],
                    ["75-79", 489748],
                    ["80-84", 275646]
                ]
            },
            {
                name: 'Female',
                points: [
                    ["0-4", 3459537],
                    ["5-9", 3555887],
                    ["10-14", 3412292],
                    ["15-19", 3366994],
                    ["20-24", 3331052],
                    ["25-29", 3821683],
                    ["30-34",4128883],
                    ["35-39", 3990740],
                    ["40-44", 3714490],
                    ["45-49", 3400637],
                    ["50-54", 2917833],
                    ["55-59", 2713048],
                    ["60-64", 2500089],
                    ["65-69", 2020477],
                    ["70-74", 1388755],
                    ["75-79", 815094],
                    ["80-84", 562979]
                ]
            }
        ]
    };

    return <JSC.Chart options={config} />;
};

export default Draw;