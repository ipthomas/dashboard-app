import React, { useState, useEffect } from 'react';
import './App.css';
import WorkflowTable from './WorkflowTable';
import DashboardChart from './DashboardChart'; 

function App() {
  const [dashboarddata, setDashboardData] = useState({});
  const [wfdata, setWfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDashboardData = async () => {
    try {
      const dashboardresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=sytem&org=icb&role=broker`);
      if (!dashboardresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const dashboardresult = await dashboardresponse.json();
      setDashboardData(dashboardresult);
      setLoading(false);
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
  useEffect(() => {   
    fetchDashboardData();
    fetchWfData();
  // eslint-disable-next-line
  }, []);

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
        <div>
          <DashboardChart data={dashboarddata}/>
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
