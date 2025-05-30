const allBtn = document.getElementById('allBtn');
const continentSelect = document.getElementById('continentSelect');
const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const results = document.getElementById('results');
const minPop = document.getElementById('minPop');
const maxPop = document.getElementById('maxPop');
const languageSelect = document.getElementById('languageSelect');

const API_BASE = 'https://restcountries.com/v3.1';

function showCountries(data) {
  results.innerHTML = '';
  data.forEach(country => {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" width="100">
      <p><strong>Región:</strong> ${country.region}</p>
      <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    `;
    results.appendChild(card);
  });
}

function loadLanguages() {
  fetch(`${API_BASE}/all`)
    .then(res => res.json())
    .then(data => {
      const languageSet = new Set();
      data.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(lang => languageSet.add(lang));
        }
      });

      const sortedLanguages = [...languageSet].sort();
      sortedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        languageSelect.appendChild(option);
      });
    });
}

loadLanguages();

allBtn.addEventListener('click', () => {
  fetch(`${API_BASE}/all`)
    .then(res => res.json())
    .then(data => showCountries(data))
    .catch(err => console.error('Error al obtener todos los países:', err));
});

searchBtn.addEventListener('click', () => {
  const name = countryInput.value.trim().toLowerCase();
  const region = continentSelect.value;
  const min = parseInt(minPop.value) || 0;
  const max = parseInt(maxPop.value) || Number.MAX_SAFE_INTEGER;
  const language = languageSelect.value;

  fetch(`${API_BASE}/all`)
    .then(res => res.json())
    .then(data => {
      let filtered = data;

      if (name) {
        filtered = filtered.filter(c =>
          c.name.common.toLowerCase().includes(name)
        );
      }

      if (region) {
        filtered = filtered.filter(c => c.region === region);
      }

      filtered = filtered.filter(c => c.population >= min && c.population <= max);

      if (language) {
        filtered = filtered.filter(c => {
          if (!c.languages) return false;
          return Object.values(c.languages).includes(language);
        });
      }

      if (filtered.length === 0) {
        results.innerHTML = `<p>No se encontraron países con los filtros aplicados.</p>`;
      } else {
        showCountries(filtered);
      }
    })
    .catch(err => {
      results.innerHTML = `<p>Error al buscar países.</p>`;
      console.error(err);
    });
});

[minPop, maxPop, continentSelect, languageSelect].forEach(el => {
  el.addEventListener('change', () => {
    searchBtn.click();
  });
});

