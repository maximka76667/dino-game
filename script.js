import {
  updateGround,
  setupGround
} from './ground.js';

// Game Scaling

// const GAME_WIDTH = 100;
// const GAME_HEIGHT = 30;

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

setupGround();

let lastTime;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    return window.requestAnimationFrame(update);
  }
  const delta = time - lastTime;

  updateGround(delta, 1);

  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);