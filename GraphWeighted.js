const BinaryMinHeap = require("./BinaryMinHeap");

class GraphNode {
    constructor(id, val, adj = []) {
        this.id = id;
        this.val = val;
        this.adj = new Map();
        this.weights = new Map();

        // setting the neighbor index as the key
        adj.forEach(neighborID => {
            this.adj.set(neighborID, neighborID);
            this.weights.set(neighborID, 0);
        });
    }
}

class Graph {
    constructor(graph) {
        this.nodes = new Map();
        this.start = null;
        this.end = null;

        // assuming we're getting a array of adjacency lists where the node value is it's position in
        // the array
        if(graph && graph.length > 0) {
            // for each index in the graph array, build a GraphNode
            graph.forEach((adj, i) => {
                let newNode = new GraphNode(i, i, adj);
                this.nodes.set(i, newNode);
            });

            // now that all GraphNodes are set, loop through again to get the correct GraphNode reference for each edge
            this.nodes.forEach((graphNode) => {
                graphNode.adj.forEach((neighborID) => {
                    graphNode.adj.set(neighborID, this.nodes.get(neighborID));
                });
            });

            // assuming our start is the 0 node for 
            this.start = this.nodes.get(0);
        }
    }

    // assuming no duplicate ids for ease
    AddNode(id, val, adj = []) {
        let existing = this.nodes.get(id);

        if(existing)
            this.ModifyNode(id, val, adj);
        else {
            let newNode = new GraphNode(id, val, adj);

            this.nodes.set(id, newNode);

            // set start if this is the first node
            if(this.nodes.size == 1)
                this.start = newNode;

            newNode.adj.forEach((neighborID, value) => {
                // get neighbor node from our node map
                var neighbor = this.nodes.get(neighborID);
    
                // create our neighbor if it doesn't exist
                if(!neighbor) {
                    this.AddNode(neighborID, neighborID, []);
                    neighbor = this.nodes.get(neighborID);
                }
    
                // set the neight node to our new node's adjceny list with the neighbor id
                newNode.adj.set(neighbor.id, neighbor);
            });

            return newNode;
        }

        return existing;
    }

    // allow modification node values
    ModifyNode(id, val, adj = [], weights = new Map()) {
        let node = this.nodes.get(id);
        node.val = val;
        node.weights = weights;

        // add edges, if any
        adj.forEach(neighborID => {
            this.AddEdge(id, neighborID, node.weights.get(neighborID));
        });

        return node;
    }

    // add a new edge based on the source and destination IDs
    AddEdge(sourceNodeID, destNodeID, weight = 0) {
        let source = this.nodes.get(sourceNodeID);
        let dest = this.nodes.get(destNodeID);

        if(!source) // if this source doesn't exist, create it
            source = this.AddNode(sourceNodeID, sourceNodeID, [destNodeID]);
        
        if(!dest) 
            dest = this.AddNode(destNodeID, destNodeID, []);

        source.adj.set(dest.id, dest);
        source.weights.set(dest.id, weight);
        if(this.nodes.size == 0)
                this.start = newNode;
    }

    // modifies an edge weight
    ModifyEdgeWeight(sourceNodeID, destNodeID, weight) {
        let source = this.nodes.get(sourceNodeID);
        let dest = this.nodes.get(destNodeID);

        if(!source)
            throw Error("Source node does not exist");
        if(!dest)
            throw Error("Destination node does not exist");

        source.weights.set(dest.id, weight);
    }

    /*
    Breadth-First Search
    Returns - list of GraphNodes in the processed order
    */
    BFS(s = this.start) {
        let result = [];
        let queue = [];
        let visited = new Map();
        
        this.nodes.forEach((node) => visited.set(node.id, false));

        // initialize
        queue.push(s);
        visited.set(s.id, true);

        let currentNode = null;
        
        while(queue.length > 0) {
            // get the next node
            currentNode = queue.shift();

            result.push(currentNode);

            currentNode.adj.forEach(neighbor => {
                // if we haven't visited this node then add it to our queue
                if(!visited.get(neighbor.id)) {
                    // mark that we've visited this node
                    visited.set(neighbor.id, true);
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }

    /*
    Depth-First Search
    Could implement this recursively, but I'm not to save memory space
    Implementing with stack instead
    Returns - list of GraphNodes in the processed order
    */
    DFS(s = this.start) {
        let result = [];
        let stack = [];
        let visited = new Map();
        
        this.nodes.forEach((node) => visited.set(node.id, false));

        // initialize
        stack.push(s);
        visited.set(s.id, true);

        let currentNode = null;
        
        while(stack.length > 0) {
            // get next node
            currentNode = stack.pop();

            result.push(currentNode);

            currentNode.adj.forEach(neighbor => {
                // if we haven't visited this node then add it to our stack
                if(!visited.get(neighbor.id)) {
                    // mark that we've visited this node
                    visited.set(neighbor.id, true);
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }
}


var main = async function(graph) {
    graph = [[1,2,4], [3,4], [1], [], []];
    let g = new Graph(graph);

    g.AddNode(274, {name:"ObjectNode"}, [1,4]);
    g.AddEdge(1, 274);

    g.AddNode("NEWNODE!", {name:"Different object ready to be noded"}, [274, 0, 2]);
    g.AddEdge(274, "NEWNODE!");
    g.AddEdge(4, "NEWNODE!");

    console.log("BFS Begin: ");
    let bfs = await g.BFS();
    console.log(...bfs);

    console.log("DFS Begin: ");
    let dfs = await g.DFS();
    console.log(...dfs);

        
    let minHeap = new BinaryMinHeap([], 'weight');
    g.nodes.forEach(node => {
        node.adj.forEach(neighbor => {
            minHeap.Insert({weight: node.weights.get(neighbor.id), node: neighbor});
        });
    });

    let order = [];
    while(minHeap.Min()) {
        order.push(minHeap.Pop());
    }
    console.log(...order);
};

main();
// let g = new Graph();

// g.AddEdge(0,1,2);
// g.AddEdge(0,2,2);
// g.AddEdge(0,4,4);
// g.AddEdge(1,3,3);
// g.AddEdge(2,1,1);

// let minHeap = new BinaryMinHeap([], 'weight');
// g.nodes.forEach(node => {
//     node.adj.forEach(neighbor => {
//         minHeap.Insert({weight: node.weights.get(neighbor.id), node: neighbor});
//     });
// });

// let order = [];
// while(minHeap.Min()) {
//     order.push(minHeap.Pop());
// }
// console.log(...order);