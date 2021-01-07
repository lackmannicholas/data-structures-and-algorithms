
/**
 * Merge Sort JavaScript Implementation
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function MergeSort(array = [5, 8, 1, 2, 3]) {
  console.log(`initial array ${array.join(' ')}`);
  const sortedArray = mergeSort(array);
  console.log(`initial array ${sortedArray.join(' ')}`);
}

/**
 * Internal method for implementing merge sort
 * @param {Array.int} array Unsorted array of ints
 * @returns {Array.int} Sorted array of ints
 */
function mergeSort(array) {
  // base case
  if(array.length <= 1) return array;
  
  let half = Math.floor(array.length/2);

  let left = mergeSort(array.slice(0, half));
  let right = mergeSort(array.slice(half, array.length-1));

  return merge(left, right);
}

/**
 * Merge portion of merge sort
 * @param {Array.int} left Sorted Array
 * @param {Array.int} right Sorted Array
 */
function merge(left, right) {
  let sortedArray = [];
  let l = 0;
  let r = 0;

  for(let i = 0; i < left.length + right.length - 2; i++ ) {
    if(left[l] < right[r]) {
      sortedArray.push(left[l])
      l++;
    }
    else if (right[r] >= left[l]) {
      sortedArray.push(right[r]);
      r++;
    }
  }

  return sortedArray;
}

module.exports = MergeSort;