const Graph = require("../Graph/GraphAdjArray");
const fs = require("fs");
let finishingTime = 0;
/**
 * Kosaraju's 2-pass Algorithm for computing strongly connected components in a directed graph
 * @param {GraphAdjArray} graph GraphAdjArray Class implementation of a graph
 */
function StronglyConnectedComponents(){//graph = new Graph([[6],[4],[8],[0],[7],[7,2],[3,8],[1],[5]])) {
  let graph = [];
  // read input
  fs.readFile('StronglyConnectedComponents/SCC.txt', 'utf-8', (e, d) => {
    let edges = d.split('\n');
    console.log(edges.length +' = 5105043');
    for(const edge of edges) {
      let [v, w] = edge.split(' ');
      if(!graph[v]) graph[v] = [];
      graph[v].push(w);
    }

    // pass parsed input to ssc
    ssc(new Graph(graph));
  });
  //ssc(graph);
}

function ssc(graph) {
  let leaders = new Map();
  let finishingTimes = [];
  // 1. reverse the graph
  let graphNot = reverseGraph(graph);
  // 2. run a DFS-loop on the reversed graph to process node 'finishing times'
  for(let node of graphNot.nodes) {
    if(node.discovered) continue;
    dfsStack(graphNot, node, finishingTimes);
  }
  // 3. run a DFS-loop on the original graph and process the nodes in decending 'finishing time' order
  for(let n = finishingTimes.length - 1; n >= 0; n--) {
    // have to get the original graph node
    let current = graph.nodes[finishingTimes[n].val];
    if(!current) continue;
    if(current.discovered) continue;
    leaders.set(current.val, [current]);
    current.discovered = true
    dfsStack(graph, current, undefined, leaders, current.val);
  }

  // using a Map allows you to do this
  leaders.forEach((scc, i) => {
    console.log(`SCC leader ${i} has size ${scc.length}`);
  });
}

/**
 * Internal DFS method - the meat
 * @param {GraphAdjArray} graph GraphAdjArray Class implementation of a graph
 * @param {GraphNodeAdjArray} current Current graph node being processed
 */
function dfsRecursive(graph, current, finishingTimes, leaders, leader) {
  for(const nextNode of current.adj) {
    if(!nextNode) continue;
    if(!nextNode.discovered) {
      nextNode.discovered = true;
      //console.log(`Discovered ${nextNode.val}`);

      dfs(graph, nextNode, finishingTimes, leaders, leader);

      if(finishingTimes)
        finishingTimes[finishingTime++] = current;

      if(leaders !== undefined && leader !== undefined) 
        leaders.get(leader).push(nextNode);
    }
  }
}

function dfsStack(graph, s, finishingTimes, leaders, leader) {
  let stack = [];
  stack.push(s);
  while(stack.length > 0) {
    let current = stack.pop();
    for(const nextNode of current.adj) {
      if(!nextNode) continue;
      if(!nextNode.discovered) {
        nextNode.discovered = true;
        //console.log(`Discovered ${nextNode.val}`);
  
        stack.push(nextNode);

        if(leaders !== undefined && leader !== undefined) 
          leaders.get(leader).push(nextNode);

      }
    }
    if(finishingTimes)
      finishingTimes[finishingTime++] = current;
  }
}

function reverseGraph(graph) {
  // decompose original graph into reversed adj array array - [[1],[2],[3],[]]
  let graphNot = [];

  for(const node of graph.nodes) {
    for(const neighbor of node.adj) {
      if(!neighbor) continue;
      if(!graphNot[neighbor.val]) graphNot[neighbor.val] = [];
      graphNot[neighbor.val].push(node.val);
    }
  }

  // pass reversed, decomposed adj array array into Graph constructor
  return new Graph(graphNot);
}


module.exports = StronglyConnectedComponents