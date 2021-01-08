const prompt = require('prompt-sync')();
const MergeSort = require('./MergeSort');
const QuickSort = require('./QuickSort');

const algorithms = [
  {name: 'Merge Sort', function: () => MergeSort()},
  {name: 'Quick Sort', function: () => QuickSort()},
]

const algo = prompt(`
Select an algorithm to run:
  1. Merge Sort
  2. Quick Sort
`);

try {
  let i = parseInt(algo);
  console.log(`You chose ${algorithms[i-1].name}`);

  algorithms[i-1].function();
}
catch(e) {
  console.log('Cannot compute. *computer over-heating*  *loud explosion*');
  console.log(e);
}