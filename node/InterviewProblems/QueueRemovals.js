// Add any extra import statements you may need here


// Add any helper functions you may need here
function findMax(arr) {
  let max = null;
  for(let i = 0; i < arr.length; i++) {
    if(max === null || arr[i].val > arr[max].val) max = i;
  }

  let maxObj = arr.splice(max, 1);
  return [maxObj[0], arr];
}

function findPositions(arr, x) {
  // Write your code here
  let result = [];

  // preprocess the array into an object with original i
  for(let i = 0; i < arr.length; i++) {
    arr[i] = { val: arr[i], i: i};
  }

  while(result.length < x) {
    let tempQ = [];
    // pop x # of items off off the array
    let i = 0;
    while(i < x) {
      if(arr.length === 0) break;
      tempQ.push(arr.shift());
      i++;
    }

    let [maxObj, tempA] = findMax(tempQ);
    result.push(maxObj.i + 1);

    for(let obj of tempA) {
      if(obj.val > 0) obj.val -= 1;
      arr.push(obj);
    }
  }

  return result;
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

var n_1 = 6
var x_1 = 5
var arr_1 = [1, 2, 2, 3, 4, 5];
var expected_1 = [5, 6, 4, 1, 2 ];
var output_1 = findPositions(arr_1, x_1);
check(expected_1, output_1);

var n_2 = 13
var x_2 = 4
var arr_2 = [2, 4, 2, 4, 3, 1, 2, 2, 3, 4, 3, 4, 4];
var expected_2 = [2, 5, 10, 13];
var output_2 = findPositions(arr_2, x_2);
check(expected_2, output_2);

// Add your own test cases here
