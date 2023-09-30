import React, { useState, useEffect } from 'react';
import './App.css';
import WorkflowTable from './WorkflowTable';
import DashboardBarChart from './DashboardBarChart'; 
import { FaEye } from 'react-icons/fa';
import DefinitionModal from './DefinitionModal';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [allWorkflowsCount, setAllWorkflowsCount] = useState({});
  const [workflowsData, setWorkflowsData] = useState({});
  const [lacPathwaysData, setLacPathwaysData] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [openWorkflowsData, setOpenWorkflowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchWorkflowsData = async () => {
    setCurrentTime(new Date());
    try {
      const workflowsresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=workflow&org=icb&role=broker`);
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
      const workflowsCountResponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/workflows/count?user=workflow&org=icb&role=broker`);
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
  
  const fetchLacPathwaysData = async () => {
    try {
      const lacpathwaysresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/dashboard?user=workflow&org=icb&role=broker&pathway=lac`);
      if (!lacpathwaysresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const lacpathwaysresult = await lacpathwaysresponse.json();
      setLacPathwaysData(lacpathwaysresult);
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

  const fetchPathways = async () => {
    try {
      const pwyresponse = await fetch(`https://fwa7l2kp71.execute-api.eu-west-1.amazonaws.com/beta/api/state/pathways?user=workflow&org=icb&role=broker`);
      if (!pwyresponse.ok) {
        throw new Error('Network response was not ok');
      }
      const pwyresult = await pwyresponse.json();
      setPathways(pwyresult);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchPathways();
    const intervalId1 = setInterval(fetchPathways, 30000);
    return () => clearInterval(intervalId1);
  }, []);
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
    const fetchLacDataWithInterval = () => {
      fetchLacPathwaysData();
    };
    fetchLacDataWithInterval();
    const intervalId4 = setInterval(fetchLacDataWithInterval, 30000);
    return () => clearInterval(intervalId4);
  }, []);
  const [modalPathway, setModalPathway] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDefModal = (pathway) => {
    setModalPathway(pathway);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <h2>Workflows Dashboard      </h2>
      <h4>Last Update {currentTime.toLocaleTimeString()}</h4>
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
          <DashboardBarChart data={lacPathwaysData} title='LAC Workflows' />
        </div>
        <div>
          <WorkflowTable data={openWorkflowsData} />
        </div>
        <div>
          <h5>Defined Pathways</h5>
          <table>
            <tbody>
              <tr>
                {pathways.map((pathway) => (
                  <>
                    <td className='escalated-false'><span onMouseEnter={() => handleOpenDefModal(pathway)}><FaEye /></span> {pathway.Value}</td>
                  </>
                ))}
              </tr>
              <tr>
                {pathways.map((pathway) => (
                  <td>{pathway.Text}</td>
                ))}
              </tr>
            </tbody>
          </table>
          {isModalOpen && (
            <DefinitionModal pathway={modalPathway} onClose={closeModal} />
          )}
        </div>
        </>
      )}
    </div>
  );
}

export default App;
