// Add any extra import statements you may need here
class MinHeap {
  constructor(array) {
    this.heap = [];

    if(array) this.buildHeap(array);
  }

  buildHeap(array) {
    for(const i in array) {
      this.heap.unshift({ milestone: array[i], orgI: i });
      this.bubbleDown(0);
    }
  }

  bubbleDown(i) {
    const left = this.heap[this.leftIndex(i)];
    const right = this.heap[this.rightIndex(i)];
    const current = this.heap[i];

    if(left && current.milestone > left.milestone && (!right || left.milestone < right.milestone) && this.leftIndex(i) < this.heap.length) {
      this.heap[i] = left;
      this.heap[this.leftIndex(i)] = current;
      this.bubbleDown(this.leftIndex(i));
    }
    else if(right && current.milestone > right.milestone && (!left || left.milestone > right.milestone) && this.rightIndex(i) < this.heap.length) {
      this.heap[i] = right;
      this.heap[this.rightIndex(i)] = current;
      this.bubbleDown(this.rightIndex(i));
    }
  }

  peekMin() {
    return this.heap[0];
  }

  extractMin() {
    if(this.heap.length === 0) throw new Error('No elements in the heap!');
    const min = this.heap.shift();
    
    if(this.heap.length > 1) {
      const lastMilestone = this.heap.pop();
      this.heap.unshift(lastMilestone);
      this.bubbleDown(0);
    }

    return min;
  }

  leftIndex(i) { return (i * 2) + 1 }
  rightIndex(i) { return (i * 2) + 2 }
  parent(i) { return Math.floor((i - 1) / 2) }
}

// Add any helper functions you may need here


// var revenues_2 = [700, 800, 600, 400, 600, 700];
// var milestones_2 = [3100, 2200, 800, 2100, 1000];

function getMilestoneDays(revenues, milestones) {
  // Write your code here
  let milestoneHeap = new MinHeap(milestones);
  let runningSum = 0;
  let achievedMilestones = [];
  for(const i in revenues) {
    // add r to running
    runningSum += revenues[i];
    if(!milestoneHeap.peekMin()) break;

    while(milestoneHeap.heap.length > 0 && runningSum >= milestoneHeap.peekMin().milestone) {
      const conqueredMilestone = milestoneHeap.extractMin();
      achievedMilestones[conqueredMilestone.orgI] = parseInt(i) + 1;
    }
  }

  return achievedMilestones;
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

var revenues_1 = [100, 200, 300, 400, 500];
var milestones_1 = [300, 800, 1000, 1400]
var expected_1 = [2, 4, 4, 5];
var output_1 = getMilestoneDays(revenues_1, milestones_1);
check(expected_1, output_1);

var revenues_2 = [700, 800, 600, 400, 600, 700];
var milestones_2 = [3100, 2200, 800, 2100, 1000];
var expected_2 = [5, 4, 2, 3, 2];
var output_2 = getMilestoneDays(revenues_2, milestones_2);
check(expected_2, output_2);

// Add your own test cases here
