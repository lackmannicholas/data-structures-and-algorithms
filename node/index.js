const prompt = require('prompt-sync')();
const MergeSort = require('./MergeSort');
const QuickSort = require('./QuickSort');
const RandomnizedSelection = require('./RandomizedSelection');

const algorithms = [
  {name: 'Merge Sort', function: () => MergeSort()},
  {name: 'Quick Sort', function: () => QuickSort()},
  {name: 'Randomized Selection', function: () => RandomnizedSelection()},
]

const algo = prompt(`
Select an algorithm to run:
  1. Merge Sort
  2. Quick Sort
  3. Randomized Selection
`);

try {
  let i = parseInt(algo);
  console.log(`Running ${algorithms[i-1].name}`);
  algorithms[i-1].function();
}
catch(e) {
  console.log('Cannot compute. *computer over-heating*  *loud explosion*');
  console.log(e);
}