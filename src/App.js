import React, { useState, useEffect } from 'react';
import './App.css';
import WorkflowTable from './WorkflowTable';
import DashboardBarChart from './DashboardBarChart'; 

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workflowscnt, setWorkflowCnt] = useState({});
  const [dashboarddata, setDashboardData] = useState({});
  const [wfdata, setWfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchWfsCnt = async () => {
    try {
      const wfsCntresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows/count?user=dashboard&org=icb&role=admin`);
      if (!wfsCntresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const wfsCntresult = await wfsCntresponse.json();
      setWorkflowCnt(wfsCntresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  const fetchDashboardData = async () => {
    setCurrentTime(new Date());
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
    const intervalId1 = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(intervalId1);
  }, []);
  useEffect(() => {
    fetchWfData();
    const intervalId2 = setInterval(fetchWfData, 30000);
    return () => clearInterval(intervalId2);
  }, []);
  useEffect(() => {
    fetchWfsCnt();
    const intervalId3 = setInterval(fetchWfsCnt, 30000);
    return () => clearInterval(intervalId3);
  }, []);

  return (
    <div className="App">
      <h1>Workflows Dashboard</h1>
      <h2>Last Update {currentTime.toLocaleTimeString()}</h2>
      {loading ? (
        <p>Loading Data............</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        <div className='chart-container'>
                <DashboardBarChart data={dashboarddata} />
        </div>
        <div className='chart-container'>
          <DashboardBarChart data={workflowscnt} />
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
