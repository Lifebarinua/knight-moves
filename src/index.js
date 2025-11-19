
function knightMoves(start, end) {
  const boardSize = 8;

  // All possible knight moves (L-shape)
  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];

  const isValid = ([x, y]) =>
    x >= 0 && x < boardSize && y >= 0 && y < boardSize;

  // --- Visualization: Print the 8x8 board ---
  console.log("🟦 Chessboard (0–7 range in both directions):");
  for (let y = boardSize - 1; y >= 0; y--) {
    let row = "";
    for (let x = 0; x < boardSize; x++) {
      row += `[${x},${y}] `;
    }
    console.log(row);
  }
  console.log("\n");

  // --- BFS Setup ---
  const queue = [[start]]; // store full paths
  const visited = new Set();
  visited.add(start.toString());

  console.log(`🚀 Starting BFS from ${start} to ${end}\n`);

  while (queue.length > 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    // ✅ Check goal
    if (x === end[0] && y === end[1]) {
      console.log(`✅ You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((step) => console.log(`  ${step}`));
      return path;
    }

    // ♞ Try all knight moves
    for (const [dx, dy] of moves) {
      const next = [x + dx, y + dy];

      if (isValid(next) && !visited.has(next.toString())) {
        visited.add(next.toString());
        queue.push([...path, next]);
        console.log(`🔹 Checking: ${next}`);
      }
    }
  }

  console.log("❌ No path found (should never happen on 8×8 board)");
  return null;
}

// Example run:
knightMoves([0, 0], [7, 7]);
