const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(board.children).indexOf(cell);

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  board.innerHTML = "";
  createBoard();
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

createBoard();
status.textContent = `Player ${currentPlayer}'s turn`;
