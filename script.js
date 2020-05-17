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
    element: div,
    speed: 3,
    lives: 3,
    gameScore: 0,
    carsToPass: 10,
    score: 0,
    roadWidth: 250,
  };
  startBoard();
}

function startBoard() {
  for (let x = 0; x < 13; x++) {
    let div = document.createElement("div");
    div.setAttribute("class", "road");
    div.style.top = x * 50 + "px";
    div.style.width = player.roadWidth + "px";
    container.appendChild(div);
  }
}

function pressKeyOn(event) {
  event.preventDefault();
  console.log(keys);
  keys[event.key] = true;
}

function pressKeyOff(event) {
  event.preventDefault();
  console.log(keys);
  keys[event.key] = false;
}

function updateDash() {
  //console.log(player);
  scoreDash.innerHTML = player.score;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = Math.round(player.speed * 13);
}

function playGame() {
  if (gamePlay) {
    updateDash();

    //movement
    if (keys.ArrowUp) {
      if (player.element.y > 400) player.element.y -= 1;
      player.speed = player.speed < 20 ? player.speed + 0.05 : 20;
    }
    if (keys.ArrowDown) {
      if (player.element.y < 500) player.element.y += 1;
      player.speed = player.speed > 0 ? player.speed - 0.2 : 0;
    }
    if (keys.ArrowLeft) {
      player.element.x -= player.speed / 4;
    }
    if (keys.ArrowRight) {
      player.element.x += player.speed / 4;
    }

    //move car
    player.element.style.top = player.element.y + "px";
    player.element.style.left = player.element.x + "px";
  }
  animationGame = requestAnimationFrame(playGame);
}
