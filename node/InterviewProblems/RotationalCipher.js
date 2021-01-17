// Add any extra import statements you may need here


// Add any helper functions you may need here
function buildAlphabetCipher(rotationFactor) {
  let charCode = 'a'.charCodeAt(0);
  let alphaMap = new Map();
  let mod26 = rotationFactor % 26;
  // z char code == 122
  while(charCode <= 122) {
    let newCharCode = charCode + mod26;

    if(newCharCode > 122)  {
      newCharCode -= 26;
    }

    alphaMap.set(String.fromCharCode(charCode), String.fromCharCode(newCharCode));

    charCode++;
  }

  return alphaMap;
}

function buildNumericalCipher(rotationFactor) {
  let n = 0;
  let numMap = new Map();
  let mod9 = rotationFactor % 10;
  while(n <= 9) {
    let newN = n + mod9;

    if(newN > 9) {
      newN -= 10;
    }

    numMap.set(`${n}`, `${newN}`);
    n++
  }

  return numMap;
}

function getRotation(char, alphaCipher, numCipher) {
  let rotation = char;
  if(alphaCipher.has(char.toLowerCase())) {
    rotation = alphaCipher.get(char.toLowerCase());
  }
  else if(numCipher.has(char.toLowerCase())) {
    rotation = numCipher.get(char.toLowerCase());
  }
  if(isUpperCase(char)) rotation = rotation.toUpperCase();
  return rotation;
}

function isUpperCase(c) {
  return c === c.toUpperCase();
}

function rotationalCipher(input, rotationFactor) {
  // Write your code here
  let result = '';

  const alphabetCipher = buildAlphabetCipher(rotationFactor);
  const numericalCipher = buildNumericalCipher(rotationFactor);

  for(const char of input) {
    result += getRotation(char, alphabetCipher, numericalCipher);
  }

  return result;
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

var input_1 = "All-convoYs-9-be:Alert1.";
var rotationFactor_1 = 4;
var expected_1 = "Epp-gsrzsCw-3-fi:Epivx5.";
var output_1 = rotationalCipher(input_1, rotationFactor_1);
check(expected_1, output_1);

var input_2 = "abcdZXYzxy-999.@";
var rotationFactor_2 = 200;
var expected_2 = "stuvRPQrpq-999.@";
var output_2 = rotationalCipher(input_2, rotationFactor_2);
check(expected_2, output_2);

// Add your own test cases here
