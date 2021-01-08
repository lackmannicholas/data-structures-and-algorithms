
/**
 * Merge Sort JavaScript Implementation
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function QuickSort(array = [5, 8, 1, 2, 3]) {
  console.log(`initial array ${array.join(' ')}`);
  const sortedArray = quickSort(array, 0, array.length - 1);
  console.log(`initial array ${sortedArray.join(' ')}`);
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
  if(array.length <= 1) return array;
  
  // after choose pivot - p, our pivot will be in index 0
  choosePivot(array, l, r);

  // partition on p
  let [lessThanP, greaterThanP] = partitionArray(array, l, r);

  // divide and conquer
  // recurse < p
  quickSort(array, 0, lessThanP-1);

  // recurse > p
  quickSort(array, lessThanP+1, greaterThanP);

  return array;
}

function choosePivot(array, l, r) {
  console.log('choosing pivot');
  
  let pi = Math.floor(Math.random() * (r - l + 1));
  let p = array[pi];

  console.log(`pivot = ${p}`);

  // swap p with whatever is at index l;
  let atL = array[l];
  array[l] = p;
  array[pi] = atL;

  console.log(`pivot chosen - ${array.join(' ')}`);
}

function partitionArray(array, p, l, r) {
  console.log('partitioning array');
  let lessThanP, unknown = l + 1;

  // while our unknown pointer is less than the right most index, continue to partition
  while(unknown <= r) {
    if(array[unknown] > array[0]) {
      // if the next unknown is greater than p, just increment unknown
      unknown++;
    }
    else if(array[unknown] < array[0]) {
      // if the next unknown is less than p, swap unknown with lessThanP + 1 
    }
  }

  console.log(`array partitioned - ${array.join(' ')}`);
  return [lessThanP, unknown];
}

module.exports = QuickSort;