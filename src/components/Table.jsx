import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { data, nameFilter } = useContext(PlanetsContext);
  const keys = Object.keys(data[0]);
  // .filter((rmv) => rmv !== 'residents');
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          {keys.map((k) => <th key={ k }>{k}</th>)}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((fil) => fil.name.includes(nameFilter))
          .map((d) => (
            <tr key={ d.name }>
              { keys.map((ke) => <td key={ d[ke] }>{d[ke]}</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

// Table.propTypes = {
//   data: PropTypes.shape(
//     PropTypes.shape({
//       name: PropTypes.string,
//       rotation_period: PropTypes.string,
//       orbital_period: PropTypes.string,
//       diameter: PropTypes.string,
//       climate: PropTypes.string,
//       gravity: PropTypes.string,
//       terrain: PropTypes.string,
//       surface_water: PropTypes.string,
//       population: PropTypes.string,
//       films: PropTypes.arrayOf('string'),
//       created: PropTypes.string,
//       edited: PropTypes.string,
//       url: PropTypes.string,
//     }),
//   ).isRequired,

// };
