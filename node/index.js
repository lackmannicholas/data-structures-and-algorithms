const prompt = require('prompt-sync')();
const MergeSort = require('./MergeSort');
const QuickSort = require('./QuickSort');
const RandomnizedSelection = require('./RandomizedSelection');
const MinimumCut = require('./MinimumCut');
const BFS = require('./BFS');
const DFS = require('./DFS');
const StronglyConnectedComponents = require('./StronglyConnectedComponents');
const DijkstraShortestPath = require('./DijkstraShortestPath');
const { testMinHeap } = require('./MinHeap');

const algorithms = [
  {name: 'Merge Sort', function: () => MergeSort()},
  {name: 'Quick Sort', function: () => QuickSort()},
  {name: 'Randomized Selection', function: () => RandomnizedSelection()},
  {name: 'Minimum Cut of a Graph', function: () => MinimumCut()},
  {name: 'Breadth First Search', function: () => BFS()},
  {name: 'Depth First Search', function: () => DFS()},
  {name: 'Strongly Connected Components', function: () => StronglyConnectedComponents()},
  {name: 'Dijkstra\'s Shortest Path', function: () => DijkstraShortestPath()},
  {name: 'Build a Min Heap', function: () => testMinHeap()},
]

const algo = prompt(`
Select an algorithm to run:
  ${
    algorithms.map((a, i) => 
    '\n ' +(i + 1) + '. ' + a.name
    )
  }
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