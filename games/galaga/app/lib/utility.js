export const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));

export const collisionOccured = (obj1, obj2, xOffset, yOffset, sizeOffset) => {
  const dx = obj1.x - obj2.x + xOffset;
  const dy = obj1.y - obj2.y + yOffset;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < obj1.size + obj2.size - sizeOffset) {
    return true;
  }
  return false;
};
