import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import WorkflowsTable from './WorkflowsTable';
import ClosedWorkflowsTable from './ClosedWorkflowsTable';
import DashboardBarChart from './DashboardBarChart';
import PathwaysTable from './PathwaysTable';
import logo from './eput-logo.jpeg';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [icbWorkflowCounts, setIcbWorkflowCounts] = useState({});
  const [icbWorkflows, setIcbWorkflows] = useState({});
  const [dashboardData, setDashboardData] = useState([]);
  const [openWorkflowsData, setOpenWorkflowsData] = useState([]);
  const [closedWorkflowsData, setClosedWorkflowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPathway, setSelectedPathway] = useState("plac");
  const [pathways, setPathways] = useState([])
  const [refreshRate, setRefreshRate] = useState(3600000);
  const [qotd, setQotd] = useState()
  // const serverUrl = 'http://localhost:8080/'
  const serverUrl = 'https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/'
  
  const fetchicbWorkflows = async () => {
    setCurrentTime(new Date());
    try {
      const workflowsresponse = await fetch(serverUrl + `api/state/dashboard?user=workflow&org=icb&role=broker`);
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
      const workflowsCountResponse = await fetch(serverUrl + `api/state/workflows/count?user=workflow&org=icb&role=broker`);
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
      const pathwaysResponse = await fetch(serverUrl + `api/state/pathways?user=workflow&org=icb&role=broker`);
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
  const fetchDashboardData = useCallback(async (selectedPathway) => {
    try {
      const dashboardresponse = await fetch(serverUrl +`api/state/dashboard?user=workflow&org=icb&role=broker&pathway=${selectedPathway}`);
      if (!dashboardresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const dashboardresult = await dashboardresponse.json();
      setDashboardData(dashboardresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  }, []);
  const fetchClosedWorkflowsData = useCallback(async (selectedPathway) => {
    try {
      const wfresponse = await fetch(serverUrl +`api/state/workflows?user=workflow&org=icb&role=broker&status=CLOSED&pathway=${selectedPathway}`);
      if (!wfresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const wfresult = await wfresponse.json();
      setClosedWorkflowsData(wfresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  },[]);
  const fetchOpenWorkflowsData = useCallback(async (selectedPathway) => {
    try {
      const wfresponse = await fetch(serverUrl +`api/state/workflows?user=workflow&org=icb&role=broker&status=OPEN&pathway=${selectedPathway}`);
      if (!wfresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const wfresult = await wfresponse.json();
      setOpenWorkflowsData(wfresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  }, []);
  const handlePathwayHover = (selectedPathway) => {
    setSelectedPathway(selectedPathway);
  };
  useEffect(() => {
    fetchicbWorkflows();
    const intervalId1 = setInterval(fetchicbWorkflows, refreshRate);
    return () => clearInterval(intervalId1);
  }, [refreshRate]);
  useEffect(() => {
    fetchPathways();
    const intervalId2 = setInterval(fetchPathways, refreshRate);
    return () => clearInterval(intervalId2);
  }, [refreshRate]);
  useEffect(() => {
    const fetchOpenWorkflowsDataWithInterval = () => {
      fetchOpenWorkflowsData(selectedPathway);
    };
    fetchOpenWorkflowsDataWithInterval();
    const intervalId4 = setInterval(fetchOpenWorkflowsDataWithInterval, refreshRate);
    return () => clearInterval(intervalId4);
  }, [fetchOpenWorkflowsData, selectedPathway, refreshRate]);
  useEffect(() => {
    const fetchClosedWorkflowsDataWithInterval = () => {
      fetchClosedWorkflowsData(selectedPathway);
    };
    fetchClosedWorkflowsDataWithInterval();
    const intervalId4 = setInterval(fetchClosedWorkflowsDataWithInterval, refreshRate);
    return () => clearInterval(intervalId4);
  }, [fetchClosedWorkflowsData, selectedPathway, refreshRate]);

  useEffect(() => {
    fetchicbWorkflowCounts();
    const intervalId5 = setInterval(fetchicbWorkflowCounts, refreshRate);
    return () => clearInterval(intervalId5);
  }, [refreshRate]);

  useEffect(() => {
    const fetchDashboardDataWithInterval = () => {
      fetchDashboardData(selectedPathway);
    };
    fetchDashboardDataWithInterval();
    const intervalId4 = setInterval(fetchDashboardDataWithInterval, refreshRate);
    return () => clearInterval(intervalId4);
  }, [fetchDashboardData, selectedPathway,refreshRate]);
  const quoteOfTheDay = async () => {
    try {
      const qotdResponse = await fetch('https://zenquotes.io/api/random');
      if (!qotdResponse.ok) {
        throw new Error('Network response was not ok');
      }
      setQotd(qotdResponse);
      alert(qotd.q)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
  return (
    <div className="App">
      <h1>
        <img src={logo} alt="Logo" className="logo" onClick={quoteOfTheDay}/>
      Workflows Dashboard
      </h1>
      <div className="refresh-rate-container">
        <span>Refresh Rate </span>
        <select
          name='refreshrate'
          value={refreshRate}
          onChange={(e) => setRefreshRate(e.target.value)}
          className="refresh-rate-input"
        >
          <option value="10000">10 seconds</option>
          <option value="30000">30 seconds</option>
          <option value="60000">1 minute</option>
          <option value="300000">5 minutes</option>
          <option value="600000">10 minutes</option>
          <option value="1800000">30 minutes</option>
          <option value="3600000">1 hour</option>
        </select>
      </div>
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
        {icbWorkflows !== null ? 
          (
          <div className='chart-container'> 
            <DashboardBarChart data={icbWorkflows} title='ICB Workflows'/>         
          </div>
          ) : 
          <div>
            <p>No ICB Workflows</p>
          </div>
        }
        <div className='chart-container'>
          <DashboardBarChart data={icbWorkflowCounts} title='ICB Workflow Counts'/>
        </div>
        {dashboardData !==null ?
          (
          <div className='chart-container'>
            <DashboardBarChart data={dashboardData} title={selectedPathway.toUpperCase() + ' Workflows'}/>
          </div>
          ) :
          <div>
              <p>No {selectedPathway} Workflows</p>
          </div>
        }
        {openWorkflowsData !== null ?
          (
            <div>
              <WorkflowsTable data={openWorkflowsData} titlePrefix={'In Progress'} serverUrl={serverUrl}/>
            </div>
          ) :
          <div>
            <p>No Open Workflows</p>
          </div>
        }
        {closedWorkflowsData !== null ?
          (
          <div>
            <ClosedWorkflowsTable data={closedWorkflowsData} serverUrl={serverUrl} />
          </div>
          ) :
          <div>
            <p>No Closed Workflows</p>
          </div>
        }
        </>
      )}
    </div>
  );
}

export default App;
