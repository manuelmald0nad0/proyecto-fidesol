import React, { useState } from 'react';

const Filters = ({ onFilter, languages }) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [minPop, setMinPop] = useState('');
  const [maxPop, setMaxPop] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      name,
      region,
      minPop: parseInt(minPop) || 0,
      maxPop: parseInt(maxPop) || Number.MAX_SAFE_INTEGER,
      language,
    });
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del país"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">Continente</option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>
      <input
        type="number"
        placeholder="Población mín"
        value={minPop}
        onChange={(e) => setMinPop(e.target.value)}
      />
      <input
        type="number"
        placeholder="Población máx"
        value={maxPop}
        onChange={(e) => setMaxPop(e.target.value)}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">Idioma</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Filters;
