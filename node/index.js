const prompt = require('prompt-sync')();

const algorithms = [{name: 'Merge Sort', function: () => console.log('Merge Sort function')}]

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
  console.log('You did not enter an acceptable int. Cannot compute. *computer over-heating*  *loud explosion*')
}