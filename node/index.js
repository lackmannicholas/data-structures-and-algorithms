const prompt = require('prompt-sync')();
const MergeSort = require('./MergeSort');
const algorithms = [{name: 'Merge Sort', function: () => MergeSort()}]

const algo = prompt(`
Select an algorithm to run:
  1. Merge Sort
`);

try {
  let i = parseInt(algo);
  console.log(`You chose ${algorithms[i-1].name}`);

  algorithms[i-1].function();
}
catch(e) {
  console.log(e);
  console.log('Cannot compute. *computer over-heating*  *loud explosion*')
}