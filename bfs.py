#Uses python3

import sys
import queue

class Graph:
    def __init__(self, adj):
        self.discovered = queue.Queue()
        self.adj = adj
        self.visited = [0 for x in range(len(adj))]
        self.depth = [-1 for x in range(len(adj))]
        self.isBipartite = False

    def bfs(self, s):
        self.visited[s] = 1
        self.depth[s] = 0
        self.discovered.put(s)

        # while our queue is not empty, keep pulling out nodes
        while not self.discovered.empty():
            u = self.discovered.get()
            for i in self.adj[u]:
                if self.depth[i] == -1:
                    self.depth[i] = self.depth[u] + 1
                    self.discovered.put(i)
                elif self.depth[i] == self.depth[u]:
                    self.isBipartite = True

def distance(adj, s, t):
    graph = Graph(adj)
    graph.bfs(s)
    return graph.depth[t]

# Coursera scaffolding
if __name__ == '__main__':
    input = sys.stdin.read()
    data = list(map(int, input.split()))
    n, m = data[0:2]
    data = data[2:]
    edges = list(zip(data[0:(2 * m):2], data[1:(2 * m):2]))
    adj = [[] for _ in range(n)]
    for (a, b) in edges:
        adj[a - 1].append(b - 1)
        adj[b - 1].append(a - 1)
    s, t = data[2 * m] - 1, data[2 * m + 1] - 1
    print(distance(adj, s, t))
