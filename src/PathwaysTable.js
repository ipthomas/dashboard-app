import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.css';

function PathwaysTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Pathway',
        accessor: 'Text',
      },
      {
        Header: 'Name',
        accessor: 'Value',
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
        sortBy: [{ id: 'Text', desc: false }],
      },
    },
    useSortBy
  );
  
  return (
    <div>
      <
        table {...getTableProps()} style={{
          borderCollapse: 'collapse',
          width: '30%',
          margin: '20px',
          fontSize: '14px',
          fontFamily: 'Open Sans'
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽 ' : ' 🔼 ') : ''}
                  </span>
                  {column.render('Header')}
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table
      >      
    </div>
  );
}

export default PathwaysTable;
