/**
 * 
 * @param {int} size size of the random array
 * @returns {Array.int} Array of ints between 0 and 10000
 */
function getRandomArray (size) {
  let array = [];

  while(size >= 0) {
    array[size] = Math.floor(Math.random() * 10000);
    size--;
  }

  return array;
}

module.exports = getRandomArray;