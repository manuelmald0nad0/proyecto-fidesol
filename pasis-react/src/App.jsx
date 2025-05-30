import React, { useEffect, useState } from 'react';
import Filters from './components/Filters';
import CountryList from './components/CountryList';

const API_BASE = 'https://restcountries.com/v3.1';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/all`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        extractLanguages(data);
      });
  }, []);

  const extractLanguages = (data) => {
    const langSet = new Set();
    data.forEach((c) => {
      if (c.languages) {
        Object.values(c.languages).forEach((l) => langSet.add(l));
      }
    });
    setLanguages([...langSet].sort());
  };

  const applyFilters = ({ name, region, minPop, maxPop, language }) => {
    let results = [...countries];

    if (name) {
      results = results.filter((c) =>
        c.name.common.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (region) {
      results = results.filter((c) => c.region === region);
    }
    if (minPop) {
      results = results.filter((c) => c.population >= minPop);
    }
    if (maxPop) {
      results = results.filter((c) => c.population <= maxPop);
    }
    if (language) {
      results = results.filter(
        (c) => c.languages && Object.values(c.languages).includes(language)
      );
    }

    setFilteredCountries(results);
  };

  return (
    <div className="container">
      <h1>Consulta de Países</h1>
      <Filters onFilter={applyFilters} languages={languages} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App;
