import React from 'react';
import useFetch from './hooks/useFetch';
import Table from './components/Table';

function App() {
  const { loading, error, data } = useFetch('https://swapi.dev/api/planets');
  // console.log(data);
  if (error) {
    return (
      <main>
        <h1>Um erro inesperado aconteceu</h1>
      </main>
    );
  }

  return (
    <main>
      { loading && <h1>Carregando...</h1> }
      {
        data.length > 0 && (
          <Table data={ data } />
        )
      }
    </main>
  );
}

export default App;
