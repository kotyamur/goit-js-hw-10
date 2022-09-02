import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const notifyOptions = {
  timeout: 2000,
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
        return `<li class="country-item">
          <div class="country-flag"><img src="${country.flags.svg}" width="70"/></div>
          <p>${country.name.official}</p>
      </li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}

const renderContriesInfo = countries => {
  console.log(countries[0]);
  const country = countries[0];
  const markup = `
    <div class="country-name">
      <div class="country-flag"><img src="${country.flags.svg}" width="70"/></div>
      <p>${country.name.official}</p>
    </div>
    <p><b>Capital</b>: ${country.capital}</p>
    <p><b>Population</b>: ${country.population}</p>
    <p><b>Languages</b>: ${Object.values(country.languages).join(
      ', '
    )} </p>
  `;
  countryInfoEl.innerHTML = markup;
};

const clearHtml = () => {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
}

const onSearchInput = (e) => {
  clearHtml();
  const searchCountry = e.target.value;
  const trimedSearchCountry = searchCountry.trim();
  
  if (!trimedSearchCountry) {
    return
  }
  fetchCountries(trimedSearchCountry)
    .then(countries => {
      if (countries.length === 1) {
        renderContriesInfo(countries);
        return
      }
      
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          notifyOptions
        );
        return;
      }
      renderContriesList(countries);
    })
    .catch(error => console.log(error));
}

searchInputEl.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))