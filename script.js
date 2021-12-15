import {
  updateGround,
  setupGround
} from './ground.js';

import {
  updateDino,
  setupDino
} from './dino.js';

// Game Scaling

// const GAME_WIDTH = 100;
// const GAME_HEIGHT = 30;
let SPEED_SCALE_INCREASE = .00001;

const scoreElement = document.querySelector('[data-score]');
const startElement = document.querySelector('[data-start]');

// const game = document.querySelector('[data-game]');

// setPixelToGameScale();

// window.addEventListener("resize", setPixelToGameScale);

// function setPixelToGameScale() {
//   let gameToPixelScale;

//   if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
//     gameToPixelScale = window.innerWidth / GAME_WIDTH;
//   } else {
//     gameToPixelScale = window.innerHeight / GAME_HEIGHT;
//   }

//   game.style.width = `${GAME_WIDTH * gameToPixelScale}px`;
//   game.style.height = `${GAME_HEIGHT * gameToPixelScale}px`;
// }

document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  startElement.classList.add('start_hide');
  setupGround();
  setupDino();
  window.requestAnimationFrame(update);
}

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    return window.requestAnimationFrame(update);
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * .01;
  scoreElement.textContent = Math.floor(score);
}