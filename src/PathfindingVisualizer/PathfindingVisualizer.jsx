import React, { Component } from "react";
import Node from "./Node/Node";
import { Dijkstra } from "../Algorithms/Dijkstra";
import { Astar } from "../Algorithms/Astar";
import { BFS } from "../Algorithms/BFS";
import { DFS } from "../Algorithms/DFS";
import { GetShortestPath } from "../Algorithms/GetShortestPath";
import { RandomMaze } from "../MazeGeneration/RandomMaze";
import { RecursiveDivision } from "../MazeGeneration/RecursiveDivision";
import AppNavbar from "../Design/AppNavBar/AppNavBar";

import "./PathfindingVisualizer.css";

const ROW = 20;
const COL = 45;
const START_NODE_ROW = 5;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isVisualizing: false,
      mouseIsPressed: false,
      nodeIsPressed: "",
      startPosition: [START_NODE_ROW, START_NODE_COL],
      finishPosition: [FINISH_NODE_ROW, FINISH_NODE_COL],
      currRow: 0,
      currCol: 0,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
    };
  }

  componentDidMount() {
    const { startPosition, finishPosition } = this.state;
    const grid = getInitialGrid(startPosition, finishPosition);
    this.setState({ grid });
  }

  /*--------------------------------------------------- handle MouseEvents -----------------------------------------------------*/
  handleMouseDown(row, col) {
    const { grid } = this.state;
    const node = grid[row][col];
    if (node.isStart === true && node.isFinish === false) {
      this.setState({ nodeIsPressed: "Start" });
      node.isStart = false;
    } else if (node.isStart === false && node.isFinish === true) {
      this.setState({ nodeIsPressed: "Finish" });
      node.isFinish = false;
    } else {
      const newGrid = getNewGridWithWall(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    const { grid, nodeIsPressed, mouseIsPressed } = this.state;
    if (nodeIsPressed === "Start") {
      const newGrid = getDynamicGrid(grid, row, col, "Start");
      this.setState({ grid: newGrid });
    }

    if (nodeIsPressed === "Finish") {
      const newGrid = getDynamicGrid(grid, row, col, "Finish");
      this.setState({ grid: newGrid });
    }
    if (mouseIsPressed && nodeIsPressed === "") {
      const newGrid = getNewGridWithWall(grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp(row, col) {
    const { nodeIsPressed, grid } = this.state;
    if (nodeIsPressed === "Start") {
      const newStartPosition = [row, col];
      const newGrid = getDynamicGrid(grid, row, col, "Start");
      this.setState({
        grid: newGrid,
        nodeIsPressed: "",
        startPosition: newStartPosition,
      });
    }
    if (nodeIsPressed === "Finish") {
      const newFinishPosition = [row, col];
      const newGrid = getDynamicGrid(grid, row, col, "Finish");
      this.setState({
        grid: newGrid,
        nodeIsPressed: "",
        finishPosition: newFinishPosition,
      });
    }
    this.setState({ mouseIsPressed: false });
  }

  handleMouseLeave(row, col) {
    const { grid, nodeIsPressed } = this.state;
    if (nodeIsPressed === "") return;
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    if (nodeIsPressed === "Start") {
      const newNode = {
        ...node,
        isStart: false,
      };
      newGrid[row][col] = newNode;
    }
    if (nodeIsPressed === "Finish") {
      const newNode = {
        ...node,
        isFinish: false,
      };
      newGrid[row][col] = newNode;
    }
    this.setState({
      grid: newGrid,
    });
  }

  /*--------------------------------------------------- Visualize Algorithms -----------------------------------------------------*/
  animatePathfinding(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 20 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 90 * i);
    }
    this.setState({ isVisualizing: false });
  }

  visualizeAlgorithm = (algorithm) => {
    if (this.state.isVisualizing) return;
    this.setState({ isVisualizing: true });
    const { grid, startPosition, finishPosition } = this.state;
    const sX = startPosition[0],
      sY = startPosition[1];
    const fX = finishPosition[0],
      fY = finishPosition[1];
    const startNode = grid[sX][sY];
    const finishNode = grid[fX][fY];

    let visitedNodes;
    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = Dijkstra(grid, startNode, finishNode);
        break;
      case "Astar":
        visitedNodes = Astar(grid, startNode, finishNode);
        break;
      case "BFS":
        visitedNodes = BFS(grid, startNode, finishNode);
        break;
      case "DFS":
        visitedNodes = DFS(grid, startNode, finishNode);
        break;
      default:
        break;
    }
    const nodesInShortestPath = GetShortestPath(finishNode);
    this.animatePathfinding(visitedNodes, nodesInShortestPath);
  };

  /*--------------------------------------------------- Generate Maze -----------------------------------------------------*/
  animateMaze(walls) {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          this.clearGrid();
          let newGrid = getNewGridWithMaze(this.state.grid, walls);
          this.setState({ grid: newGrid, isVisualizing: false });
        }, 15 * i);
        return;
      }
      let wall = walls[i];
      let node = this.state.grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall-animated";
      }, 15 * i);
    }
  }

  visualizeMaze = (method) => {
    if (this.state.isVisualizing) return;
    this.setState({ isVisualizing: true });
    const { grid, startPosition, finishPosition } = this.state;
    const sX = startPosition[0],
      sY = startPosition[1];
    const fX = finishPosition[0],
      fY = finishPosition[1];
    const startNode = grid[sX][sY];
    const finishNode = grid[fX][fY];

    let walls;
    switch (method) {
      case "Random":
        walls = RandomMaze(grid, startNode, finishNode);
        break;
      case "RecursiveDivision":
        walls = RecursiveDivision(grid, startNode, finishNode);
        break;
      default:
        break;
    }
    this.animateMaze(walls);
  };

  /*---------------------------------------------------Clear functions-----------------------------------------------------*/
  clearGrid() {
    if (this.state.isVisualizing) return;
    const { startPosition, finishPosition } = this.state;
    const sX = startPosition[0],
      sY = startPosition[1];
    const fX = finishPosition[0],
      fY = finishPosition[1];

    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (!((row === sX && col === sY) || (row === fX && col === fY))) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getInitialGrid(startPosition, finishPosition);
    this.setState({
      grid: newGrid,
    });
  }

  clearPath() {
    if (this.state.isVisualizing) return;
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-visited"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getGridWithoutPath(this.state.grid);
    this.setState({ grid: newGrid, visitedNodes: 0, shortestNodes: 0 });
  }

  /*--------------------------------------------------- Return -----------------------------------------------------*/
  render() {
    const { grid, mouseIsPressed, isVisualizing } = this.state;
    return (
      <>
        {/* <button onClick={() => this.visualizeDijkstra()}> Visualize </button> */}
        <AppNavbar
          isVisualizing={isVisualizing}
          handleVisualization={this.visualizeAlgorithm}
          handleMazeGeneration={this.visualizeMaze}
          handleClearGrid={this.clearGrid.bind(this)}
          handleClearPath={this.clearPath.bind(this)}
        />
        <table className="grid">
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIndex) => {
                    const { row, col, isStart, isFinish, isWall } = node;
                    return (
                      <Node
                        key={nodeIndex}
                        row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseLeave={(row, col) =>
                          this.handleMouseLeave(row, col)
                        }
                      ></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

const createNode = (row, col, startPosition, finishPosition) => {
  return {
    row,
    col,
    isStart: row === startPosition[0] && col === startPosition[1],
    isFinish: row === finishPosition[0] && col === finishPosition[1],
    isWall: false,
    isFinished: false,
    previousNode: null,
    distance: Infinity,
  };
};

const getInitialGrid = (startPosition, finishPosition) => {
  const grid = [];
  for (let row = 0; row < ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < COL; col++) {
      currentRow.push(createNode(row, col, startPosition, finishPosition));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getDynamicGrid = (grid, row, col, nodeType) => {
  console.log(`start node is currently at: row: ${row} col: ${col}`);
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  let newNode;
  if (nodeType === "Start") {
    newNode = {
      ...node,
      isStart: true,
    };
  }

  if (nodeType === "Finish") {
    newNode = {
      ...node,
      isFinish: true,
    };
  }
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// updating the grid, resetting the features except for the walls
const getGridWithoutPath = (grid) => {
  let newGrid = grid.slice();
  for (let row of grid) {
    for (let node of row) {
      let newNode = {
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        distanceToFinishNode:
          Math.abs(FINISH_NODE_ROW - node.row) +
          Math.abs(FINISH_NODE_COL - node.col),
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  return newGrid;
};

const getNewGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};
