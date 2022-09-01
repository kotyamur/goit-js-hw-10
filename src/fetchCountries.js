import { Notify } from 'notiflix/build/notiflix-notify-aio';

const fields = ['name', 'capital', 'population', 'flags', 'languages'];

export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${fields.join(',')}`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name', {
        timeout: 2500,
        width: '300px',
        clickToClose: true,
        position: 'center-top',
      });
        throw new Error(response.status);
    }
    return response.json();
  });
};
