import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
} from "./updateCustomValues.js";

const dinoElement = document.querySelector('[data-dino]');

const JUMP_SPEED = .45;
const GRAVITY = .0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let velocity;

function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  velocity = 0;
  setCustomProperty(dinoElement, '--bottom', 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    return dinoElement.style.background = 'url(./images/dino-stationary.png)'
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.style.background = `url(./images/dino-run-${dinoFrame}.png)`;
    currentFrameTime -= FRAME_TIME;
  }

  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(dinoElement, '--bottom', velocity * delta);

  if (getCustomProperty(dinoElement, '--bottom') <= 0) {
    setCustomProperty(dinoElement, '--bottom', 0);
    isJumping = false;
  }

  velocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  velocity = JUMP_SPEED;
  isJumping = true;
}

function getDinoRects() {
  return dinoElement.getBoundingClientRect();
}

function setDinoLose() {
  dinoElement.background = "url(./images/dino-lose.png)"
}

export {
  setupDino,
  updateDino,
  getDinoRects,
  setDinoLose
}