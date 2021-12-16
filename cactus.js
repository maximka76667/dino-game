import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomValues.js";

const SPEED = .05;
const INTERVAL_MIN = 1000;
const INTERVAL_MAX = 2000;
const gameElement = document.querySelector('[data-game]');

let nextCactusTime;

function setupCactus() {
  nextCactusTime = INTERVAL_MIN;
  document.querySelectorAll('[data-cactus]').forEach(cactus => {
    cactus.remove();
  })
}

function updateCactus(delta, speedScale) {
  document.querySelectorAll('[data-cactus]').forEach(cactus => {
    incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1);
    if (getCustomProperty(cactus, '--left') <= -100) {
      cactus.remove();
    }
  })

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime = randomNumberBetween(INTERVAL_MIN, INTERVAL_MAX) / speedScale;
  }
  nextCactusTime -= delta;
}

function createCactus() {
  const cactus = document.createElement('div');
  cactus.dataset.cactus = true;
  cactus.style.background = 'url(./images/cactus.png)';
  cactus.classList.add('cactus');
  setCustomProperty(cactus, '--left', 100);
  gameElement.append(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(min + Math.random() * (max + min + 1));
}

function getCactusRects() {
  return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
    return cactus.getBoundingClientRect();
  })
}

export {
  setupCactus,
  updateCactus,
  getCactusRects
}