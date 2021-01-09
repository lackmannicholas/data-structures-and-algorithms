const GetRandomArray = require('../RandomArray');

/**
 * Merge Sort JavaScript Implementation
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function QuickSort(array = GetRandomArray(10000)) {
  console.log(`initial array 
    ${array.join(' ')}
  `);
  const sortedArray = quickSort(array, 0, array.length - 1);
  console.log(`sorted array:
    ${sortedArray.join(' ')}`);
}

/**
 * Internal method for implementing merge sort
 * @param {Array.int} array Unsorted array of ints
 * @param {int} l index of the starting position
 * @param {int} r index of the end position
 * @returns {Array.int} Sorted array of ints
 */
function quickSort(array, l, r) {
  // base case
  if(r - l <= 0) return array;
  
  // after choose pivot - p, our pivot will be in index 0
  choosePivot(array, l, r);

  // partition on p
  let [lessThanP, greaterThanP] = partitionArray(array, l, r);

  // divide and conquer
  // recurse < p
  quickSort(array, l, lessThanP-1);

  // recurse > p
  quickSort(array, lessThanP+1, greaterThanP);

  return array;
}

function choosePivot(array, l, r) {
  //console.log('choosing pivot');

  let pi = Math.floor(Math.random() * (r - l)) + l;
  let p = array[pi];

  //console.log(`pivot = ${p}`);

  // swap p with whatever is at index l;
  let atL = array[l];
  array[l] = p;
  array[pi] = atL;

  //console.log(`pivot chosen - ${array.join(' ')}`);
}

function partitionArray(array, l, r) {
  //console.log('partitioning array');
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

  //console.log(`array partitioned - ${array.join(' ')}`);
  return [lessThanP, unknown];
}

module.exports = QuickSort;