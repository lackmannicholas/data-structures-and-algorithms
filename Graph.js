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

    BFS(start, end) {

    }

    DFS() {

    }

    dfs (node, path, result) {
        // this is not the node you're looking for
        if(node == this.end) {
            // add last node to path
            path.push(node);

            // add path to results
            result.push([...path]);

            return;
        }

        path.push(node);

        for(var i = 0; i < this.nodes[node].length; i++) {
            this.DFS(this.nodes[node][i], path, result);
            
            path.pop();
            if(this.nodes[node][i] == this.end)
                break;
        }

        return;
    }
}


var allPathsSourceTarget = function(graph) {
    let g = new Graph(graph);
    
    return;
};

let graph = [[1,2], [3], [3], []];

allPathsSourceTarget(graph);