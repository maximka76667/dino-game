import {
  updateGround,
  setupGround
} from './ground.js';

import {
  updateDino,
  setupDino,
  getDinoRects,
  setDinoLose
} from './dino.js';

import {
  updateCactus,
  setupCactus,
  getCactusRects
} from './cactus.js';

// Game Scaling

// const GAME_WIDTH = 100;
// const GAME_HEIGHT = 30;
let SPEED_SCALE_INCREASE = .00002;

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
  speedScale = 1.5;
  score = 0;
  startElement.classList.add('start_hide');
  setupGround();
  setupDino();
  setupCactus();
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
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkLose()) {
    return handleDeath();
  }

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

function checkLose() {
  const dinoRect = getDinoRects();
  return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  const isLeftCollision = rect1.left < rect2.right;
  const isTopCollision = rect1.top < rect2.bottom;
  const isRightCollision = rect1.right > rect2.left;
  const isBottomCollision = rect1.bottom > rect1.top;
  return isLeftCollision && isTopCollision && isRightCollision && isBottomCollision;
}

function handleDeath() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true });
    startElement.classList.remove('start_hide');
  }, 100);
}