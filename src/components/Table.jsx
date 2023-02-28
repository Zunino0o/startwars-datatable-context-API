import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ data }) {
  const keys = Object.keys(data[0]);
  // .filter((rmv) => rmv !== 'residents');
  console.log(data);
  return (
    <table>
      <tr>
        {keys.map((k) => <th key={ k }>{k}</th>)}
      </tr>
      {data.map((d) => (
        <tr key={ d }>
          { keys.map((ke) => <th key={ d[ke] }>{d[ke]}</th>)}

        </tr>
      ))}
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.shape(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      population: PropTypes.string,
      films: PropTypes.arrayOf('string'),
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,

};
