const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board;
let turn;
let win;
let xwins = 0;
let tie = 0;
let owins = 0;

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("x-button").onclick = firstX;
document.getElementById("o-button").onclick = firstO;

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;
  render();
}

function firstX() {
  document.getElementById('switch').innerHTML = "Turn: X";
  turn = "X";
}

function firstO() {
  document.getElementById('switch').innerHTML = "Turn: O";
  turn = "O";
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
    if (win === "T") {
      tie++;
      document.getElementById('tie-score').innerHTML = tie;
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  if (winner === "X") {
    xwins++;
    document.getElementById('x-score').innerHTML = xwins;
  } else if (winner === "O") {
    owins++;
    document.getElementById('o-score').innerHTML = owins;
  }
  return winner ? winner : board.includes("") ? null : "T";
}
