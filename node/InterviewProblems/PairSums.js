// Add any extra import statements you may need here


// Add any helper functions you may need here


function numberOfWays(arr, k) {
  // Write your code here
  let sumPairs = 0;
  let sumMap = new Map();
  let inverseArray = [];
  for(let i in arr) {
    sumMap.set(arr[i], k - arr[i]);
    if(!inverseArray[arr[i]]) inverseArray[arr[i]] = 0;
    inverseArray[arr[i]] += 1;
  }

  for(let num of arr) {
    if(sumMap.has(sumMap.get(num)) && inverseArray[num] > 0 && inverseArray[sumMap.get(num)] > 0) {
      if(num * 2 === k) {
        let numNum = inverseArray[num];
        let totalPairs = (.5*(numNum-1)*(numNum));
        sumPairs += totalPairs;
        inverseArray[num] = 0;
      }
      else {
        inverseArray[num] -= 1;
        inverseArray[sumMap.get(num)] -= 1;
        sumPairs++;
      }
    }
  }

  return sumPairs;
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

var k_1 = 6;
var arr_1 = [1, 2, 3, 4, 3];
var expected_1 = 2;
var output_1 = numberOfWays(arr_1, k_1);
check(expected_1, output_1);

var k_2 = 6;
var arr_2 = [1, 5, 3, 3, 3];
var expected_2 = 4;
var output_2 = numberOfWays(arr_2, k_2);
check(expected_2, output_2);

// Add your own test cases here
