# PATHFINDING AND MAZE GENERATION VISUALIZER
This is a React application to visualize Pathfinding Algorithms and Maze Generation Algorithms. Feel free to fork or download this project so you could try it out and use this code as a foundation to create an even-better Pathfinding Visualizer :grin:.

You can also visit this link to experiment with the Visualizer.

## Preview (A* Search Algorithm with Random Maze): 

<p align="center">
  <img src="test.gif" width="880">
</p>

## Features in the application
### Algorithms
1) Dijsktra's Algorithm
2) A* Search Algorithm
3) Breadth First Search (BFS)
4) Depth First Search (DFS)

### Maze generation algorithms
1) Random Maze - It's just a simple algorithm which creates walls based on the output of a random function.

2) Recursive Division - Mazes can be created with recursive division, an algorithm which works as follows: Begin with the maze's space with no walls. Call this a chamber. Divide the chamber with a randomly positioned wall (or multiple walls) where each wall contains a randomly positioned passage opening within it. Then recursively repeat the process on the subchambers until all chambers are minimum sized. This method results in mazes with long straight walls crossing their space, making it easier to see which areas to avoid.

# Getting Started
## 1. Clone the repository or download the zip
```
git clone 
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

-- [Hao On][https://www.linkedin.com/in/hao-on/]
