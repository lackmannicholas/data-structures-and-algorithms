const BinaryMinHeap = require("./BinaryMinHeap");

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

class Graph {
    constructor(graph) {
        this.nodes = new Map();
        this.start = null;

        // assuming we're getting a array of adjacency lists where the node value is it's position in
        // the array
        if(graph && graph.length > 0) {
            // for each index in the graph array, build a GraphNode
            graph.forEach((adj, i) => {
                let newNode = new GraphNode(i, i, adj);
                this.nodes.set(i, newNode);
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

            newNode.adj.forEach((weight, neighborID) => {
                // get neighbor node from our node map
                var neighbor = this.nodes.get(neighborID);
    
                // create our neighbor if it doesn't exist
                if(!neighbor) {
                    this.AddNode(neighborID, neighborID, []);
                    neighbor = this.nodes.get(neighborID);
                }
    
                // set the neight node to our new node's adjceny list with the neighbor id
                newNode.adj.set(neighbor.id, 0);
            });

            return newNode;
        }

        return existing;
    }

    // allow modification node values
    ModifyNode(id, val, adj = []) {
        let node = this.nodes.get(id);
        node.val = val;

        // add edges, if any
        adj.forEach(neighborID => {
            this.AddEdge(id, neighborID, node.get(neighborID));
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

        source.adj.set(dest.id, weight);

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

        source.adj.set(destNodeID, weight);
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

            currentNode.adj.forEach((weight, id) => {
                let neighbor = this.nodes.get(id);

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

            currentNode.adj.forEach((weight, id) => {
                let neighbor = this.nodes.get(id);

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

    // returns an object with the distance, and path to the requested node
    DijkstraShortestPath(e, s = this.start) {
        if(typeof(s) ===  "number")
            s = this.nodes.get(s);

        //initialize
        let dist = new Map();
        let prev = new Map();
        let processed = new Set();

        let heap = new BinaryMinHeap([], "weight");
        heap.insert({weight: 0, node: s});
        dist.set(s.id, 0);
        prev.set(s.id, null);

        while(heap.size > 0) {
            let min = heap.pop();

            // keep track of our set of processed nodes
            processed.add(min.node.id);

            min.node.adj.forEach((weight, neighborID) => {
                // if we've already found the shortest distance, move on
                if(!processed.has(neighborID)) {
                    let newDist = dist.get(min.node.id) + weight;
                    let prevDist = dist.get(neighborID);
    
                    // if we don't have previous distance, add to heap w/ dist
                    if(prevDist === null || prevDist === undefined) {
                        dist.set(neighborID, newDist);
                        prev.set(neighborID, min.node.id);
    
                        heap.insert({weight: newDist, node: this.nodes.get(neighborID)});
                    } // or the new distance is less than the previous
                    else if(newDist < prevDist) {
                        dist.set(neighborID, newDist);
                        prev.set(neighborID, min.node.id);
    
                        heap.modify({weight: prevDist, node: this.nodes.get(neighborID)}, newDist);
                    }
                }
            });
        }

        console.log("Distances from " + s.id.toString() + ":");
        // done what do we have?
        dist.forEach((value, key) => {
            console.log("ID: " + key + "    Distance: " + value);
        });
    }
}


var main = function() {
    //graph = [[1,2,4], [3,4], [1], [], []];
    
    let g = new Graph();

    let graph = [[0,1,3], [0,2,4], [0,4,1], [1,3,2], [2,1,.5]];

    graph.forEach(edge => {
        g.AddEdge(edge[0], edge[1], edge[2]);
    });

    g.AddNode(274, {name:"ObjectNode"});
    g.AddEdge(274, 1, .44246);
    g.AddEdge(274, 4, 45);
    g.AddEdge(1, 274, 12);

    g.AddNode("NEWNODE!", {name:"Different object ready to be noded"});
    g.AddEdge("NEWNODE!", 274, 3);
    g.AddEdge("NEWNODE!", 0, 0);
    g.AddEdge("NEWNODE!", 2, 2.75);
    g.AddEdge(274, "NEWNODE!",3);
    g.AddEdge(4, "NEWNODE!", 6);

    g.ModifyNode(2, {object: "AHHHH"});

    // shortest path from 0 to 274
    let dijk = g.DijkstraShortestPath(274, 0);



    // console.log("BFS Begin: ");
    // let bfs = g.BFS();
    // console.log(...bfs);

    // console.log("DFS Begin: ");
    // let dfs = g.DFS();
    // console.log(...dfs);

    // let minHeap = new BinaryMinHeap([], 'weight');
    // g.nodes.forEach(node => {
    //     node.adj.forEach((weight, id) => {
    //         let neighbor = g.nodes.get(id);
    //         minHeap.Insert({weight: node.adj.get(neighbor.id), node: neighbor});
    //     });
    // });

    // let order = [];
    // while(minHeap.Min()) {
    //     order.push(minHeap.Pop());
    // }
    // console.log(...order);
};

main();