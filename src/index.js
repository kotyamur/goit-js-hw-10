import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

fetchCountries('cana')
  .then(countries => console.log(countries))
  .catch(error => console.log(error));

const onSearchInput = (e) => {
    const searchCountry = e.target.value;
    console.log(searchCountry.trim());
    console.log(searchCountry.trim().length);
    if (searchCountry.trim().length < 2) {
      Notify.info(
        'Too many matches found. Please enter a more specific name.',
        {
          timeout: 2500,
          width: '300px',
          clickToClose: true,
          position: 'center-top',
        }
      );
      return;
    }
}

searchInputEl.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))