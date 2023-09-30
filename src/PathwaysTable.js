import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import './styles.css';
import { FaEye } from 'react-icons/fa';

function PathwaysTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Def',
        accessor: <FaEye />,
      },
      {
        Header: 'Pathway',
        accessor: 'Text',
      },
      {
        Header: 'Description',
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
    }
  );
  
  return (
    <div>
      <
        table {...getTableProps()} style={{
          borderCollapse: 'collapse',
          fontFamily: 'Open Sans'
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
              <tr key={task.taskid} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')} </td>          
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
