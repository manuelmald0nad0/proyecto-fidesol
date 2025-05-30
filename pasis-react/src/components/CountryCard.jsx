import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <div className="card">
      <h3>{country.name.common}</h3>
      <img src={country.flags.svg} alt={`Bandera de ${country.name.common}`} />
      <p><strong>Región:</strong> {country.region}</p>
      <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
    </div>
  );
};

export default CountryCard;
