using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace testapp
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(getNextNumber());
            int m = int.Parse(getNextNumber());

            List<int>[] adj = new List<int>[n];
            List<int>[] cost = new List<int>[n];

            for (int i = 0; i < m; i++)
            {
                int a = int.Parse(getNextNumber());
                int b = int.Parse(getNextNumber());
                int w = int.Parse(getNextNumber());

                // create new adj list
                if (adj[a-1] == null)
                {
                    List<int> adjI = new List<int>();
                    adj[a - 1] = adjI;
                }

                adj[a - 1].Add(b - 1);

                // create new cost list
                if (cost[a - 1] == null)
                {
                    List<int> costI = new List<int>();
                    cost[a - 1] = costI;
                }

                cost[a - 1].Add(w);
            }

            //int s = 0;// int.Parse(getNextNumber()) - 1;
            //int t = int.Parse(getNextNumber()) - 1;

            Console.Out.WriteLine(hasNegativeCycle(adj, cost) == true ? 1 : 0);
        }

        private static string getNextNumber()
        {
            string result = "";
            int ascii = Console.In.Read();
            char c = (char)ascii;

            // if the next char is not a number, read until we find one
            if (!char.IsNumber(c))
            {
                while (!char.IsNumber(c) && c != '-')
                {
                    ascii = Console.In.Read();
                    c = (char)ascii;
                }
            }

            result += c;

            // while we still have numbers next, add to string result
            while (char.IsNumber((char)Console.In.Peek()))
            {
                ascii = Console.In.Read();
                c = (char)ascii;
                result += c;
            }

            return result;
        }

        private static string[] negativeCycle(List<int>[] adj, List<int>[] cost, int s)
        {
            // known distances and prev nodes
            int?[] dist = new int?[adj.Length];
            int?[] prev = new int?[adj.Length];

            for (int i = 0; i < dist.Length; i++)
            {
                dist[i] = int.MaxValue;
                prev[i] = null;
            }

            return findNegativeCycle(dist, prev, adj, cost, s);
        }

        private static bool hasNegativeCycle(List<int>[] adj, List<int>[] cost)
        {
            // known distances
            double[] dist = new double[adj.Length];

            for (int i = 0; i < dist.Length; i++)
            {
                dist[i] = double.PositiveInfinity;
            }

            // dfs with visited array
            bool[] visited = new bool[adj.Length];

            for(int i = 0; i < adj.Length; i++)
            {
                if(visited[i] == false)
                {
                    if (hasNegativeCycle(dist, adj, cost, i))
                        return true;

                    for(int d = 0; d < adj.Length; d++)
                    {
                        if (!double.IsPositiveInfinity(dist[d]))
                            visited[d] = true;
                    }
                }
            }
            return false;
        }

        private static bool hasNegativeCycle(double[] dist, List<int>[] adj, List<int>[] cost, int s)
        {
            // set initial distance
            dist[s] = 0;

            // perform relaxations v times for our set of v graph nodes
            for (int i = 0; i < adj.Length; i++)
            {
                // cycle through all edges in our adjcency list edge set
                for (int u = 0; u < adj.Length; u++)
                {
                    if (adj[u] == null) continue;

                    for (int a = 0; a < adj[u].Count; a++)
                    {
                        // get the next node from our adjacency list
                        var v = adj[u][a];

                        // if the distance of the next node is greater than our current distance plus the weight of the edge,
                        // relax the edge
                        // int.MaxValue means this node is not reachable from s
                        if (dist[v] > dist[u] + cost[u][a])
                        {
                            // RELAX
                            dist[v] = dist[u] + cost[u][a];
                            if (i == adj.Length - 1)
                                return true;
                        }
                    }
                }
            }

            return false;
        }

        private static string[] findNegativeCycle(int?[] dist, int?[] prev, List<int>[] adj, List<int>[] cost, int s)
        {
            dist[s] = 0;

            int counter = 1;
            int i = s;
            List<int> negativeCycle = new List<int>();

            // perform relaxations v times for our set of v graph nodes
            while (counter <= dist.Length + 1)
            {
                // during this iteration we'll keep track of the relaxed node
                negativeCycle = new List<int>();

                // if we've reached the end of our array,
                // then cycle to the beginning
                if (i == dist.Length) i = 0;

                // cycle through all edges in our adjcency list edge set
                for (int u = 0; u < adj.Length; u++)
                {
                    if (adj[u] == null) continue;

                    for (int a = 0; a < adj[u].Count; a++)
                    {
                        int r = relax(dist, prev, adj, cost, u, a);

                        if (r != -1)
                            negativeCycle.Add(r);
                    }
                }

                // our final condition to check
                // can we relax on the vth iteration
                if (counter == adj.Length + 1 && negativeCycle.Count > 0)
                    break;
                else if (negativeCycle.Count == 0) // if we reached this point without a relaxed node, then we know we do not have a negatice cycle
                    break;

                // increment our counter and index
                counter++;
                i++;
            }

            if(negativeCycle.Count > 0)
            {
                // loop through our negative cycle and collect all the nodes in the cycle
                int start = negativeCycle.First();
                int current = prev[start].Value;
                while (start != current)
                {
                    if (!negativeCycle.Contains(current))
                        negativeCycle.Add(current);

                    current = prev[current].Value;
                }
            }

            string[] distS = new string[dist.Length];

            for(int u = 0; u < dist.Length; u++)
            {
                if (negativeCycle.Contains(u))
                    distS[u] = "-";
                else if (dist[u] == int.MaxValue)
                    distS[u] = "*";
                else
                    distS[u] = dist[u].ToString();
            }

            return distS;
        }

        private static int relax(int?[] dist, int?[] prev, List<int>[] adj, List<int>[] cost, int u, int a)
        {
            // index of relaxed node
            int relaxed = -1;

            // get the next node from our adjacency list
            var v = adj[u][a];

            // if the distance of the next node is greater than our current distance plus the weight of the edge,
            // relax the edge
            // int.MaxValue means this node is not reachable from s
            if (dist[v] > dist[u] + cost[u][a] && dist[u] != int.MaxValue)
            {
                // RELAX
                dist[v] = dist[u] + cost[u][a];

                // set the previous pointer of the next node to this node
                prev[v] = u;

                // since we relaxed v, set relaxed to v
                relaxed = v;
            }

            return relaxed;
        }

        private static int distance(List<int>[] adj, List<int>[] cost, int s, int t)
        {
            // known distances and prev nodes
            int?[] dist = new int?[adj.Length];
            int?[] prev = new int?[adj.Length];

            for(int i = 0; i < dist.Length; i++)
            {
                dist[i] = int.MaxValue;
                prev[i] = null;
            }

            dist = getDistanceVector(dist, prev, adj, cost, s, t);

            return dist[t].Value == int.MaxValue ? -1 : dist[t].Value;
        }

        private static int?[] getDistanceVector(int?[] dist, int?[] prev, List<int>[] adj, List<int>[] cost, int s, int t)
        {
            List<AdjNode> priorityQueue = new List<AdjNode>();

            // add distance to s which is zero
            dist[s] = 0;
            priorityQueue.Add(new AdjNode(s, 0));
            
            // create the priority queue
            for(int i = 1; i < adj.Length; i++)
            {
                priorityQueue.Add(new AdjNode(i, int.MaxValue));
            }

            // continue while we still have nodes to process
            while (priorityQueue.Count != 0)
            {
                AdjNode min = ExtractMin(priorityQueue);
                if(adj[min.u] != null)
                {
                    for (int i = 0; i < adj[min.u].Count; i++)
                    {
                        int relaxed = relax(dist, prev, adj, cost, min.u, i);

                        if(relaxed != -1) changePriority(priorityQueue, relaxed, dist[relaxed].Value);
                        //// get the next node from our adjacency list
                        //var v = adj[min.u][i];

                        //// if the distance of the next node is greater than our current distance plue the weight of the edge,
                        //// relax the edge
                        //// int.MaxValue means this node is not reachable from s
                        //if (dist[v] > dist[min.u] + cost[min.u][i] && dist[min.u] != int.MaxValue)
                        //{
                        //    // RELAX
                        //    dist[v] = dist[min.u] + cost[min.u][i];

                        //    // set the previous pointer of the next node to this node
                        //    prev[v] = min.u;

                        //    // change the distance in our priority queue
                            
                        //}
                    }
                }
            }

            // return our distance vector
            return dist;
        }

        private static AdjNode ExtractMin(List<AdjNode> priorityQueue)
        {
            AdjNode min = priorityQueue.First();

            foreach(var t in priorityQueue)
            {
                if (t.d < min.d)
                    min = t;
            }

            priorityQueue.Remove(min);

            return min;
        }

        private static void changePriority(List<AdjNode> priorityQueue, int u, int d)
        {
            for(var i = 0; i < priorityQueue.Count; i++)
            {
                if(priorityQueue[i].u == u)
                {
                    priorityQueue[i].d = d;
                    return;
                }
            }
        }

        public class AdjNode
        {
            public int u { get; set; }
            public int d { get; set; }

            public AdjNode(int u, int d)
            {
                this.u = u;
                this.d = d;
            }
        }
    }
}
