import React from 'react';
import './styles.css';

function PathwaysTable({ data, onPathwayHover }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.map((pwy) => (
              <th
                key={pwy.Text}
                onClick={() => onPathwayHover(pwy.Value)}
                className="hover-cell"
              >
                {pwy.Text}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PathwaysTable;
