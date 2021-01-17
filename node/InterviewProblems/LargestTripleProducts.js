// Add any extra import statements you may need here

class MaxHeap {
  constructor(array) {
    this.heap = [];

    if(!array) return;

    this.buildHeap(array);
  }

  // this will run in O(n)
  buildHeap(array) {
    for(let elem of array) {
      this.heap.unshift(elem);
      this.bubbleDown(0);
    }
  }

  insert(elem) {
    this.heap.push(elem);
    if(this.heap.length === 1) return elem;
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if(this.heap.length === 0) throw new Error("No elements in the heap");
    
    const max = this.heap.shift();

    if(this.heap.length > 1) {
      const lastElement = this.heap.pop();
      this.heap.unshift(lastElement);
      this.bubbleDown(0);
    }
    
    return max;
  }

  bubbleUp(i) {
    let parent = this.heap[this.parentIndex(i)];
    if(parent < this.heap[i]) {
      // we need to swap
      this.heap[this.parentIndex(i)] = this.heap[i];
      this.heap[i] = parent;
      this.bubbleUp(this.parentIndex(i));
    }
    return this.heap[i];
  }

  bubbleDown(i) {
    let left = this.heap[this.leftChildIndex(i)];
    let right = this.heap[this.rightChildIndex(i)];
    let elem = this.heap[i];

    if(elem < left && (left > right || right === undefined) && this.leftChildIndex(i) < this.heap.length) {
      // make left the parent
      this.heap[i] = this.heap[this.leftChildIndex(i)];
      this.heap[this.leftChildIndex(i)] = elem;
      this.bubbleDown(this.leftChildIndex(i));
    }
    else if(elem < right && (right > left || left === undefined) && this.rightChildIndex(i) < this.heap.length) {
      // make right the parent
      this.heap[i] = this.heap[this.rightChildIndex(i)];
      this.heap[this.rightChildIndex(i)] = elem;
      this.bubbleDown(this.rightChildIndex(i));
    }

    return elem;
  }

  parentIndex(i) { return Math.floor((i - 1) / 2) }
  leftChildIndex(i) { return Math.floor((i * 2) + 1) }
  rightChildIndex(i) { return Math.floor((i * 2) + 2) }
}

// Add any helper functions you may need here
function getMaxProductAtI(valueI, maxHeap) {
  // adding latest i to the mix
  maxHeap.insert(valueI);

  const largest = maxHeap.extractMax();
  const second = maxHeap.extractMax();
  const third = maxHeap.extractMax();

  maxHeap.insert(largest);
  maxHeap.insert(second);
  maxHeap.insert(third);

  return largest * second * third;
}

function findMaxProduct(arr) {
  // Write your code here
  let largestTripleProducts = [-1, -1];
  let maxHeap = new MaxHeap([arr[0], arr[1]]);

  for(let i = 2; i < arr.length; i++) {
    largestTripleProducts[i] = getMaxProductAtI(arr[i], maxHeap);
  }

  return largestTripleProducts;
}


// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printintegerArray(array) {
  var size = array.length;
  var res = '';
  res += '[';
  var i = 0;
  for (i = 0; i < size; i++) {
    if (i !== 0) {
    	res += ', ';
    }
    res += array[i];
  }
  res += ']';
  return res;
}

var test_case_number = 1;

function check(expected, output) {
  var expected_size = expected.length;
  var output_size = output.length;
  var result = true;
  if (expected_size != output_size) {
    result = false;
  }
  for (var i = 0; i < Math.min(expected_size, output_size); i++) {
    result &= (output[i] == expected[i]);
  }
  var rightTick = "\u2713";
	var wrongTick = "\u2717";
  if (result) {
  	var out = rightTick + ' Test #' + test_case_number;
  	console.log(out);
  }
  else {
  	var out = '';
  	out += wrongTick + ' Test #' + test_case_number + ': Expected ';
  	out += printintegerArray(expected);
  	out += ' Your output: ';
  	out += printintegerArray(output);
  	console.log(out);
  }
  test_case_number++;
}

var arr_1 = [1, 2, 3, 4, 5];
var expected_1 = [-1, -1, 6, 24, 60];
var output_1 = findMaxProduct(arr_1);
check(expected_1, output_1);

var arr_2 = [2, 4, 7, 1, 5, 3];
var expected_2 = [-1, -1, 56, 56, 140, 140];
var output_2 = findMaxProduct(arr_2);
check(expected_2, output_2);

// Add your own test cases here
