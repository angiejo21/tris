const game = document.getElementById("game");
const cells = document.querySelectorAll("td");
const btnNewGame = document.getElementById("new-game");
const cellsIDs = [...cells].map((cell) => cell.id);
let currentPlayer;
let selectedCells = [];
let isPlaying = true;

const player0 = {
  name: "Anonymous0",
  game: [],
  victories: 0,
  mark: "🥵",
  color: "#ffbe0b",
};
const player1 = {
  name: "Anonymous1",
  game: [],
  victories: 0,
  mark: "🤢",
  color: "#3a86ff",
};
const wins = [
  ["c1", "c2", "c3"],
  ["c4", "c5", "c6"],
  ["c7", "c8", "c9"],
  ["c1", "c4", "c7"],
  ["c2", "c5", "c8"],
  ["c3", "c6", "c9"],
  ["c1", "c5", "c9"],
  ["c3", "c5", "c7"],
];

currentPlayer = player0;

function randomSelection() {
  const freeCells = cells.filter((sCell) => !selectedCells.includes(sCell));
  console.log(freeCells);
  const index = Math.floor(Math.random() * freeCells.length);
  const chosenCell = document.getElementById(freeCells[index]);
  currentPlayer.game.push(freeCells[index]);
  chosenCell.textContent = currentPlayer.mark;
}

game.addEventListener("click", (e) => {
  if (isPlaying) {
    const target = e.target;
    target.textContent = currentPlayer.mark;
    target.style.backgroundColor = currentPlayer.color;
    currentPlayer.game.push(target.id);
    selectedCells.push(target.id);
    wins.forEach((win) => {
      if (win.every((cell) => currentPlayer.game.includes(cell))) {
        currentPlayer.victories++;
        console.log(`${currentPlayer.name} has won! 🥳`);
        isPlaying = false;
      }
    });
    if (selectedCells.length === cellsIDs.length) {
      console.log(`It's a draw 😢`);
      isPlaying = false;
    }
    if (currentPlayer === player0) {
      currentPlayer = player1;
    } else {
      currentPlayer = player0;
    }
  }
});

function newGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#fff";
  });
  currentPlayer = player0;
  isPlaying = true;
}

btnNewGame.addEventListener("click", newGame);
