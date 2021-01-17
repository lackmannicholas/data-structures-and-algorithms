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

// Add any extra import statements you may need here


// Add any helper functions you may need here
function sumLargestTwo(maxHeap) {
  const largest = maxHeap.extractMax();
  const second = maxHeap.extractMax();
  const penalty = largest + second;
  maxHeap.insert(penalty);
  return penalty;
}

function getTotalTime(arr) {
  // Write your code here
  let maxHeap = new MaxHeap(arr);
  let totalPenalties = 0;
  while(maxHeap.heap.length > 1) {
    totalPenalties += sumLargestTwo(maxHeap);
  }

  return totalPenalties;
}


// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printInteger(n) {
  var out = '[' + n + ']';
  return out;
}

var test_case_number = 1;

function check(expected, output) {
  var result = (expected == output);
  var rightTick = "\u2713";
  var wrongTick = "\u2717";
  if (result) {
    var out = rightTick + ' Test #' + test_case_number;
    console.log(out);
  }
  else {
    var out = '';
    out += wrongTick + ' Test #' + test_case_number + ': Expected ';
    out += printInteger(expected);
    out += ' Your output: ';
    out += printInteger(output);
    console.log(out);
  }
  test_case_number++;
}

var arr_1 = [4, 2, 1, 3];
var expected_1 = 26;
var output_1 = getTotalTime(arr_1);
check(expected_1, output_1);

var arr_2 = [2, 3, 9, 8, 4];
var expected_2 = 88;
var output_2 = getTotalTime(arr_2);
check(expected_2, output_2);

// Add your own test cases here

