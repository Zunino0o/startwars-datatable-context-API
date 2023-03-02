import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

import FiltersHeader from './components/FiltersHeader';
import Table from './components/Table';

import PlanetsContext from './context/PlanetsContext';

function App() {
  const { loading, data } = useFetch('https://swapi.dev/api/planets');
  // console.log(data);

  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [headerFilter, setHeaderFilter] = useState([]);

  const handleChange = ({ target }) => {
    switch (target.className) {
    case 'column-filter':
      return setColumnFilter(target.value);
    case 'comparison-filter':
      return setComparisonFilter(target.value);
    case 'value-filter':
      return setValueFilter(target.value);
    default:
      setNameFilter(target.value);
    }
  };

  const handleHeaderFilter = () => {
    setHeaderFilter([...headerFilter, { columnFilter, comparisonFilter, valueFilter }]);
  };

  const context = {
    data,
    nameFilter,
    valueFilter,
    headerFilter,
    handleHeaderFilter,
    handleChange,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      <main>
        <FiltersHeader />
        {
          headerFilter.length > 0
            ? headerFilter.map((h) => (
              <span
                key={ h.columnFilter }
              >
                { h.columnFilter }
                { h.comparisonFilter }
                { h.valueFilter }
              </span>
            ))
            : ''
        }
        { loading && <h1>Carregando...</h1> }
        {
          data.length > 0 && (
            <Table />
          )
        }
      </main>
    </PlanetsContext.Provider>
  );
}

export default App;
