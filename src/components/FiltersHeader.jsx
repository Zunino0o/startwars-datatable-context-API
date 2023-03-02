import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

export default function FiltersHeader() {
  const {
    handleChange,
    valueFilter,
    handleHeaderFilter,
    columns,
  } = useContext(PlanetsContext);

  return (
    <form>
      <input
        type="text"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <br />
      <select
        className="column-filter"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {
          columns.map((c) => (
            <option key={ c } value={ c }>{c}</option>
          ))
        }
      </select>
      <select
        className="comparison-filter"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que" selected>maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        className="value-filter"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ valueFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleHeaderFilter }
      >
        FILTRAR
      </button>
    </form>
  );
}
