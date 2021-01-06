class GraphNode {
    constructor(val, adj = []) {
        this.val = val;
        this.adj = adj;
    }
}

class Graph {
    constructor(graph) {
        // assuming we're getting a array of adjacency lists where the node value is it's position in
        // the array
        if(graph && graph.length > 0) {
            this.nodes = [];
            graph.forEach((adj, i) => {
                let gNode = new GraphNode(i, adj);
                this.nodes.push(gNode);
            });

            this.nodes.forEach((node, i) => {
                for(var i = 0; i < node.adj.length; i++) {
                    var neighbor = node.adj[i];
                    node.adj[i] = this.nodes[neighbor];
                }
            });

            this.start = 0;
            this.end = graph.length-1;
        }
        else {
            this.nodes = [];
            this.start = null;
            this.end = null;
        }
    }

    // assuming no duplicates for ease
    AddNode(val, adj = []) {
        let newNode = new GraphNode(val, adj);

        this.nodes.push(newNode);

        newNode.adj.forEach(adj => {
            var neighbor = node.adj[i];
            node.adj[i] = this.nodes[neighbor];
        });
    }

    BFS(s = this.nodes[0]) {
        console.log("BFS Begin:");

        let queue = [];
        let visited = this.nodes.map(node => false);

        // initialize
        queue.push(s);
        visited[s.val] = true;

        let currentNode = null;
        
        while(queue.length > 0) {
            // get the next node
            currentNode = queue.shift();

            console.log(currentNode.val);

            currentNode.adj.forEach(node => {
                // if we haven't visited this node then add it to our queue
                if(!visited[node.val]) {
                    // mark that we've visited this node
                    visited[node.val] = true;
                    queue.push(node);
                }
            });
        }
    }

    // could implement this recursively, but I'm not to save memory space
    // implementing with stack instead
    DFS(s = this.nodes[0]) {
        console.log("DFS Begin:");

        let stack = [];
        let visited = [];

        // initialize
        stack.push(s);
        visited[s.val] = true;

        let currentNode = null;
        
        while(stack.length > 0) {
            currentNode = stack.pop();

            console.log(currentNode.val);

            currentNode.adj.forEach(neighbor => {
                if(!visited[neighbor.val]) {
                    visited[neighbor.val] = true;
                    stack.push(neighbor);
                }
            });
        }
    }
}


var main = function(graph) {
    let g = new Graph(graph);
    g.BFS();
    g.DFS();
    return;
};

let graph = [[1,2,4], [3,4], [1], [], []];

main(graph);