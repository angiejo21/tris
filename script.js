const game = document.getElementById("game");
const cells = document.querySelectorAll("td");
const btnNewGame = document.getElementById("new-game");
const cellsIDs = [...cells].map((cell) => cell.id);

const overlay = document.querySelector(".overlay");
const intro = overlay.querySelector(".intro");
const message = overlay.querySelector(".message");
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
const optionsLabelsP0 = inputMarkP0.querySelectorAll("label");
const optionsMarkP1 = [...inputMarkP1.querySelectorAll(`input[type="radio"]`)];
const optionsLabelsP1 = inputMarkP1.querySelectorAll("label");

let players = [];
let firstPlayer = players[0];
let currentPlayer;
let selectedCells = [];
let isPlaying = true;
let hasWon;

const player0 = {
  name: randomPlayer(),
  game: [],
  victories: 0,
  mark: randomMark(),
  color: "#ffbe0b",
};
const player1 = {
  name: randomPlayer(),
  game: [],
  victories: 0,
  mark: randomMark(),
  color: "#3a86ff",
};
const player2 = {
  name: "Mangiamorte",
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
function init() {
  optionsMarkP0.forEach((radioOp, i) => {
    const mark = randomMark();
    radioOp.defaultValue = mark;
    optionsLabelsP0[i].textContent = mark;
  });
  optionsMarkP1.forEach((radioOp, i) => {
    const mark = randomMark();
    radioOp.defaultValue = mark;
    optionsLabelsP1[i].textContent = mark;
  });
}
init();

function randomSelection() {
  let chosenCell;
  let index;
  const game = currentPlayer.game;
  let winningCells;

  if (!game.includes(game[0])) {
    winningCells = cellsIDs.filter((sCell) => !selectedCells.includes(sCell));
    index = Math.floor(Math.random() * winningCells.length);
    chosenCell = winningCells[index];
  } else if (game.includes(game[0])) {
    winningCells = [
      ...new Set(winningGames.filter((g) => g.includes(game[0])).flat()),
    ];
    console.log(winningCells);
    const chances1 = winningCells.filter(
      (sCell) => !selectedCells.includes(sCell)
    );
    console.log(chances1);
    index = Math.floor(Math.random() * chances1.length);
    chosenCell = chances1[index];
  } else if (game.includes(game[1])) {
    winningCells = [
      ...new Set(
        winningGames
          .filter((g) => g.includes(game[0]) && g.includes(game[1]))
          .flat()
      ),
    ];
    console.log(winningCells);
    const chances2 = winningCells.filter(
      (sCell) => !selectedCells.includes(sCell)
    );
    console.log(chances2);
    index = Math.floor(Math.random() * chances2.length);
    chosenCell = chances2[index];
  }

  currentPlayer.game.push(chosenCell);
  selectedCells.push(chosenCell);
  const elementCell = document.getElementById(chosenCell);
  elementCell.textContent = currentPlayer.mark;
  elementCell.style.backgroundColor = currentPlayer.color;
  checkWin();
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}

function randomPlayer() {
  const characters = [
    "Maria Stuarda",
    "Nemo",
    "Barbie",
    "Elisabetta I",
    "Malfoy",
    "Dory",
    "Oppenheimer",
    "Hermione",
    "Sauron",
    "Samwise",
  ];
  return characters[Math.floor(Math.random() * characters.length)];
}

function randomMark() {
  const marks = [
    "👽",
    "🆒",
    "👾",
    "🌈",
    "🥵",
    "🤢",
    "🧁",
    "💩",
    "🤧",
    "🧜",
    "😍",
    "😂",
    "🧐",
    "👻",
    "🐦",
    "🐍",
    "😾",
    "🐶",
    "🦑",
    "🐿️",
  ];
  return marks[Math.floor(Math.random() * marks.length)];
}

function newGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#fff";
  });
  selectedCells = [];
  players[0].game = [];
  players[1].game = [];
  firstPlayer === players[0]
    ? (firstPlayer = players[1])
    : (firstPlayer = players[0]);
  currentPlayer = firstPlayer;
  isPlaying = true;
  overlay.style.opacity = 0;
  message.classList.add("hidden");
  overlay.classList.add("hidden");
  if (currentPlayer === player2) {
    setTimeout(randomSelection, 500);
  }
}
function checkWin() {
  hasWon = false;
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
    document.querySelector(
      `.player-wins--${index}`
    ).innerHTML = `<span>🏆</span> ${++currentPlayer.victories}`;
    renderMessage("victory", currentPlayer);
    isPlaying = false;
  }
  if (!hasWon && selectedCells.length === cellsIDs.length) {
    renderMessage("draw", currentPlayer);
    isPlaying = false;
  }
}

function renderGame(arrPlayers) {
  document.querySelector(".player-mark--0").innerHTML = arrPlayers[0].mark;
  document.querySelector(".player-name--0").innerHTML = arrPlayers[0].name;
  document.querySelector(".player-wins--0").innerHTML =
    "🏆" + arrPlayers[0].victories;
  document.querySelector(".container-player--0").style.backgroundColor =
    arrPlayers[0].color + "aa";
  document.querySelector(".player-mark--1").innerHTML = arrPlayers[1].mark;
  document.querySelector(".player-name--1").innerHTML = arrPlayers[1].name;
  document.querySelector(".player-wins--1").innerHTML =
    "🏆" + arrPlayers[1].victories;
  document.querySelector(".container-player--1").style.backgroundColor =
    arrPlayers[1].color + "aa";
  overlay.style.opacity = 0;
  overlay.classList.add("hidden");
}

function renderMessage(occurance, player) {
  const text = document.querySelector(".message__text");
  switch (occurance) {
    case "victory":
      text.innerHTML = `<h2>${player.name} ha vinto! 🎉</h2>`;
      break;
    case "draw":
      text.innerHTML = `
      <h2>Pareggio 😐</h2>
      <h3>biscottino?🥠</h3>`;
      break;
  }
  overlay.style.opacity = 100;
  intro.classList.add("hidden");
  message.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
/////////////////EVENTS/////////////////
game.addEventListener("click", (e) => {
  const target = e.target.closest("td");
  if (isPlaying && !selectedCells.includes(target.id)) {
    target.textContent = currentPlayer.mark;
    target.style.backgroundColor = currentPlayer.color;
    currentPlayer.game.push(target.id);
    selectedCells.push(target.id);
    checkWin();
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
    if (currentPlayer === player2 && !hasWon) {
      setTimeout(randomSelection, 500);
    }
  }
});

btnNewGame.addEventListener("click", newGame);

btn1player.addEventListener("click", (e) => {
  e.preventDefault();
  players = [player0, player2];
  formP1.style.display = "none";
  form.classList.remove("hidden");
  document.querySelector(".intro__buttons").classList.add("hidden");
});

btn2players.addEventListener("click", (e) => {
  e.preventDefault();
  players = [player0, player1];
  form.classList.remove("hidden");
  document.querySelector(".intro__buttons").classList.add("hidden");
});

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  player0.name = inputNameP0.value || player0.name;
  player0.color = inputColorP0.value || player0.color;
  player0.mark = optionsMarkP0.filter((radio) => radio.checked)[0].defaultValue;
  if (players.includes(player1)) {
    player1.name = inputNameP1.value || player1.name;
    player1.color = inputColorP1.value || player1.color;
    player1.mark = optionsMarkP1.filter(
      (radio) => radio.checked
    )[0].defaultValue;
  }
  renderGame(players);
  newGame();
});
