const game = document.getElementById("game");
const cells = document.querySelectorAll("td");
const btnNewGame = document.getElementById("new-game");
const cellsIDs = [...cells].map((cell) => cell.id);

const overlay = document.querySelector(".overlay");
const btn1player = document.getElementById("btn1player");
const btn2players = document.getElementById("btn2players");
const btnStart = document.getElementById("btnStart");
const form = document.querySelector(".intro__form");
const formP0 = document.getElementById("form-p0");
const formP1 = document.getElementById("form-p1");
const inputNameP0 = document.getElementById("inputNameP0");
const inputNameP1 = document.getElementById("inputNameP1");
const inputColorP0 = document.getElementById("inputColorP0");
const inputColorP1 = document.getElementById("inputColorP1");
const inputMarkP0 = document.getElementById("inputMarkP0");
const inputMarkP1 = document.getElementById("inputMarkP1");
const optionsMarkP0 = [...inputMarkP0.querySelectorAll(`input[type="radio"]`)];
const optionsMarkP1 = [...inputMarkP1.querySelectorAll(`input[type="radio"]`)];

let players = [];
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
const player2 = {
  name: "Death eater",
  game: [],
  victories: 0,
  mark: "💀",
  color: "#ff006e",
};
const winningGames = [
  ["c1", "c2", "c3"],
  ["c4", "c5", "c6"],
  ["c7", "c8", "c9"],
  ["c1", "c4", "c7"],
  ["c2", "c5", "c8"],
  ["c3", "c6", "c9"],
  ["c1", "c5", "c9"],
  ["c3", "c5", "c7"],
];

currentPlayer = players[0];
/////////////////FUNCTIONS/////////////////
function randomSelection() {
  const freeCells = cells.filter((sCell) => !selectedCells.includes(sCell));
  console.log(freeCells);
  const index = Math.floor(Math.random() * freeCells.length);
  const chosenCell = document.getElementById(freeCells[index]);
  currentPlayer.game.push(freeCells[index]);
  chosenCell.textContent = currentPlayer.mark;
}
function newGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#fff";
  });
  selectedCells = [];
  players[0].game = [];
  players[1].game = [];
  currentPlayer = players[0];
  isPlaying = true;
}
/////////////////EVENTS/////////////////
game.addEventListener("click", (e) => {
  const target = e.target.closest("td");
  if (isPlaying && !selectedCells.includes(target.id)) {
    target.textContent = currentPlayer.mark;
    target.style.backgroundColor = currentPlayer.color;
    currentPlayer.game.push(target.id);
    selectedCells.push(target.id);
    let hasWon = false;
    winningGames.forEach((winGame) => {
      const isGameWon = winGame.every((cell) =>
        currentPlayer.game.includes(cell)
      );
      if (isGameWon) {
        hasWon = true;
      }
    });
    if (hasWon) {
      const index = players.indexOf(currentPlayer);
      document.querySelector(`.player-wins--${index}`).innerHTML =
        ++currentPlayer.victories;
      console.log(`${currentPlayer.name} has won! 🥳`);
      isPlaying = false;
      btnNewGame.classList.toggle("hidden");
    }
    if (!hasWon && selectedCells.length === cellsIDs.length) {
      console.log(`It's a draw 😢`);
      isPlaying = false;
      btnNewGame.classList.toggle("hidden");
    }
    if (currentPlayer === player0) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  }
});

btnNewGame.addEventListener("click", newGame);

btn1player.addEventListener("click", (e) => {
  e.preventDefault();
  players = [player0, player2];
  form.classList.remove("hidden");
  formP1.style.display = "none";
});
btn2players.addEventListener("click", (e) => {
  e.preventDefault();
  players = [player0, player1];
  form.classList.remove("hidden");
});
btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  player0.name = inputNameP0.value;
  player0.color = inputColorP0.value;
  player0.mark = optionsMarkP0.filter((radio) => radio.checked)[0].defaultValue;
  if (players.includes(player1)) {
    player1.name = inputNameP1.value;
    player1.color = inputColorP1.value;
    player1.mark = optionsMarkP1.filter(
      (radio) => radio.checked
    )[0].defaultValue;
  }
  rendergame(players);
  newGame();
});

function rendergame(arrPlayers) {
  document.querySelector(".player-mark--0").innerHTML = arrPlayers[0].mark;
  document.querySelector(".player-name--0").innerHTML = arrPlayers[0].name;
  document.querySelector(".player-wins--0").innerHTML = arrPlayers[0].victories;
  document.querySelector(".container-player--0").style.backgroundColor =
    arrPlayers[0].color + "aa";
  document.querySelector(".player-mark--1").innerHTML = arrPlayers[1].mark;
  document.querySelector(".player-name--1").innerHTML = arrPlayers[1].name;
  document.querySelector(".player-wins--1").innerHTML = arrPlayers[1].victories;
  document.querySelector(".container-player--1").style.backgroundColor =
    arrPlayers[1].color + "aa";
  overlay.style.opacity = 0;
  overlay.classList.add("hidden");
}
