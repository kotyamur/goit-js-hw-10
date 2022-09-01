import './css/styles.css';
import { fetchCountries } from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;



fetchCountries('cana')
  .then(countries => console.log(countries))
  .catch(error => console.log(error));