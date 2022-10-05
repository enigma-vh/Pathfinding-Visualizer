import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    const extraClassName = isStart
      ? "node-start"
      : isFinish
      ? "node-finish"
      : isWall
      ? "node-wall"
      : "";

    return (
      <th
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseUp={() => onMouseUp(row, col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseLeave={() => onMouseLeave(row, col)}
      ></th>
    );
  }
}
