function MinimumCut(graph) {
  let minimumCut = graph.edges;

  // by running an algorithm with a bad probability of getting the correct answer a sufficient # of times we can guarantee to get
  // the correct answer 
  for(let n in graph.nodes) {
    let cut = individualCut(graph);
    if(cut < minimumCut) minimumCut = cut;
  }

  return minimumCut;
}

function individualCut(graph) {
  let remaining = graph.size;

  while(remaing > 2) {
    contractGraph(graph);
  }
}

function contractGraph(graph) {
  // this is where the magic happens
  let cut = graph.edges;
  // 1. randomly choose an edge to contract
  // 2. contract the edge by merging the two nodes into the same set
  // 3. continue until there are only two nodes left
  // 4. the edges between the remaing two nodes is the cut
}

module.exports = MinimumCut;