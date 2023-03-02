import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

import FiltersHeader from './components/FiltersHeader';
import Table from './components/Table';

import PlanetsContext from './context/PlanetsContext';

function App() {
  const { loading, data } = useFetch('https://swapi.dev/api/planets');
  // console.log(data);

  const ALL_COLUMNS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columns, setColumns] = useState(ALL_COLUMNS);

  const [nameFilter, setNameFilter] = useState('');

  const [columnFilter, setColumnFilter] = useState(columns[0]);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [headerFilter, setHeaderFilter] = useState([]);

  const [columnSort, setColumnSort] = useState('population');
  const [columnSortInput, setColumnSortInput] = useState('');
  const [sort, setSort] = useState(false);

  const handleChange = ({ target }) => {
    switch (target.className) {
    case 'column-filter':
      return setColumnFilter(target.value);
    case 'comparison-filter':
      return setComparisonFilter(target.value);
    case 'value-filter':
      return setValueFilter(target.value);
    case 'column-sort':
      return setColumnSort(target.value);
    case 'column-sort-input-asc':
      return setColumnSortInput(target.value);
    case 'column-sort-input-desc':
      return setColumnSortInput(target.value);
    default:
      setNameFilter(target.value);
    }
  };

  const handleHeaderFilter = () => {
    setHeaderFilter([...headerFilter, { columnFilter, comparisonFilter, valueFilter }]);
    setColumns(columns.filter((c) => c !== columnFilter));
    setColumnFilter(columns[0]);
    setComparisonFilter('maior que');
    setValueFilter(0);
  };

  const deleteFilters = (cF) => {
    setHeaderFilter(headerFilter.filter((h) => h.columnFilter !== cF));
    setColumns([...columns, cF]);
  };

  const clearFilters = () => {
    setHeaderFilter([]);
    setColumns(ALL_COLUMNS);
  };

  const handleSort = () => {
    setSort({ order: { column: columnSort, sort: columnSortInput } });
    console.log(Number(data[0].climate));
  };

  const context = {
    data,
    columns,
    nameFilter,
    valueFilter,
    headerFilter,
    handleHeaderFilter,
    handleChange,
    clearFilters,
    sort,
    handleSort,
    ALL_COLUMNS,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      <main>
        <FiltersHeader />
        {
          headerFilter.length > 0
            ? headerFilter.map((h) => (
              <div key={ h.columnFilter } data-testid="filter">
                <span>
                  { h.columnFilter }
                  { h.comparisonFilter }
                  { h.valueFilter }
                </span>
                <button
                  type="button"
                  onClick={ () => deleteFilters(h.columnFilter) }
                >
                  X
                </button>
              </div>
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
