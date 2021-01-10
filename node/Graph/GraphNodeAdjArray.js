class GraphNode {
  constructor(val, adj = []) {
      this.val = val;
      this.adj = adj;
  }
}

module.exports = GraphNode;