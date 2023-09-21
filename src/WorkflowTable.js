import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';

function WorkflowTable({ data }) {
  
  const columns = useMemo(
    () => [
      {
        Header: 'Pathway',
        accessor: 'pathway',
      },
      {
        Header: 'NHS ID',
        accessor: 'nhsid',
      },
      {
        Header: 'Version',
        accessor: 'version',
      },
      {
        Header: 'Created By',
        accessor: 'createdby',
      },
      {
        Header: 'Status',
        accessor: 'status',
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
        Header: 'Target Met',
        accessor: 'targetmet',
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
        sortBy: [{ id: 'status', desc: true }],
      },
    },
    useSortBy
  );
  
  return (
    <div>
      <table {...getTableProps()} style={{
        borderCollapse: 'collapse',
        width: '98%',
        margin: '10px',
        fontSize: '12px',
      }}>
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td className="table-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowTable;
