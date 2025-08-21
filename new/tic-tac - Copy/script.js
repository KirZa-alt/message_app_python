var cells = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameOver = false;
var vsComputer = false;
var gameStarted = false;
var playerXName = "";
var playerOName = "";
var winningCombo = [];

function togglePlayerOInput() {
  var mode = document.getElementById("mode").value;
  if (mode === "computer") {
    document.getElementById("playerONameContainer").style.display = "none";
  } else if (mode === "multiplayer") {
    document.getElementById("playerONameContainer").style.display = "block";
  } else {
    document.getElementById("playerONameContainer").style.display = "none";
  }
}

function startGame() {
  var mode = document.getElementById("mode").value;
  playerXName = document.getElementById("playerXName").value.trim();
  playerOName = document.getElementById("playerOName").value.trim();

  if (mode !== "computer" && mode !== "multiplayer") {
    alert("Please select a valid game mode.");
    return;
  }
  if (playerXName === "") {
    alert("Please enter Player X's name.");
    return;
  }
  if (mode === "multiplayer" && playerOName === "") {
    alert("Please enter Player O's name.");
    return;
  }

  vsComputer = (mode === "computer");
  currentPlayer = "X";
  gameOver = false;
  gameStarted = true;
  cells = ["", "", "", "", "", "", "", "", ""];
  winningCombo = [];

  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].textContent = "";
    allCells[i].classList.remove("win-cell");
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("board").style.display = "grid";
  document.getElementById("status").textContent = playerXName + "'s turn";
  document.getElementById("resetBtn").style.display = "inline-block";
}

function play(index) {
  if (!gameStarted || gameOver || cells[index] !== "") return;

  cells[index] = currentPlayer;
  var allCells = document.getElementsByClassName("cell");
  allCells[index].textContent = currentPlayer;

  if (checkWin()) {
    highlightWinningCells();
    if (currentPlayer === "X") {
      document.getElementById("status").textContent = playerXName + " wins!";
    } else {
      document.getElementById("status").textContent = playerOName + " wins!";
    }
    gameOver = true;
    return;
  }

  if (cells.indexOf("") === -1) {
    document.getElementById("status").textContent = "It's a draw!";
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
    if (currentPlayer === "X") {
      document.getElementById("status").textContent = playerXName + "'s turn";
    } else {
      document.getElementById("status").textContent = playerOName + "'s turn";
    }
  }
}

function computerMove() {
  if (gameOver) return;
  var emptyCells = [];
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] === "") emptyCells.push(i);
  }
  if (emptyCells.length === 0) return;

  var moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  cells[moveIndex] = currentPlayer;
  var allCells = document.getElementsByClassName("cell");
  allCells[moveIndex].textContent = currentPlayer;

  if (checkWin()) {
    highlightWinningCells();
    document.getElementById("status").textContent = playerOName + " wins!";
    gameOver = true;
    return;
  }

  if (cells.indexOf("") === -1) {
    document.getElementById("status").textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = "X";
  document.getElementById("status").textContent = playerXName + "'s turn";
}

function checkWin() {
  var wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (var i = 0; i < wins.length; i++) {
    var a = wins[i][0];
    var b = wins[i][1];
    var c = wins[i][2];
    if (cells[a] !== "" && cells[a] === cells[b] && cells[b] === cells[c]) {
      winningCombo = [a,b,c];
      return true;
    }
  }
  winningCombo = [];
  return false;
}

function highlightWinningCells() {
  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < winningCombo.length; i++) {
    allCells[winningCombo[i]].classList.add("win-cell");
  }
}

function reset() {
  gameStarted = false;
  currentPlayer = "X";
  gameOver = false;
  cells = ["", "", "", "", "", "", "", "", ""];
  winningCombo = [];

  var allCells = document.getElementsByClassName("cell");
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].textContent = "";
    allCells[i].classList.remove("win-cell");
  }

  document.getElementById("status").textContent = "";
  document.getElementById("board").style.display = "none";
  document.getElementById("setup").style.display = "block";
  document.getElementById("resetBtn").style.display = "none";

  document.getElementById("mode").value = "";
  document.getElementById("playerXName").value = "";
  document.getElementById("playerOName").value = "";
  togglePlayerOInput();
}
