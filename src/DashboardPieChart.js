import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function DashboardPieChart({ data }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const updateChart = (data) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: 'ICB Workflows',
                    data: Object.values(data),
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'left',
                    },
                },
            },
        };

        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, chartOptions);
        }
    };

    useEffect(() => {
        updateChart(data);
    }, [data]);

    return <canvas ref={chartRef} style={{ width: '200px', height: '200px' }}></canvas>;
}

export default DashboardPieChart;
