import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Chart from 'chart.js/auto';
import WorkflowTable from './WorkflowTable';

function App() {
  const [dashboarddata, setDashboardData] = useState({});
  const [wfdata, setWfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=sytem&org=icb&role=broker`);
        if (!dashboardresponse.ok) {
          throw new Error('Network response was not ok');
        }
        const dashboardresult = await dashboardresponse.json();
        setDashboardData(dashboardresult);
        setLoading(false);
        fetchWfData();
        updateChart(dashboardresult);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    const fetchWfData = async () => {
      try {
        const wfresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows?user=ian.thomas&org=tiani-spirit&role=clinician&status=OPEN`);
        if (!wfresponse.ok) {
          throw new Error('Network response was not ok');
        }
        const wfresult = await wfresponse.json();
        setWfData(wfresult);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };
    fetchDashboardData();

    
  }, []);

  
  const updateChart = (data) => {
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
    };

    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  };
  const getDashboardCellStyle = (category) => {
    switch (category) {
      case 'Total':
        return 'dashboard-total-cell';
      case 'InProgress':
        return 'dashboard-inprogress-cell';
      case 'TargetMet':
        return 'dashboard-targetmet-cell';
      case 'TargetMissed':
        return 'dashboard-targetmissed-cell';
      case 'Escalated':
        return 'dashboard-escalated-cell';
      case 'Complete':
        return 'dashboard-complete-cell';
      default:
        return '';
    }
  };

  return (
    <div className="App">
      <h1>Workflows Dashboard</h1>
      {loading ? (
        <p>Loading Data............</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        <div className='centered-row'>
          <table>
            <thead>
              <tr>
                {Object.keys(dashboarddata).map((category) => (
                  <th key={category}>{category}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(dashboarddata).map(([category, value]) => (
                  <td key={category} className={getDashboardCellStyle(category)}>
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className='centered-row'>
          <div className="chart-container">
                  <canvas ref={chartRef} width={1300} height={300}></canvas>
          </div>
        </div>
        <div>
            <WorkflowTable data={wfdata} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
