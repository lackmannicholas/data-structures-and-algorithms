const Graph = require("../Graph/GraphAdjArray");

/**
 * Simplistic BFS algorithm
 * @param {Graph} graph GraphAdjArray Class implementation of a graph
 */
function BFS(graph = new Graph([[1,2,4], [3,4], [1], [], []])) {
  console.log(graph);
  bfs(graph, 0);
}

/**
 * Internal BFS method - the meat
 * @param {GraphAdjArray} graph GraphAdjArray Class implementation of a graph
 * @param {GraphNodeAdjArray} current Current graph node being processed
 */
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