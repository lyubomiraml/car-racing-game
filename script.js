const speedDash = document.querySelector(".speed-dash");
const scoreDash = document.querySelector(".score-dash");
const lifeDash = document.querySelector(".life-dash");
const container = document.getElementById("container");
const btnStart = document.querySelector(".btn-start");
let animationGame = requestAnimationFrame(playGame);

let gamePlay = false;
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function playGame() {
  if (gamePlay) {
    console.log("Game in play");
  }
  animationGame = requestAnimationFrame(playGame);
}
