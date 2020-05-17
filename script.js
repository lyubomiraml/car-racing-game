const speedDash = document.querySelector(".speed-dash");
const scoreDash = document.querySelector(".score-dash");
const lifeDash = document.querySelector(".life-dash");
const container = document.getElementById("container");
const btnStart = document.querySelector(".btn-start");

btnStart.addEventListener("click", startGame);
document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

//Game Variables
let animationGame;
let gamePlay = false;
let player;

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function startGame() {
  console.log(gamePlay);
  btnStart.style.display = "none";
  var div = document.createElement("div");
  div.setAttribute("class", "player-car");
  div.x = 250;
  div.y = 500;

  container.appendChild(div);
  gamePlay = true;
  animationGame = requestAnimationFrame(playGame);
  player = {
    speed: 1,
    lives: 3,
    gameScore: 0,
    carstoPass: 10,
  };
}

function pressKeyOn() {}

function pressKeyOff() {}

function updateDash() {
  console.log(player);
  scoreDash.innerHTML = player.gameScore;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = player.speed;
}

function playGame() {
  if (gamePlay) {
    updateDash();
  }
  animationGame = requestAnimationFrame(playGame);
}
