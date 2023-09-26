import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';
import TasksModal from './TasksModal';
import { FaEye } from 'react-icons/fa';

function WorkflowTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Tasks',
        accessor: 'details',
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
        sortBy: [{ id: 'overdue', desc: true }],
      },
    },
    useSortBy
  );
  
  const [modalPathway, setModalPathway] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNhs, setModalNhs] = useState(null);

  const handleOpenTasksModal = (pathway,nhs) => {
    setModalPathway(pathway);
    setModalNhs(nhs)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <
        table {...getTableProps()} style={{
          borderCollapse: 'collapse',
          width: '98%',
          margin: '10px',
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
            const overdueValue = row.values.overdue;
            const rowClassName = overdueValue === 'FALSE' ? 'overdue-false' : 'overdue-true';

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
      {isModalOpen && (
        <TasksModal pathway={modalPathway} nhs={modalNhs} onClose={closeModal} 

      />
      )}
      
    </div>
  );
}

export default WorkflowTable;
