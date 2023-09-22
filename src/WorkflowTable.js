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
        sortBy: [{ id: 'pathway', desc: false }],
      },
    },
    useSortBy
  );
  
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

            // Get the value of the "overdue" column
            const overdueValue = row.values.overdue;

            // Determine the class based on the value
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
      </table>
    </div>
  );
}

export default WorkflowTable;
