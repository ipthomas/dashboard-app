import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';
import TasksModal from './TasksModal';
import EventsModal from './EventsModal';
import { FaEye } from 'react-icons/fa';

function WorkflowTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Tasks',
        accessor: 'taskdetails',
        Cell: ({ row }) => (
          <span onMouseEnter={() => handleOpenTasksModal(row.values.pathway, row.values.nhsid)}><FaEye /></span>
        ),
      },
      {
        Header: 'Pathway',
        accessor: 'pathway',
      },
      {
        Header: 'NHS ID',
        accessor: 'nhsid',
      },
      {
        Header: 'Due Date',
        accessor: 'completeby',
      },
      {
        Header: 'Updated',
        accessor: 'lastupdate',
      },
      {
        Header: 'Owner',
        accessor: 'owner',
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
        Header: 'Duration',
        accessor: 'duration',
      },
      {
        Header: 'Time Remaining',
        accessor: 'timeremaining',
      },
      {
        Header: 'Events',
        accessor: 'eventdetails',
        Cell: ({ row }) => (
          <span onMouseEnter={() => handleOpenEventsModal(row.values.pathway, row.values.nhsid)}><FaEye /></span>
        ),
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
  
  const [tasksModalPathway, setTasksModalPathway] = useState(null);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [tasksModalNhs, setTasksModalNhs] = useState(null);
  const [eventsModalPathway, setEventsModalPathway] = useState(null);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [eventsModalNhs, setEventsModalNhs] = useState(null);

  const handleOpenTasksModal = (pathway,nhs) => {
    setTasksModalPathway(pathway);
    setTasksModalNhs(nhs)
    setIsTasksModalOpen(true);
  };
  const handleOpenEventsModal = (pathway, nhs) => {
    setEventsModalPathway(pathway);
    setEventsModalNhs(nhs)
    setIsEventsModalOpen(true);
  };
  const closeTasksModal = () => {
    setIsTasksModalOpen(false);
  };
  const closeEventsModal = () => {
    setIsEventsModalOpen(false);
  };
  return (
    <div>
      <h5>Open Workflows</h5>
      <
        table {...getTableProps()} style={{
          borderCollapse: 'collapse',
          fontSize: '14px',
          fontFamily: 'Open Sans'
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
            const rowClassName = overdueValue === 'FALSE' ? 'escalated-false': escalatedValue === 'FALSE' ? 'overdue-true':'escalated-true';
            return (
              <tr {...row.getRowProps()} className={rowClassName}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table
      >
      {isTasksModalOpen && (
        <TasksModal pathway={tasksModalPathway} nhs={tasksModalNhs} onClose={closeTasksModal}/>
      )}
      {isEventsModalOpen && (
        <EventsModal pathway={eventsModalPathway} nhs={eventsModalNhs} onClose={closeEventsModal} />
      )}
    </div>
  );
}

export default WorkflowTable;
