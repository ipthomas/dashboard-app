import React from 'react';
import './styles.css';

function PathwaysTable({ data, onPathwayHover }) {
  return (
    <div>
      <table>
        <tbody>
          {data.map((pwy) => (
            <td
              key={pwy.Text}
              onClick={() => onPathwayHover(pwy.Value)}
              className="hover-cell" // Add a CSS class for hover effect
            >
              {pwy.Text}
            </td>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PathwaysTable;
