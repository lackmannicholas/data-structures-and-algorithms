const GraphNode = require('./GraphNodeAdjMap');

class Graph {
  constructor(graph) {
    // assuming we're getting a array of adjacency lists where the node value is it's position in
    // the array
    if (graph && graph.length > 0) {
      this.nodes = new Map();

      // assuming our start is the 0 node for 
      this.start = null;

      graph.forEach((adj, i) => {
        let gNode = new GraphNode(i, i, adj);
        this.nodes.set(i, gNode);
      });

      this.nodes.forEach((graphNode, i) => {
        graphNode.adj.forEach((neighborID, value) => {
          graphNode.adj.set(neighborID, this.nodes.get(neighborID));
        });
      });
    }
    else {
      this.nodes = new Map();
      this.start = null;
      this.end = null;
    }
  }

  // assuming no duplicates for ease
  AddNode(id, val, adj = []) {
    let newNode = new GraphNode(id, val, adj);

    this.nodes.set(id, newNode);

    newNode.adj.forEach((neighborID, value) => {
      // get neighbor node from our node map
      var neighbor = this.nodes.get(neighborID);

      // set the neight node to our new node's adjceny list with the neighbor id
      newNode.adj.set(neighbor.id, neighbor);
    });
  }

  AddEdge(sourceNodeID, destNodeID) {
    let source = this.nodes.get(sourceNodeID);
    let dest = this.nodes.get(destNodeID);

    if (!source)
      throw Error("Source node does not exist");
    if (!dest)
      throw Error("Destination node does not exist");

    source.adj.set(dest.id, dest);
  }

  async BFS(s = this.start) {
    let result = [];
    let queue = [];
    let visited = new Map();

    this.nodes.forEach((node) => visited.set(node.id, false));

    // initialize
    queue.push(s);
    visited.set(s.id, true);

    let currentNode = null;

    while (queue.length > 0) {
      // get the next node
      currentNode = queue.shift();

      result.push(currentNode);

      await currentNode.adj.forEach(neighbor => {
        // if we haven't visited this node then add it to our queue
        if (!visited.get(neighbor.id)) {
          // mark that we've visited this node
          visited.set(neighbor.id, true);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // could implement this recursively, but I'm not to save memory space
  // implementing with stack instead
  async DFS(s = this.start) {
    let result = [];
    let stack = [];
    let visited = new Map();

    this.nodes.forEach((node) => visited.set(node.id, false));

    // initialize
    stack.push(s);
    visited.set(s.id, true);

    let currentNode = null;

    while (stack.length > 0) {
      // get next node
      currentNode = stack.pop();

      result.push(currentNode);

      await currentNode.adj.forEach(neighbor => {
        // if we haven't visited this node then add it to our stack
        if (!visited.get(neighbor.id)) {
          // mark that we've visited this node
          visited.set(neighbor.id, true);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }
}


// var main = async function(graph) {
//     let g = new Graph(graph);

//     g.AddNode(274, {name:"ObjectNode"}, [1,4]);
//     g.AddEdge(1, 274);

//     g.AddNode("NEWNODE!", {name:"Different object ready to be noded"}, [274, 0, 2]);
//     g.AddEdge(274, "NEWNODE!");
//     g.AddEdge(4, "NEWNODE!");

//     console.log("BFS Begin: ");
//     let bfs = await g.BFS();
//     console.log(...bfs);

//     console.log("DFS Begin: ");
//     let dfs = await g.DFS();
//     console.log(...dfs);

//     return;
// };

// let graph = [[1,2,4], [3,4], [1], [], []];

// await main(graph);

module.exports = Graph;