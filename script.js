const displayWidth = window.innerWidth;
const displayHeiht = window.innerHeight;
const playerLeft = 100;

let run = true;
let score = 0;
let scorePlusTop = true;
let scorePlusBottom = true;
let playerTop = displayHeiht / 2 + 200;
let obstacleTopLeft = displayWidth - 200;
let obstacleBottomLeft = displayWidth - 100;
let obstacleTopHeight = 160;
let obstacleBottomHeight = 200;

const createPlayer = () => {
  const player = document.createElement("div");

  player.setAttribute("id", "player");

  field.appendChild(player);

  click();
};

const click = () =>
  (document.body.onkeyup = (event) => event.keyCode === 32 && up());

const up = () => {
  playerTop -= 35;
  player.style.top = `${playerTop}px`;
};

const down = () => {
  playerTop += 10;
  player.style.top = `${playerTop}px`;
};
  

const createObstaclesWrapper = () => {
  const obstacles = document.createElement("div");

  obstacles.setAttribute("id", "obstacles");

  field.appendChild(obstacles);

  createObstacleBottom();
  createObstacleTop();
};

const createObstacleTop = () => {
  const obstacleTop = document.createElement("div");

  obstacleTop.setAttribute("id", "obstacleTop");

  obstacles.appendChild(obstacleTop);
};

const createObstacleBottom = () => {
  const obstacleBottom = document.createElement("div");

  obstacleBottom.setAttribute("id", "obstacleBottom");

  obstacles.appendChild(obstacleBottom);
};




const gameRun = () => {
  if (run) {
    setInterval(() => {
      obstacleTopLeft -= 30;
      obstacleBottomLeft -= 30;

      style();
      down();
      gameOver();
    }, 300);
  }
};

const style = () => {
  document.body.style.width = "100vw";
  document.body.style.height = "100vh";
  document.body.style.padding = 0;
  document.body.style.margin = 0;

  field.style.position = "realiteve";
  field.style.width = "100%";
  field.style.height = "100%";
  field.style.backgroundColor = "black";
  field.style.display = "flex";

  player.style.position = "absolute";
  player.style.backgroundColor = "red";
  player.style.borderRadius = "100%";
  player.style.width = "30px";
  player.style.height = "30px";
  player.style.marginLeft = `${playerLeft}px`;
  player.style.top = `${playerTop}px`;

  obstacles.style.display = "flex";
  obstacles.style.flexDirection = "column";
  obstacles.style.width = "100vh";

  obstacleTop.style.backgroundColor = "white";
  obstacleTop.style.height = `${obstacleTopHeight}px`;
  obstacleTop.style.width = "30px";
  obstacles.style.padding = 0;
  obstacleTop.style.marginLeft = `${obstacleTopLeft}px`;
  obstacleTop.style.marginTop = `${
    displayHeiht - obstacleTopHeight - obstacleBottomHeight
  }px`;

  obstacleBottom.style.backgroundColor = "white";
  obstacleBottom.style.height = `${obstacleBottomHeight}px`;
  obstacleBottom.style.width = "30px";
  obstacles.style.padding = 0;
  obstacleBottom.style.marginLeft = `${obstacleBottomLeft}px`;
};

const gameOver = () => {
  const obstacleTop = document.getElementById("obstacleTop");
  const obstacleBottom = document.getElementById("obstacleBottom");
  const player = document.getElementById("player");
  
  if (
    player.offsetTop <= 0 ||
    0 >= displayHeiht - player.offsetTop - 26 ||
    (obstacleTop.offsetLeft <= player.offsetLeft &&
      player.offsetTop >= obstacleTop.offsetTop) ||
    (obstacleBottom.offsetLeft <= player.offsetLeft &&
      obstacleBottomHeight >= player.offsetTop)
  ) {
    run = false;

    return alert(`Game over, your score: ${score}`);
  }

  if (obstacleTopLeft - 20 <= playerLeft && scorePlusTop) {
    scorePlusTop = false;

    return score++;
  }

  if (obstacleBottomLeft - 20 <= playerLeft && scorePlusBottom) {
    scorePlusBottom = false;

    return score++;
  }

  if (obstacleBottomLeft - 30 <= 0) {
    scorePlusBottom = true;
    obstacleBottomLeft += 500;

    return (obstacleBottom.style.marginLeft = `${obstacleBottomLeft}px`);
  }

  if (obstacleTopLeft - 30 <= 0) {
    scorePlusTop = true;
    obstacleTopLeft += 500;

    return (obstacleTop.style.marginLeft = `${obstacleTopLeft}px`);
  }
};

const app = () => {
  createPlayer();
  createObstaclesWrapper();
  style();
  gameRun();
};

app();
