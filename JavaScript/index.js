let turn = "X";

function switchTurn() {
  turn = turn === "X" ? "O" : "X";
}

function checkDraw() {
  const board = document.querySelectorAll(".board-cell");
  for (let i = 0; i < board.length; i++) {
    if (board[i].innerHTML === "") return false;
  }
  return true;
}

function checkWinner() {
  const board = document.querySelectorAll(".board-cell");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (
      board[a].innerHTML === board[b].innerHTML &&
      board[a].innerHTML === board[c].innerHTML &&
      board[a].innerHTML !== ""
    ) {
      console.log("Winner!");
      return `${turn} wins!`;
    }
  }
  if (checkDraw()) {
    console.log("Draw!");
    return "Draw";
  }
  return null;
}

function handleCellClick(cell) {
  const image = document.createElement("img");
  if (cell.innerHTML !== "") return;
  if (turn === "X") {
    image.src = "images/x-symbol.svg";
    image.alt = "X";
  } else {
    image.src = "images/o-symbol.svg";
    image.alt = "O";
  }
  cell.appendChild(image);
  result = checkWinner();
  if (result) displayWinner(result);
  switchTurn();
}

function handleRestartClick() {
  const gameBoard = (document.querySelector(".game-board").innerHTML = "");
  makeGameBoard();
  turn = "X";
  const board = document.querySelectorAll(".board-cell");
  for (let i = 0; i < board.length; i++) board[i].innerHTML = "";
  const result = document.querySelector(".result");
  const menu = document.querySelector(".end-game-menu");
  if (result) result.remove();
  if (menu) menu.remove();
}

function displayWinner(winner) {
  const result = document.createElement("h2");
  const menu = document.createElement("div");
  const gameBoard = document.querySelector(".game-board");
  const restartButton = document.createElement("button");
  const board = document.querySelectorAll(".board-cell");

  for (let i = 0; i < board.length; i++) board[i].removeAttribute("onclick");

  menu.classList.add("end-game-menu");
  restartButton.textContent = "Restart";
  restartButton.classList.add("restart-button");
  restartButton.setAttribute("onclick", "handleRestartClick()");
  result.classList.add("result");
  result.textContent = winner;

  menu.appendChild(result);
  menu.appendChild(restartButton);
  gameBoard.appendChild(menu);
}

function makeGameBoard() {
  const gameBoard = document.querySelector(".game-board");
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.classList.add("board-row");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      const index = i * 3 + j;

      cell.classList.add("board-cell");
      cell.setAttribute("id", `${index}`);
      cell.setAttribute("onclick", "handleCellClick(this)");
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
}

makeGameBoard();
