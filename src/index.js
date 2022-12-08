import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
const axios = require('axios').default;

const refs = {
  button: document.querySelector('.btn'),
  quote: document.querySelector('.quote'),
  author: document.querySelector('.author'),
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '	39f449cf9dfd61b601c9d47d4004fe0d',
    'X-RapidAPI-Host': '/favqs.com/api/qotd',
  },
};

refs.button.addEventListener('click', onClickButton);

function onClickButton() {
  console.log('dfjsdf');
  createQuotes();
}

async function createQuotes() {
  try {
    const fetch = await getQuotes();
    console.log(fetch);
    refs.author.textContent = `- ${fetch.author}`;
    refs.quote.textContent = `"${fetch.body}"`;
  } catch (error) {
    console.log(error);
  }
}

async function getQuotes() {
  try {
    const URL = `https://favqs.com/api/qotd`;
    const response = await axios.get(URL, options);
    return response.data.quote;
  } catch (error) {
    throw new Error(error);
  }
}
