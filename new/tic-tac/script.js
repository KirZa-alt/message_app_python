var cells = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameOver = false;
var vsComputer = false;
var gameStarted = false;
var player1Name = "";
var player2Name = "";
var winningCombo = [];

function togglePlayerOInput() {
  var mode = document.getElementById("mode").value;
  var container = document.getElementById("player2NameContainer");
  if (mode === "multiplayer") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

function startGame() {
  var mode = document.getElementById("mode").value;
  player1Name = document.getElementById("player1Name").value.trim();
  player2Name = document.getElementById("player2Name").value.trim();

  if (mode !== "computer" && mode !== "multiplayer") {
    Swal.fire("Error", "Please select a valid game mode.", "error");
    return;
  }
  if (player1Name === "") {
    Swal.fire("Error", "Please enter Player X's name.", "error");
    return;
  }
  if (mode === "multiplayer" && player2Name === "") {
    Swal.fire("Error", "Please enter Player O's name.", "error");
    return;
  }
  if (mode === "computer") {
    player2Name = "Computer";
  }

  vsComputer = false;
  if (mode === "computer") {
    vsComputer = true;
  }

  currentPlayer = "X";
  gameOver = false;
  gameStarted = true;
  cells = ["", "", "", "", "", "", "", "", ""];
  winningCombo = [];

  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].textContent = "";
    allCells[i].className = "cell";
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("board").style.display = "grid";
  document.getElementById("resetBtn").style.display = "inline-block";
  document.getElementById("status").textContent = player1Name + "'s turn";
}

function play(index) {
  if (!gameStarted || gameOver || cells[index] !== "") {
    return;
  }

  cells[index] = currentPlayer;
  var allCells = document.getElementsByClassName("cell");
  allCells[index].textContent = currentPlayer;

  if (checkWin()) {
    highlightWinningCells();
    var winnerName;
    if (currentPlayer === "X") {
      winnerName = player1Name;
    } else {
      winnerName = player2Name;
    }
    showResult(winnerName + " wins!");
    gameOver = true;
    return;
  }

  if (cells.indexOf("") === -1) {
    showResult("It's a draw!");
    gameOver = true;
    return;
  }

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  if (vsComputer && currentPlayer === "O" && !gameOver) {
    computerMove();
  } else {
    var nextPlayerName;
    if (currentPlayer === "X") {
      nextPlayerName = player1Name;
    } else {
      nextPlayerName = player2Name;
    }
    document.getElementById("status").textContent = nextPlayerName + "'s turn";
  }
}

function computerMove() {
  if (gameOver) {
    return;
  }

  var emptyCells = [];
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      emptyCells.push(i);
    }
  }

  if (emptyCells.length === 0) {
    return;
  }

  var moveIndex = findBestMove("O");

  if (moveIndex === -1) {
    moveIndex = findBestMove("X");
  }

  if (moveIndex === -1) {
    var randomIndex = Math.floor(Math.random() * emptyCells.length);
    moveIndex = emptyCells[randomIndex];
  }

  cells[moveIndex] = currentPlayer;
  var allCells = document.getElementsByClassName("cell");
  allCells[moveIndex].textContent = currentPlayer;

  if (checkWin()) {
    highlightWinningCells();
    showResult(player2Name + " wins!");
    gameOver = true;
    return;
  }

  if (cells.indexOf("") === -1) {
    showResult("It's a draw!");
    gameOver = true;
    return;
  }

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  var nextPlayerName;
  if (currentPlayer === "X") {
    nextPlayerName = player1Name;
  } else {
    nextPlayerName = player2Name;
  }

  document.getElementById("status").textContent = nextPlayerName + "'s turn";
}

function findBestMove(player) {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = player;
      var win = checkWinForPlayer(player);
      cells[i] = "";
      if (win) {
        return i;
      }
    }
  }
  return -1;
}

function checkWin() {
  return checkWinForPlayer(currentPlayer);
}

function checkWinForPlayer(player) {
  var wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var i = 0; i < wins.length; i++) {
    var [a, b, c] = wins[i];
    if (cells[a] === player && cells[b] === player && cells[c] === player) {
      winningCombo = [a, b, c];
      return true;
    }
  }
  return false;
}

function highlightWinningCells() {
  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < winningCombo.length; i++) {
    allCells[winningCombo[i]].classList.add("win-cell");
  }
}

function showResult(message) {
  document.getElementById("status").textContent = message;
  resetBoard();

  Swal.fire({
    title: message,
    icon: message.includes("wins") ? "success" : (message.includes("draw") ? "info" : "error"),
    confirmButtonText: "Play Again"
  }).then(() => {
    reset();
  });
}

function resetBoard() {
  cells = ["", "", "", "", "", "", "", "", ""];
  winningCombo = [];
  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].textContent = "";
    allCells[i].className = "cell";
  }
}

function reset() {
  gameOver = false;
  gameStarted = false;
  cells = ["", "", "", "", "", "", "", "", ""];
  winningCombo = [];
  currentPlayer = "X";
  document.getElementById("board").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("setup").style.display = "block";
  document.getElementById("status").textContent = "";
  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].textContent = "";
    allCells[i].className = "cell";
  }
}

window.onload = function() {
  document.getElementById("board").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("setup").style.display = "block";
  document.getElementById("status").textContent = "";
};
