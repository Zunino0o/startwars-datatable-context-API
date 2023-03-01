import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

export default function FiltersHeader() {
  const { handleChange } = useContext(PlanetsContext);

  return (
    <input
      type="text"
      placeholder="Filtrar por nome"
      data-testid="name-filter"
      onChange={ handleChange }
    />
  );
}
