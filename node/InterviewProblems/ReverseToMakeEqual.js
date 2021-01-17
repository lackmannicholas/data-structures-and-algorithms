// Add any extra import statements you may need here


// Add any helper functions you may need here
function makeMapOfA(arrayA) {
  let map = new Map();
  for(const a of arrayA) {
    // to support dups we're using a as the key and the number of a that we find as the value
    if(map.has(a))
      map.set(a, map.get(a) + 1);
    else 
      map.set(a, 1);
  }

  return map;
}

function hasSameElements(mapA, arrayB) {
  for(const b of arrayB) {
    // if this element doesn't exist in A then there's amount of swaps to make A and B equal
    if(!mapA.has(b)) return false;
    // if A has less elements of this same value, then the arrays can never be equal
    if(mapA.get(b) === 0) return false;

    // if we've made it here, decrement the map value at b
    mapA.set(b, mapA.get(b) - 1);
  }

  return true;
}

function areTheyEqual(array_a, array_b) {
  // Write your code here
  let mapA = makeMapOfA(array_a);
  
  return hasSameElements(mapA, array_b);
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
  	out += expected;
  	out += ' Your output: ';
  	out += output;
  	console.log(out);
  }
  test_case_number++;
}

var array_a_1 = [1, 2, 3, 4];
var array_b_1 = [1, 4, 3, 2];
var expected_1 = true;
var output_1 = areTheyEqual(array_a_1, array_b_1); 
check(expected_1, output_1); 

var array_a_2 = [1, 2, 3, 4];
var array_b_2 = [1, 4, 3, 3];
var expected_2 = false;
var output_2 = areTheyEqual(array_a_2, array_b_2); 
check(expected_2, output_2); 