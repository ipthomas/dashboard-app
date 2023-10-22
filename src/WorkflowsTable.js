import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';
import TasksModal from './TasksModal';
import EventsModal from './EventsModal';
import PatientModal from './PatientModal';
import DefinitionModel from './DefinitionModal';
import { FaEye } from 'react-icons/fa';

function WorkflowsTable({ data, titlePrefix, serverUrl }) {
  const [tasksModalPathway, setTasksModalPathway] = useState(null);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [tasksModalNhs, setTasksModalNhs] = useState(null);
  const [tasksModalVersion, setTasksModalVersion] = useState(null);
  const [eventsModalPathway, setEventsModalPathway] = useState(null);
  const [definitionModalPathway, setDefinitionModalPathway] = useState(null);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [eventsModalNhs, setEventsModalNhs] = useState(null);
  const [eventsModalVer, setEventsModalVer] = useState(null);
  const [patientModalNhs, setPatientModalNhs] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isDefinitionModalOpen, setIsDefinitionModalOpen] = useState(false);
  
  const formatToLocalUKTime = (dateString) => {
    if (dateString === "" || dateString === "0001-01-01 00:00:00 +0000 UTC") {
      return ""; // Return an empty string
    }

    try {
      const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+\-\d]{5}) (.+)/;
      const match = dateString.match(regex);

      if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];
        const second = match[6];
        
        const date = new Date(year, month - 1, day, hour, minute, second);
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()];
        const monthName = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);

        const formattedDate = `${hour}:${minute}:${second} ${dayOfWeek} ${day} ${monthName} ${year}`;
        return formattedDate;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
    }

    return "";
  };

  const handleOpenTasksModal = (pathway, nhs, version) => {
    setTasksModalPathway(pathway);
    setTasksModalNhs(nhs)
    setTasksModalVersion(version)
    setIsTasksModalOpen(true);
  };
  const handleOpenPatientModal = (nhs) => {
    setPatientModalNhs(nhs)
    setIsPatientModalOpen(true);
  };
  const handleOpenEventsModal = (pathway, nhs, version) => {
    setEventsModalPathway(pathway);
    setEventsModalNhs(nhs)
    setEventsModalVer(version)
    setIsEventsModalOpen(true);
  };
  const handleOpenDefinitionModal = (pathway) => {
    setDefinitionModalPathway(pathway);
    setIsDefinitionModalOpen(true);
  };
  const closeTasksModal = () => {
    setIsTasksModalOpen(false);
  };
  const closeEventsModal = () => {
    setIsEventsModalOpen(false);
  };
  const closePatientModal = () => {
    setIsPatientModalOpen(false);
  };
  const closeDefinitionModal = () => {
    setIsDefinitionModalOpen(false);
  };
  
  const columns = useMemo(() => [
      {
        Header: 'Tasks',
        accessor: 'version',
        Cell: ({ row }) => (
          <span onClick={() => handleOpenTasksModal(row.values.pathway, row.values.nhsid, row.values.version)}><FaEye /></span>
        ),
      },
      {
        Header: 'Definition',
        accessor: 'pathway',
        Cell: ({ row }) => (
          <span onClick={() => handleOpenDefinitionModal(row.values.pathway)}><FaEye /></span>
        ),
      },
      {
        Header: 'Events',
        accessor: 'ver',
        Cell: ({ row }) => (
          <span onClick={() => handleOpenEventsModal(row.values.pathway, row.values.nhsid, row.values.version)}><FaEye /></span>
        ),
      },
      {
        Header: 'Patient',
        accessor: 'patientdetails',
        Cell: ({ row }) => (
          <span onClick={() => handleOpenPatientModal(row.values.nhsid)}><FaEye /></span>
        ),
      },
      {
        Header: 'NHS ID',
        accessor: 'nhsid',
      },
      {
        Header: 'Overdue',
        accessor: 'overdue',
      },
      {
        Header: 'Escalated',
        accessor: 'escalated',
      },
      {
        Header: 'Owner',
        accessor: 'owner',
      },
      {
        Header: 'Created',
        accessor: 'created',
        Cell: ({ row }) => (
          formatToLocalUKTime(row.values.created)
        ),
      },
      {
        Header: 'Updated',
        accessor: 'lastupdate',
        Cell: ({ row }) => (
          formatToLocalUKTime(row.values.lastupdate)
        ),
      },
      {
        Header: 'Time Remaining',
        accessor: 'timeremaining',
      },
      { Header: 'Complete By',
        accessor: 'completeby',
        Cell: ({ row }) => (
          formatToLocalUKTime(row.values.completeby)
        ),
      },
      {
        Header: 'Duration',
        accessor: 'duration',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: 'timeremaining', desc: false }],
      },
    },
    useSortBy
  );
  
  return (
    <div>
      <h5>{titlePrefix} Workflows</h5>
      {data.length === 0 ? (
        <p>No {titlePrefix} Workflows Available</p>
      ) : (
        <table
          {...getTableProps()}
          style={{
            borderCollapse: 'collapse',
            fontSize: 'small',
            fontFamily: 'Open Sans',
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className='table' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const escalatedValue = row.values.escalated;
              const overdueValue = row.values.overdue;
              const rowClassName = overdueValue === 'FALSE' ? 'escalated-false' : escalatedValue === 'FALSE' ? 'overdue-true' : 'escalated-true';
              return (
                <tr {...row.getRowProps()} className={rowClassName}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isTasksModalOpen && (
        <TasksModal pathway={tasksModalPathway} nhs={tasksModalNhs} version={tasksModalVersion} onClose={closeTasksModal} serverUrl={serverUrl}/>
      )}
      {isEventsModalOpen && (
        <EventsModal pathway={eventsModalPathway} nhs={eventsModalNhs} version={eventsModalVer} onClose={closeEventsModal} serverUrl={serverUrl} />
      )}
      {isPatientModalOpen && (
        <PatientModal nhs={patientModalNhs} onClose={closePatientModal} serverUrl={serverUrl}/>
      )}
      {isDefinitionModalOpen && (
        <DefinitionModel pathway={definitionModalPathway} onClose={closeDefinitionModal} serverUrl={serverUrl} />
      )}
    </div>
  );
}

export default WorkflowsTable;
