function getCustomProperty(element, prop) {
  return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0;
}

function setCustomProperty(element, prop, value) {
  element.style.setProperty(prop, value);
}

function incrementCustomProperty(element, prop, incrementValue) {
  setCustomProperty(element, prop, getCustomProperty(element, prop) + incrementValue);
}

export {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty
};