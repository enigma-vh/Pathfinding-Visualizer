import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppNavBar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledButtonDropdown,
} from "reactstrap";
import logo from "../Images/path.svg";

export default class AppNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      algorithm: "Visualize!",
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  selectAlgorithm(selection) {
    if (this.props.isVisualizing) return;
    if (
      this.state.algorithm === "Visualize!" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: selection });
    } else {
      this.props.handleClearPath();
      this.setState({ algorithm: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.isVisualizing) return;
    var handleVisualization = this.props.handleVisualization;
    if (
      this.state.algorithm === "Visualize!" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: "Select an Algorithm!" });
    } else {
      this.props.handleClearPath();
      if (this.state.algorithm === "Visualize Dijkstra")
        handleVisualization("Dijkstra");
      else if (this.state.algorithm === "Visualize A*")
        handleVisualization("Astar");
      else if (this.state.algorithm === "Visualize BFS")
        handleVisualization("BFS");
      else if (this.state.algorithm === "Visualize DFS")
        handleVisualization("DFS");
    }
  }

  visualizeMaze(selection) {
    if (this.props.isVisualizing) return;
    var handleMazeGeneration = this.props.handleMazeGeneration;

    if (selection === "Random") handleMazeGeneration("Random");
    else if (selection === "RecursiveDivision")
      handleMazeGeneration("RecursiveDivision");
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img
              alt="logo"
              src={logo}
              style={{
                height: 38,
                width: 38,
                display: "inline-block",
                paddingRight: 5,
              }}
            />
            Visualizer
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavLink
              className="item"
              href="https://github.com/enigma-vh/Pathfinidng-Visualizer"
            >
              GitHub
            </NavLink>
          </Nav>
          <NavbarToggler onClick={this.toggle} color="white" />
          <Collapse isOpen={this.state.isOpen} navbar>
            {/* Left Elements */}
            <Nav className="ms-auto nav-custom" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="item">
                  Algorithms
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      this.selectAlgorithm("Visualize Dijkstra");
                    }}
                  >
                    Dijkstra's Algorithm
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.selectAlgorithm("Visualize A*");
                    }}
                  >
                    A* Search
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      this.selectAlgorithm("Visualize BFS");
                    }}
                  >
                    Breadth First Search
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.selectAlgorithm("Visualize DFS");
                    }}
                  >
                    Depth First Search
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="item">
                  Maze Generation
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      this.visualizeMaze("Random");
                    }}
                  >
                    Randomize{" "}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.visualizeMaze("RecursiveDivision");
                    }}
                  >
                    Recursive Division
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button
                className="btn-Custom"
                color="warning"
                onClick={() => {
                  this.visualizeAlgorithm();
                }}
              >
                {this.state.algorithm}
              </Button>
              <UncontrolledButtonDropdown>
                <DropdownToggle caret color="danger">
                  Clear
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      this.props.handleClearGrid();
                    }}
                  >
                    Clear Grid
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.handleClearPath();
                    }}
                  >
                    Clear Path
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
