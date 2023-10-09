import './styles.css';

function PathwaysTable({ data, onPathwayHover }) {
  
  
  return (
    <div>
      <table>
        <tbody>
          {data.map((pwy) => (
            <>
              <td onMouseEnter={() => onPathwayHover(pwy.Value)}>{pwy.Text}</td>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PathwaysTable;
