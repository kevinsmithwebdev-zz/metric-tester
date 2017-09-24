


exports.getRandom = function(min, max, isInt) {
  if (isInt)
    return Math.floor(Math.random() * (max - min) + min);
  else
    return Math.random() * (max - min) + min;
}
