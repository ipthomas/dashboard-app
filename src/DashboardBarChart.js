import React, {useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DashboardBarChart({ data, title, pathway}) {
    
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    console.log(pathway)
    const updateChart = (data, title) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: title,
                    data: Object.values(data),
                    // backgroundColor: [
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(55, 255, 255, 0.2)',
                    // ],
                    // borderColor: [
                    //     'rgba(55, 255, 255, 0.2)',
                    //     'rgba(150, 50, 220, 0.2)',
                    //     'rgba(150, 206, 86, 0.2)',
                    //     'rgba(200, 255, 50, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(54, 255, 132, 0.2)',
                    //     'rgba(0, 255, 200, 0.2)',
                    // ],
                    borderWidth: 1, 
                },
            ],
        };

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            maintainAspectRatio: false,
        };
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });
        }
    };

    useEffect(() => { 
        updateChart(data, title);
    }, [data, title, pathway]);

    return <canvas ref={chartRef}></canvas>;
}

export default DashboardBarChart;
