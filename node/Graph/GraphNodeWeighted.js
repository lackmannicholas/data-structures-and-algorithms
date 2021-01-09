class GraphNode {
  constructor(id, val, adj = []) {
    this.id = id;
    this.val = val;
    // map of destination id as the key and weight as the value
    // since we can lookup nodes in O(1) from our this.nodes map, no need to keep a reference to neighbor nodes
    this.adj = new Map();

    // setting the neighbor index as the key
    adj.forEach(neighborID => {
      this.adj.set(neighborID, 0);
    });
  }
}

module.exports = GraphNode;