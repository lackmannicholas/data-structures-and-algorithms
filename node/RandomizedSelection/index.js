const GetRandomArray = require('../RandomArray');
const prompt = require('prompt-sync')();

/**
 * Randomized Selection of ith int in an unsorted array - Based on QuickSort
 * Use Case - What's the median of this unsorted array?
 * Runs in O(n) time and O(logn) memory
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function RandomnizedSelection(array = GetRandomArray(10)) {
  console.log(`initial array 
    ${array.join(' ')}
  `);
  const ith = prompt("What is the ith largest number you'd like? ");
  const ithInt = randomnizedSelection(array, 0, array.length - 1, parseInt(ith) - 1);
  console.log(`The ${ith}th largest int is ${ithInt}`);
}

/**
 * Internal method for implementing randomized selection
 * @param {Array.int} array Unsorted array of ints
 * @param {int} l index of the starting position
 * @param {int} r index of the end position
 * @param {int} i ith largest int in the array
 * @returns {int} ith int from an unsorted array
 */
function randomnizedSelection(array, l, r, i) {
  // base case
  if(r - l <= 0) return array[l];
  
  // after choose pivot - p, our pivot will be in index 0
  choosePivot(array, l, r);

  // partition on p
  let [lessThanP, greaterThanP] = partitionArray(array, l, r, i);

  // by random chance we've selected the ith largest int through the pivot selection
  if(lessThanP === i) return array[lessThanP];

  // divide and conquer
  if (i < lessThanP) {
    return randomnizedSelection(array, l, lessThanP - 1, i);
  }
  else {
    return randomnizedSelection(array, lessThanP + 1, greaterThanP, i);
  }
}

/**
 * Same method from Quick Sort. Could import this function from that module if it was exported.
 * @param {Array.int} array Unsorted array of ints
 * @param {int} l left index
 * @param {int} r right index
 * @returns {Array.int} Array of ints with the pivot int in position l
 */
function choosePivot(array, l, r) {
  let pi = Math.floor(Math.random() * (r - l)) + l;
  let p = array[pi];

  // swap p with whatever is at index l;
  let atL = array[l];
  array[l] = p;
  array[pi] = atL;
}

/**
 * Same method from Quick Sort. Could import this function from that module if it was exported.
 * @param {Array.int} array Unsorted array of ints
 * @param {int} l left index
 * @param {int} r right index
 * @returns {Array.int} Array of ints pivot ending in it's correct place in the array
 */
function partitionArray(array, l, r) {
  let unknown = l;
  let lessThanP = l;
  let p = array[l];

  // while our unknown pointer is less than the right most index, continue to partition
  while(unknown < r) {
    unknown++;
    if(array[unknown] <= p) {
      // if the next unknown is less than p, swap unknown with lessThanP + 1 
      let newLessThan = array[unknown];
      let firstGreaterThan = array[lessThanP + 1];

      array[unknown] = firstGreaterThan;
      array[lessThanP + 1] = newLessThan;

      lessThanP++;
    }
  }

  // swap p with lessThanP: l = position of p
  array[l] = array[lessThanP];
  array[lessThanP] = p;

  return [lessThanP, unknown];
}

module.exports = RandomnizedSelection;