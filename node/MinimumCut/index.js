const Graph = require("../Graph/GraphAdjArray");

function MinimumCut(graph = new Graph([[1,2,4], [3,4], [1], [], []])) {
  console.log(graph);
  let minCut = minimumCut(graph);
  console.log(`Minimum Cut of this graph is ${minCut}`);
}

function minimumCut(graph) {
  let minCut = graph.end;

  // by running an algorithm with a bad probability of getting the correct answer a sufficient # of times we can guarantee to get
  // the correct answer 
  for(let n in graph.nodes) {
    let cut = individualCut(graph);
    if(cut < minCut) minCut = cut;
  }

  return minCut;
}

function individualCut(graph) {
  let remaining = graph.end;

  while(remaining > 2) {
    contractGraph(graph);
  }
}

function contractGraph(graph) {
  // this is where the magic happens
  let cut = graph.end;
  // 1. randomly choose an edge to contract
  // 2. contract the edge by merging the two nodes into the same set
  // 3. continue until there are only two nodes left
  // 4. the edges between the remaing two nodes is the cut
}

module.exports = MinimumCut;