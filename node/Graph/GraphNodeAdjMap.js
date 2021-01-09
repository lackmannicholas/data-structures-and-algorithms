class GraphNode {
  constructor(id, val, adj = []) {
    this.id = id;
    this.val = val;
    this.adj = new Map();

    // setting the neighbor index as the key
    adj.forEach(neighborID => {
      this.adj.set(neighborID, neighborID);
    });
  }
}

module.exports = GraphNode;