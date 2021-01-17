// Add any extra import statements you may need here


// Add any helper functions you may need here
function getMiddle(s) {
  if(s.length % 2 === 0) {
    return (s.length / 2) - 1;  
  }
  else {
    return Math.floor(s.length / 2);  
  }
}

// facebook
// 01234567
// eafcobok

function encryptString(s) {
  if(!s) return '';
  if(s.length === 1) return s;
  
  const middle = getMiddle(s);
  let result = s[middle];
  result += encryptString(s.substring(0, middle));
  result += encryptString(s.substring(middle + 1));

  return result;
}

function findEncryptedWord(s) {
  // Write your code here
  return encryptString(s);
}










// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printString(str) {
  var out = '["' + str + '"]';
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
    out += printString(expected);
    out += ' Your output: ';
    out += printString(output);
    console.log(out);
  }
  test_case_number++;
}

var s_1 = "abc";
var expected_1 = "bac";
var output_1 = findEncryptedWord(s_1);
check(expected_1, output_1);

var s_2 = "abcd";
var expected_2 = "bacd";
var output_2 = findEncryptedWord(s_2);
check(expected_2, output_2);

// Add your own test cases here
