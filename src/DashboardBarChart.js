import React, {useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DashboardBarChart({ data, title}) {
    
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    // const getDashboardCellStyle = (category) => {
    //   switch (category) {
    //     case 'Total':
    //       return 'dashboard-total-cell';
    //     case 'InProgress':
    //       return 'dashboard-inprogress-cell';
    //     case 'TargetMet':
    //       return 'dashboard-targetmet-cell';
    //     case 'TargetMissed':
    //       return 'dashboard-targetmissed-cell';
    //     case 'Escalated':
    //       return 'dashboard-escalated-cell';
    //     case 'Complete':
    //       return 'dashboard-complete-cell';
    //     default:
    //       return '';
    //   }
    // };
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
        updateChart(data, title);
    }, [data,title]);

    return <canvas ref={chartRef}></canvas>;
}

export default DashboardBarChart;
