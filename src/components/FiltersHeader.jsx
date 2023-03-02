import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

export default function FiltersHeader() {
  const {
    handleChange,
    valueFilter,
    handleHeaderFilter,
    columns,
    clearFilters,
    handleSort,
    ALL_COLUMNS,
  } = useContext(PlanetsContext);

  return (
    <div>

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

        <br />

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ clearFilters }
        >
          RESET FILTERS
        </button>
      </form>
      <section>
        <label htmlFor="column-sort">Ordenar</label>
        <select
          id="column-sort"
          className="column-sort"
          data-testid="column-sort"
          onChange={ handleChange }
        >
          {
            ALL_COLUMNS.map((c) => (
              <option key={ c } value={ c }>{c}</option>
            ))
          }
        </select>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          className="column-sort-input-asc"
          name="sort"
          onClick={ handleChange }
        />
        <label
          htmlFor="ASC"
        >
          Ascendente
        </label>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="DESC"
          className="column-sort-input-desc"
          name="sort"
          onClick={ handleChange }
        />
        <label
          htmlFor="DESC"
        >
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          ORDENAR
        </button>
      </section>
    </div>
  );
}
