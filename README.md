# PATHFINDING AND MAZE GENERATION VISUALIZER
This is a React application to visualize Pathfinding Algorithms and Maze Generation Algorithms. Feel free to fork or download this project so you could try it out and use this code as a foundation to create an even-better Pathfinding Visualizer :grin:.

You can also visit this link to experiment with the Visualizer.

## Preview (A* Search Algorithm with Random Maze): 

<p align="center">
  <img src="test.gif" width="880">
</p>

## Features in the application
### Algorithms
1) Dijsktra - Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

2) DFS - Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.

3) BFS - Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses the opposite strategy of depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes.

4) A* - A* is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its O(b^d) space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as memory-bounded approaches; however, A* is still the best solution in many cases.

### Maze generation algorithms
1) Random Maze - It's just a simple algorithm which creates walls based on the output of a random function.

2) Recursive Division - Mazes can be created with recursive division, an algorithm which works as follows: Begin with the maze's space with no walls. Call this a chamber. Divide the chamber with a randomly positioned wall (or multiple walls) where each wall contains a randomly positioned passage opening within it. Then recursively repeat the process on the subchambers until all chambers are minimum sized. This method results in mazes with long straight walls crossing their space, making it easier to see which areas to avoid.

# Getting Started
## 1. Clone the repository or download the zip
```
git clone https://github.com/Sethuram52001/Path-Finding-Visualizer.git
```

## 2. Install the dependencies
```
npm install
```

## 3.Adding Boostrap
```
npm i bootstrap
npm i reactstrap react react-dom
```
Don't forget to import Boostrap CSS
```
import 'bootstrap/dist/css/bootstrap.css';
```

## 4. Start the application
```
npm start
```
## Thank you

I hope you enjoy the project.

-- [Hao On][https://www.linkedin.com/in/rohithsp/](https://www.linkedin.com/in/hao-on/)
