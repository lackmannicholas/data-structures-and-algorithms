class GraphNode {
    constructor(val, adj = []) {
        this.val = val;
        this.adj = adj;
    }
}

class Graph {
    constructor(graph) {
        if(graph && graph.length > 0) {
            this.nodes = graph;
            this.start = 0;
            this.end = graph.length-1;
        }
        else {
            this.nodes = [];
            this.start = null;
            this.end = null;
        }
    }

    findAllPaths(node) {
        if(node == this.nodes.length - 1) return [[node]];

        let result = [];

        if(this.nodes[node]) {
            this.nodes[node].forEach(n => {
                this.findAllPaths(n).forEach(path => {
                    result.push([node, ...path]);
                })
            });
        }
        
        return result;
    }

    DFS (node, path, result) {
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
    
    return g.findAllPaths(0);
};

let graph = [[1,2], [3], [3], []] ;

allPathsSourceTarget(graph);