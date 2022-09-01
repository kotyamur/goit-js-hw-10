import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const notifyOptions = {
  timeout: 2500,
  width: '300px',
  clickToClose: true,
  position: 'center-top',
};

const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const renderContriesList = (countries) => {
    const markup = countries
      .map(country => {
        return `<li>
          <p>${country.flags.svg}</p>
          <p>${country.name.official}</p>
        </li>`;
      })
        .join('');
    countryListEl.innerHTML = markup;
}

const renderContriesInfo = countries => {
  const markup = countries
    .map(country => {
      return `
          <p><b>capital</b>: ${country.capital}</p>
          <p><b>population</b>: ${country.population}</p>
          <p><b>languages</b>: ${Object.values(country.languages).join(', ')}</p>
        `;
    })
    countryInfoEl.innerHTML = markup;
};

fetchCountries('cana')
    .then(countries => {
        console.log(countries)
        console.log(countries.length);
        if (countries.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.', notifyOptions
          );
          return;
        }
        renderContriesList(countries);
        renderContriesInfo(countries);
    })
  .catch(error => console.log(error));

const onSearchInput = (e) => {
    const searchCountry = e.target.value;
    console.log(searchCountry.trim());
    console.log(searchCountry.trim().length);
    if (searchCountry.trim().length < 2) {
      Notify.info(
        'Too many matches found. Please enter a more specific name.', notifyOptions
      );
      return;
    }
}

searchInputEl.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))