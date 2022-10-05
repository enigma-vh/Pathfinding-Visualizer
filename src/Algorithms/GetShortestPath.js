// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function GetShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    if (currentNode !== finishNode)
      nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
