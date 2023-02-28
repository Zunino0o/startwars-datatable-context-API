import React from 'react';
import useFetch from './hooks/useFetch';

import FiltersHeader from './components/FiltersHeader';
import Table from './components/Table';

import PlanetsContext from './context/PlanetsContext';

function App() {
  const { loading, data } = useFetch('https://swapi.dev/api/planets');
  // console.log(data);

  return (
    <PlanetsContext.Provider value={ data }>
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
