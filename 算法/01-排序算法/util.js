const swap = function (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

module.exports = {
  swap,
};
