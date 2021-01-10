const Graph = require("../Graph/GraphAdjArray");

function BFS(graph = new Graph([[1,2,4], [3,4], [1], [], []])) {
  console.log(graph);
  bfs(graph, 0);
}

function bfs(graph, s) {
  let q = [];

  q.push(graph.nodes[s]);
  console.log(`Discovered ${graph.nodes[s].val}`);
  while(q.length > 0) {
    // analagous to queue.dequeue
    let current = q.shift();
    for(let nextNode of current.adj) {
      if(!nextNode.discovered) {
        console.log(`Discovered ${nextNode.val}`);
        q.push(nextNode);
        nextNode.discovered = true;
      }
    }
  }
}

module.exports = BFS;