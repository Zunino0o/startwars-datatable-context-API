import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    data,
    nameFilter,
    headerFilter,
  } = useContext(PlanetsContext);

  const keys = Object.keys(data[0]);

  const filtFunc = (el) => {
    const bool = headerFilter
      .map((f) => {
        switch (f.comparisonFilter) {
        case 'maior que':
          return Number(el[f.columnFilter]) > Number(f.valueFilter);
        case 'menor que':
          return Number(el[f.columnFilter]) < Number(f.valueFilter);
        case 'igual a':
          return Number(el[f.columnFilter]) === Number(f.valueFilter);
        default:
          return true;
        }
      });
    // console.log(bool);
    return bool.every((b) => b);
  };
  //   console.log(filtFunc(data));

  return (
    <table>
      <thead>
        <tr>
          {keys.map((k) => <th key={ k }>{k}</th>)}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((fil) => fil.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .filter((elm) => filtFunc(elm))
        //   .forEach((log) => console.log(log))
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
