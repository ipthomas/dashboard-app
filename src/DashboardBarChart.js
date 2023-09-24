import React, {useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DashboardBarChart({ data }) {
    
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const updateChart = (data) => {
        if (chartInstance.current) {
            // Destroy the existing chart if it exists
            chartInstance.current.destroy();
        }
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: 'ICB Workflows',
                    data: Object.values(data),
                    backgroundColor: [
                        'rgba(55, 255, 255, 0.2)',
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(150, 206, 86, 0.2)',
                        'rgba(150, 55, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 255, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(55, 255, 255, 0.2)',
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(150, 206, 86, 0.2)',
                        'rgba(150, 55, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 255, 132, 0.2)',
                    ],
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
        updateChart(data);
    }, [data]);

    return <canvas ref={chartRef}></canvas>;
}

export default DashboardBarChart;
