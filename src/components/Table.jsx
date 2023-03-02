import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    data,
    nameFilter,
    headerFilter,
    sort,
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
          .sort((a, b) => {
            if (sort) {
              const num1 = a[sort.order.column];
              const num2 = b[sort.order.column];
              const SORT1 = 1;
              const SORT_1 = -1;
              console.log(num1, num2);
              // check for num vs string
              if (num1 === 'unknown' || num2 === 'unknown') {
                if (num2 === 'unknown') {
                  return SORT_1;
                }
                // check for string vs num
                if (num1 === 'unknown') {
                  return SORT1;
                }
              }
              if (typeof num1 === 'number' && typeof num2 === 'number') {
                return a - b;
              }

              // switch (sort.order.sort) {
              // case 'ASC':
              //   return num1 - num2;
              // case 'DESC':
              //   return num2 - num1;
              // default:
              //   return true;
              // }
            }
            return a;
          })
          .sort((a, b) => {
            if (sort) {
              switch (sort.order.sort) {
              case 'ASC':
                return Number(a[sort.order.column]) - Number(b[sort.order.column]);
              case 'DESC':
                return Number(b[sort.order.column]) - Number(a[sort.order.column]);
              default:
                return true;
              }
            }
            return a;
          })
        //   .forEach((log) => console.log(log))
          .map((d) => (
            <tr key={ d.name }>
              { keys.map((ke) => (ke === 'name'
                ? <td data-testid="planet-name" key={ d[ke] }>{d[ke]}</td>
                : <td key={ d[ke] }>{d[ke]}</td>))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
