const Graph = require('../Graph/GraphAdjArray');

function DFS(graph = new Graph([[1,2,4], [3,4], [1], [], []])) {
  console.log(graph);
  console.log(`Discovered 0`);
  dfs(graph, graph.nodes[0]);
}

function dfs(graph, current) {
  for(const nextNode of current.adj) {
    if(!nextNode.discovered) {
      nextNode.discovered = true;
      console.log(`Discovered ${nextNode.val}`);
      dfs(graph, nextNode);
    }
  }
}

module.exports = DFS;