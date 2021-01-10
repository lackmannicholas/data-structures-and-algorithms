const Graph = require("../Graph/GraphAdjArray");

function BST(graph = new Graph([[1,2,4], [3,4], [1], [], []])) {
  console.log(graph);
  bst(graph, 0);
}

function bst(graph, s) {
  
}

module.exports = BST;