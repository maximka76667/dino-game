import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
} from "./updateCustomValues.js";

const SPEED = .05;
const grounds = document.querySelectorAll('[data-ground]');

function setupGround() {
  setCustomProperty(grounds[0], '--left', 0);
  setCustomProperty(grounds[1], '--left', 300);
}

function updateGround(delta, speedScale) {
  grounds.forEach((ground) => {
    incrementCustomProperty(ground, '--left', delta * speedScale * SPEED * -1);

    if (getCustomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600);
    }
  })
}

export {
  setupGround,
  updateGround
}