const Graph = require('../Graph/GraphAdjArray');
const { MinHeap } = require('../MinHeap');

function MinimumSpanningTree (graph = new Graph()) {
  return mst(graph);
}

function mst(graph) {
  // pull out first node arbitrarily
  let start = graph.nodes.shift();
  let VerticesSet = new Set(start);
  let EdgeSet = new Set();
  let VerticesHeap = new MinHeap(graph.nodes);

  // load vertices into a min heap
  for(const v of graph.nodes) {
    // using previously created MinHeap class
    VerticesHeap.insert({key: Number.MAX_SAFE_INTEGER, v});
  }

  // while there are still vertices not in our minimum spanning tree
  // continue to add the vertice with the smallest weight into our tree 
  while(!VerticesHeap.isEmpty()) {
    let minVertex = VerticesHeap.extractMin();
    recalibrateCrosingEdges(minVertex, VerticesHeap);
    VerticesSet.add(minVertex);
    EdgeSet.add(minVertex.edge);
  }
  
  return [VerticesSet, EdgeSet];
}

function recalibrateCrosingEdges(v, heap) {
  for(let neighbor of v.adj) {
    let h = heap.delete(neighbor);
    // if the weight is from v -> is less than the weight change key value and re-add to heap
    if(h.key > neighbor[2]) {
      h.key = neighbor[2];
      h.edge = [v.val, neighbor.val];
    }
    heap.insert(h);
  }
}

module.exports = MinimumSpanningTree;