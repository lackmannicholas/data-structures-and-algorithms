
/**
 * Merge Sort JavaScript Implementation
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function QuickSort(array = [5, 8, 1, 2, 3]) {
  console.log(`initial array ${array.join(' ')}`);
  const sortedArray = quickSort(array, array.length);
  console.log(`initial array ${sortedArray.join(' ')}`);
}

/**
 * Internal method for implementing merge sort
 * @param {Array.int} array Unsorted array of ints
 * @param {int} n Length of the unsorted array
 * @returns {Array.int} Sorted array of ints
 */
function quickSort(array, n) {
  // base case
  if(array.length <= 1) return array;
  
  let p = choosePivot(array, n);

  // partition p

  // recurse 1st set

  // recurse 2nd set
}

function choosePivot() {

}

function partitionArray(array, l, r) {

}

module.exports = QuickSort;