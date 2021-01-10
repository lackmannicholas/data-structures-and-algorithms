const prompt = require('prompt-sync')();
const MergeSort = require('./MergeSort');
const QuickSort = require('./QuickSort');
const RandomnizedSelection = require('./RandomizedSelection');
const MinimumCut = require('./MinimumCut');

const algorithms = [
  {name: 'Merge Sort', function: () => MergeSort()},
  {name: 'Quick Sort', function: () => QuickSort()},
  {name: 'Randomized Selection', function: () => RandomnizedSelection()},
  {name: 'Minimum Cut of a Graph', function: () => MinimumCut()},
]

const algo = prompt(`
Select an algorithm to run:
  1. Merge Sort
  2. Quick Sort
  3. Randomized Selection
  4. Minimum Cut of a Graph
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