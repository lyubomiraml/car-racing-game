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
  container.innerHTML = "";
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
    speed: 0,
    lives: 3,
    gameScore: 0,
    carsToPass: 1,
    score: 0,
    roadWidth: 250,
    gameEndCounter: 0,
  };
  startBoard();
  setupOtherCars(10);
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

function setupOtherCars(count) {
  for (let x = 0; x < count; x++) {
    let temp = "other-car" + (x + 1);
    let div = document.createElement("div");
    div.innerHTML = x + 1;
    div.setAttribute("class", "other-car");
    div.setAttribute("id", temp);

    createOtherCar(div);
    container.appendChild(div);
  }
}

function createOtherCar(element) {
  let tempRoad = document.querySelector(".road");
  element.style.left =
    tempRoad.offsetLeft +
    Math.ceil(Math.random() * tempRoad.offsetWidth) -
    30 +
    "px";

  element.style.top = Math.ceil(Math.random() * -400) + "px";
  setOtherCarBackgroundImage(element);

  element.speed = Math.ceil(Math.random() * 17) + 2;
}

function setOtherCarBackgroundImage(element) {
  const otherCarsImages = [
    "blue-car.png",
    "red-car.png",
    "yellow-car.png",
    "purple-car.png",
    "orange-car.png",
    "green-car.png",
    "cyan-car.png",
  ];

  element.style.backgroundImage = `url('${
    otherCarsImages[Math.floor(Math.random() * Math.floor(7))]
  }')`;
}

function pressKeyOn(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function pressKeyOff(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function updateDash() {
  scoreDash.innerHTML = player.score;
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = Math.round(player.speed * 13);
}
function moveRoad() {
  let tempRoad = document.querySelectorAll(".road");
  let previousOffsetLeft = tempRoad[0].offsetLeft;
  let previousWidth = tempRoad[0].offsetWidth;

  const pSpeed = player.speed;

  for (let x = 0; x < tempRoad.length; x++) {
    let num = tempRoad[x].offsetTop + pSpeed;
    if (num > 600) {
      num = num - 650;

      let mover = previousOffsetLeft + (Math.floor(Math.random() * 6) - 3);
      let roadWidth = Math.floor(Math.random() * 11) - 5 + previousWidth;

      if (roadWidth < 200) roadWidth = 200;
      if (roadWidth > 400) roadWidth = 400;
      if (mover < 100) mover = 100;
      if (mover > 600) mover = 600;

      tempRoad[x].style.left = mover + "px";
      tempRoad[x].style.width = roadWidth + "px";

      previousOffsetLeft = tempRoad[x].offsetLeft;
      previousWidth = tempRoad[x].offsetWidth;
    }

    tempRoad[x].style.top = num + "px";
  }
  return { width: previousWidth, left: previousOffsetLeft };
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveOtherCars() {
  let tempOtherCars = document.querySelectorAll(".other-car");
  for (let i = 0; i < tempOtherCars.length; i++) {
    for (let ii = 0; ii < tempOtherCars.length; ii++) {
      if (i != ii && isCollide(tempOtherCars[i], tempOtherCars[ii])) {
        tempOtherCars[ii].style.top = tempOtherCars[ii].offsetTop + 20 + "px";
        tempOtherCars[i].style.top = tempOtherCars[i].offsetTop - 20 + "px";
        tempOtherCars[ii].style.left = tempOtherCars[ii].offsetLeft - 20 + "px";
        tempOtherCars[i].style.left = tempOtherCars[i].offsetLeft + 20 + "px";
      }
    }
    let y = tempOtherCars[i].offsetTop - tempOtherCars[i].speed + player.speed;
    if (y > 2000 || y < -2000) {
      // reset car
      if (y > 2000) {
        player.score++;
        if (player.score >= player.carsToPass) {
          gameOverPlay();
        }
      }
      createOtherCar(tempOtherCars[i]);
    } else {
      tempOtherCars[i].style.top = y + "px";
      let hitCar = isCollide(tempOtherCars[i], player.element);
      if (hitCar) {
        player.speed = 0;
        player.lives--;
        if (player.lives < 1) {
          player.gameEndCounter = 1;
        }
        createOtherCar(tempOtherCars[i]);
      }
    }
  }
}

function gameOverPlay() {
  let div = document.createElement("div");
  div.setAttribute("class", "road");
  div.style.top = "0px";
  div.style.width = "250px";
  div.style.backgroundColor = "red";
  div.innerHTML = "FINISH";
  div.style.fontSize = "3em";
  container.appendChild(div);
  player.gameEndCounter = 12;
  player.speed = 0;
}

function playGame() {
  if (gamePlay) {
    updateDash();

    //movement
    let roadParams = moveRoad();
    moveOtherCars();

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
    //check if on road
    if (
      player.element.x + 40 < roadParams.left ||
      player.element.x > roadParams.left + roadParams.width
    ) {
      if (player.element.y < 500) player.element.y += 1;
      player.speed = player.speed > 0 ? player.speed - 0.2 : 1;
    }

    //move car
    player.element.style.top = player.element.y + "px";
    player.element.style.left = player.element.x + "px";
  }
  animationGame = requestAnimationFrame(playGame);
  if (player.gameEndCounter > 0) {
    player.gameEndCounter--;
    player.y = player.y > 60 ? player.y - 30 : 60;
    if (player.gameEndCounter == 0) {
      gamePlay = false;
      cancelAnimationFrame(animationGame);
      btnStart.style.display = "block";
    }
  }
}
