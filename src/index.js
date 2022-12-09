import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
const axios = require('axios').default;

const refs = {
  body: document.querySelector('body'),
  quote: document.querySelector('.quote'),
  author: document.querySelector('.author'),
  btnStart: document.querySelector('.btn-start'),
  btnStop: document.querySelector('.btn-stop'),
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '	39f449cf9dfd61b601c9d47d4004fe0d',
    'X-RapidAPI-Host': '/favqs.com/api/qotd',
  },
};

refs.btnStop.disabled = true;
const TIME_CHANGE = 3000;
let timerId = null;

refs.btnStart.addEventListener('click', onClickButtonStart);
refs.btnStop.addEventListener('click', onClickButtonStop);

function onClickButtonStart() {
  addRemoveClass();
  toggleDisableButton(true, false);
  timerId = setInterval(onStartChange, TIME_CHANGE);
}

function onClickButtonStop() {
  addRemoveClass();
  toggleDisableButton(false, true);
  clearInterval(timerId);
}

async function onStartChange() {
  await createQuotes();
  await renderOfGradient();
}

async function createQuotes() {
  try {
    const fetch = await getQuotes();
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

// button

function toggleDisableButton(start, stop) {
  refs.btnStart.disabled = start;
  refs.btnStop.disabled = stop;
}

// color

function renderOfGradient() {
  refs.body.style.background = `linear-gradient(${random(0, 360)}deg, ${changeColor()})`;
}

function changeColor() {
  const amountColor = random(2, 4);
  const arrOfColor = [];
  for (let i = 0; i < amountColor; i += 1) {
    arrOfColor[i] = getRandomHexColor();
  }
  return arrOfColor;
}

function random(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// animation

function addRemoveClass() {
  refs.quote.classList.toggle('animation');
  refs.author.classList.toggle('animation');
}
