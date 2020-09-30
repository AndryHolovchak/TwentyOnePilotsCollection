function normalizeNumber(val, min, max) {
  return (val - min) / (max - min);
}

function clampNumber(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

export { normalizeNumber, clampNumber };
