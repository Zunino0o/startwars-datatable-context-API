import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

import FiltersHeader from './components/FiltersHeader';
import Table from './components/Table';

import PlanetsContext from './context/PlanetsContext';

function App() {
  const { loading, data } = useFetch('https://swapi.dev/api/planets');
  // console.log(data);

  const [nameFilter, setNameFilter] = useState('');

  const handleChange = ({ target }) => {
    setNameFilter(target.value);
  };

  return (
    <PlanetsContext.Provider value={ { data, nameFilter, handleChange } }>
      <main>
        <FiltersHeader />
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
