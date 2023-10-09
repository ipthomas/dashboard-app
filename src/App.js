import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import OpenWorkflowsTable from './OpenWorkflowsTable';
import ClosedWorkflowsTable from './ClosedWorkflowsTable';
import DashboardBarChart from './DashboardBarChart';
import PathwaysTable from './PathwaysTable';
import logo from './eput.jpeg';
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [icbWorkflowCounts, setIcbWorkflowCounts] = useState({});
  const [icbWorkflows, setIcbWorkflows] = useState({});
  const [pathwayWorkflows, setPathwayWorkflows] = useState([]);
  const [openWorkflowsData, setOpenWorkflowsData] = useState([]);
  const [closedWorkflowsData, setClosedWorkflowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPathway, setSelectedPathway] = useState("lac");
  const [pathways, setPathways] = useState([])

  const fetchicbWorkflows = async () => {
    setCurrentTime(new Date());
    try {
      const workflowsresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=workflow&org=icb&role=broker`);
      if (!workflowsresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const workflowsresult = await workflowsresponse.json();
      setIcbWorkflows(workflowsresult);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  const fetchicbWorkflowCounts = async () => {
    try {
      const workflowsCountResponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows/count?user=workflow&org=icb&role=broker`);
      if (!workflowsCountResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const workflowsCountResult = await workflowsCountResponse.json();
      setIcbWorkflowCounts(workflowsCountResult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  const fetchPathways = async () => {
    try {
      const pathwaysResponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/pathways?user=workflow&org=icb&role=broker`);
      if (!pathwaysResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const pathwaysResult = await pathwaysResponse.json();
      setPathways(pathwaysResult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  const fetchpathwayWorkflows = useCallback(async (selectedPathway) => {
    try {
      const pathwaysresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=workflow&org=icb&role=broker&pathway=${selectedPathway}`);
      if (!pathwaysresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const pathwaysresult = await pathwaysresponse.json();
      setPathwayWorkflows(pathwaysresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  }, []);
  const fetchClosedWorkflowsData = async () => {
    try {
      const wfresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows?user=workflow&org=icb&role=broker&status=CLOSED`);
      if (!wfresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const wfresult = await wfresponse.json();
      setClosedWorkflowsData(wfresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  const fetchOpenWorkflowsData = async () => {
    try {
      const wfresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows?user=workflow&org=icb&role=broker&status=OPEN`);
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
  const handlePathwayHover = (selectedPathway) => {
    setSelectedPathway(selectedPathway);
  };
  useEffect(() => {
    fetchicbWorkflows();
    const intervalId1 = setInterval(fetchicbWorkflows, 10000);
    return () => clearInterval(intervalId1);
  }, []);
  useEffect(() => {
    fetchPathways();
    const intervalId1 = setInterval(fetchPathways, 10000);
    return () => clearInterval(intervalId1);
  }, []);
  useEffect(() => {
    fetchOpenWorkflowsData();
    const intervalId2 = setInterval(fetchOpenWorkflowsData, 10000);
    return () => clearInterval(intervalId2);
  }, []);

  useEffect(() => {
    fetchClosedWorkflowsData();
    const intervalId2 = setInterval(fetchClosedWorkflowsData, 10000);
    return () => clearInterval(intervalId2);
  }, []);

  useEffect(() => {
    fetchicbWorkflowCounts();
    const intervalId3 = setInterval(fetchicbWorkflowCounts, 10000);
    return () => clearInterval(intervalId3);
  }, []);

  useEffect(() => {
    const fetchPathwayDataWithInterval = () => {
      fetchpathwayWorkflows(selectedPathway);
    };
    fetchPathwayDataWithInterval();
    const intervalId4 = setInterval(fetchPathwayDataWithInterval, 10000);
    return () => clearInterval(intervalId4);
  }, [fetchpathwayWorkflows, selectedPathway]);
  
  return (
    <div className="App">
      <h1>
        <img src={logo} alt="Logo" className="logo" />

      ICB Workflows Dashboard
      </h1>
      {loading ? (
        <p>Loading Data............</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        <div>
          <PathwaysTable data={pathways} onPathwayHover={handlePathwayHover} />
        </div>
        <h4>Last Update {currentTime.toLocaleTimeString()}</h4>
        <div className='chart-container'>
          <DashboardBarChart data={icbWorkflows} title='ICB Workflows'/>
        </div>
        <div className='chart-container'>
          <DashboardBarChart data={icbWorkflowCounts} title='ICB Workflow Counts'/>
        </div>      
        <div className='chart-container'>
          <DashboardBarChart data={pathwayWorkflows} title={selectedPathway.toUpperCase() + ' Workflows'}/>
        </div>
        <div>
          <OpenWorkflowsTable data={openWorkflowsData} />
        </div>
        <div>
          <ClosedWorkflowsTable data={closedWorkflowsData} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
