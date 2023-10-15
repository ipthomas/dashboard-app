import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';
import TasksModal from './TasksModal';
import EventsModal from './EventsModal';
import PatientModal from './PatientModal';
import DefinitionModel from './DefinitionModal';
import { FaEye } from 'react-icons/fa';

function WorkflowsTable({ data, type }) {
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
        Header: 'Owner',
        accessor: 'owner',
      },
      {
        Header: 'Created',
        accessor: 'created',
      },
      {
        Header: 'Updated',
        accessor: 'lastupdate',
      },
      {
        Header: 'Due Date',
        accessor: 'completeby',
      },
      {
        Header: 'Time Remaining',
        accessor: 'timeremaining',
      },
      {
        Header: 'Overdue',
        accessor: 'overdue',
      },
      {
        Header: 'Escalated',
        accessor: 'escalated',
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
      <h5>{type} Workflows</h5>
      {data.length === 0 ? (
        <p>No {type} Workflows Available</p>
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
        <TasksModal pathway={tasksModalPathway} nhs={tasksModalNhs} version={tasksModalVersion} onClose={closeTasksModal} />
      )}
      {isEventsModalOpen && (
        <EventsModal pathway={eventsModalPathway} nhs={eventsModalNhs} version={eventsModalVer} onClose={closeEventsModal} />
      )}
      {isPatientModalOpen && (
        <PatientModal nhs={patientModalNhs} onClose={closePatientModal} />
      )}
      {isDefinitionModalOpen && (
        <DefinitionModel pathway={definitionModalPathway} onClose={closeDefinitionModal} />
      )}
    </div>
  );
}

export default WorkflowsTable;
