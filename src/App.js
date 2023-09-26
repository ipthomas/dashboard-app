import React, { useState, useEffect } from 'react';
import './App.css';
import WorkflowTable from './WorkflowTable';
import DashboardBarChart from './DashboardBarChart'; 

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [allWorkflowsCount, setAllWorkflowsCount] = useState({});
  const [workflowsData, setWorkflowsData] = useState({});
  const [pathwaysData, setPathwaysData] = useState({});
  const [openWorkflowsData, setOpenWorkflowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchWorkflowsData = async () => {
    setCurrentTime(new Date());
    try {
      const workflowsresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=sytem&org=icb&role=broker`);
      if (!workflowsresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const workflowsresult = await workflowsresponse.json();
      setWorkflowsData(workflowsresult);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  const fetchAllWorkflowsCount = async () => {
    try {
      const workflowsCountResponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows/count?user=dashboard&org=icb&role=admin`);
      if (!workflowsCountResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const workflowsCountResult = await workflowsCountResponse.json();
      setAllWorkflowsCount(workflowsCountResult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchPathwaysData = async (pathway) => {
    setCurrentTime(new Date());
    try {
      const pathwaysresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=sytem&org=icb&role=broker&pathway=${pathway}`);
      if (!pathwaysresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const pathwaysresult = await pathwaysresponse.json();
      setPathwaysData(pathwaysresult);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchOpenWorkflowsData = async () => {
    try {
      const wfresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows?user=ian.thomas&org=tiani-spirit&role=clinician&status=OPEN`);
      if (!wfresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const wfresult = await wfresponse.json();
      setOpenWorkflowsData(wfresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchWorkflowsData();
    const intervalId1 = setInterval(fetchWorkflowsData, 30000);
    return () => clearInterval(intervalId1);
  }, []);
  
  useEffect(() => {
    fetchOpenWorkflowsData();
    const intervalId2 = setInterval(fetchOpenWorkflowsData, 30000);
    return () => clearInterval(intervalId2);
  }, []);
  
  useEffect(() => {
    fetchAllWorkflowsCount();
    const intervalId3 = setInterval(fetchAllWorkflowsCount, 30000);
    return () => clearInterval(intervalId3);
  }, []);

  useEffect(() => {
  const fetchDataWithInterval = () => {
    fetchPathwaysData('lac'); // Fetch data with the 'lac' pathway
  };
  fetchDataWithInterval(); // Fetch data initially
  const intervalId4 = setInterval(fetchDataWithInterval, 30000);
  return () => clearInterval(intervalId4);
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
          <DashboardBarChart data={workflowsData} title='ICB Workflows'/>
        </div>
        <div className='chart-container'>
          <DashboardBarChart data={allWorkflowsCount} title='ICB Pathway Counts' />
        </div>
        <div className='chart-container'>
          <DashboardBarChart data={pathwaysData} title='LAC Workflows' />
        </div>
        <div>
          <WorkflowTable data={openWorkflowsData} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
