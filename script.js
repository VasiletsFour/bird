"use strict";

class Player {
  static playerTop = window.innerHeight / 2 + 200;
  #id = "player";

  constructor() {
    this.#id = "player";
  }

  createPlayer() {
    const player = document.createElement("div");

    player.setAttribute("id", this.#id);

    return field.appendChild(player);
  }
}
class Move {
  constructor() {
    this.playerTop = Player.playerTop;
    this.player = document.getElementById("player");

    this.playerClick();
  }

  playerClick() {
    return (document.body.onkeyup = (event) =>
      event.keyCode === 32 && this.up());
  }

  up() {
    this.playerTop -= 40;
    this.player.style.top = `${this.playerTop}px`;
  }

  down() {
    this.playerTop += 3;
    this.player.style.top = `${this.playerTop}px`;
  }
}

class Obstacles {
  constructor() {
    this.playerTop = Player.playerTop;
    this.displayWidth = window.innerWidth;
    this.obstacleTopLeft = this.displayHeiht;
    this.obstacleTopHeight = 400;
    this.obstacleLeft = window.innerWidth;
    this.obstacleBottomHeight = 460;
    this.obstacleColor = "green";
    this.player = document.getElementById("player");

    this.createObstacleBottom();
    this.createObstacleTop();
  }

  createObstacleBottom() {
    const obstacleBottom = document.createElement("div");

    obstacleBottom.setAttribute("id", "obstacleBottom");

    obstacleBottom.style.position = "absolute";
    obstacleBottom.style.backgroundColor = this.obstacleColor;
    obstacleBottom.style.height = `${this.obstacleBottomHeight}px`;
    obstacleBottom.style.width = "40px";
    obstacleBottom.style.padding = 0;
    obstacleBottom.style.marginLeft = `${this.obstacleLeft - 100}px`;

    field.appendChild(obstacleBottom);
  }

  createObstacleTop() {
    const obstacleTop = document.createElement("div");

    obstacleTop.setAttribute("id", "obstacleTop");

    obstacleTop.style.position = "absolute";
    obstacleTop.style.backgroundColor = this.obstacleColor;
    obstacleTop.style.height = `${this.obstacleTopHeight}px`;
    obstacleTop.style.width = "40px";
    obstacleTop.style.padding = 0;
    obstacleTop.style.marginLeft = `${this.obstacleLeft - 100}px`;
    obstacleTop.style.marginTop = `${
      window.innerHeight - this.obstacleTopHeight
    }px`;

    field.appendChild(obstacleTop);
  }

  run(left) {
    const obstacleBottom = document.getElementById("obstacleBottom");
    const obstacleTop = document.getElementById("obstacleTop");

    this.obstacleLeft = this.obstacleLeft - left;

    obstacleTop.style.marginLeft = `${this.obstacleLeft}px`;
    obstacleBottom.style.marginLeft = `${this.obstacleLeft}px`;
  }
}

class GameOver {
  constructor() {
    this.bottom = document.getElementById("obstaclesBottom");
    this.player = document.getElementById("player");
    this.top = document.getElementById("obstacleTop");
    this.displayHeiht = window.innerHeight;
    this.score = 0;
  }

  lose() {
    const bottom = document.getElementById("obstacleBottom");
    const top = document.getElementById("obstacleTop");

    if (
      this.player.offsetTop < 0 ||
      this.displayHeiht < this.player.offsetTop + 30 ||
      (top.offsetLeft < this.player.offsetLeft &&
        top.offsetTop > this.player.offsetTop) ||
        (bottom.offsetLeft < this.player.offsetLeft &&
          window.innerHeight - 460< this.player.offsetTop)
    ) {
      alert(`Game over: your scroe ${this.score}`);
    }
  }
}

class RunGame {
  constructor() {
    this.move = new Move();
    this.obstacle = new Obstacles();
    this.gameOver = new GameOver();

    this.run();
  }

  run() {
    setInterval(() => {
      this.move.down();
      this.obstacle.run(10);

      this.gameOver.lose();
    }, 150);
  }
}

class Style {
  constructor() {
    this.displayHeiht = window.innerHeight;
    this.field = document.getElementById("field");
    this.player = document.getElementById("player");
    this.playerLeft = 100;
    this.playerTop = this.displayHeiht / 2 + 200;

    this.createStyle();
  }

  createStyle() {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.padding = 0;
    document.body.style.margin = 0;

    this.field.style.position = "realiteve";
    this.field.style.width = "100%";
    this.field.style.height = "100%";
    this.field.style.backgroundImage = "url('./img/CloudBackGround.jpg')";
    this.field.style.display = "flex";

    this.player.style.position = "absolute";
    this.player.zIndex = "10";
    this.player.style.backgroundColor = "red";
    this.player.style.borderRadius = "100%";
    this.player.style.width = "30px";
    this.player.style.height = "30px";
    this.player.style.marginLeft = `${this.playerLeft}px`;
    this.player.style.top = `${this.playerTop}px`;
  }
}

class App {
  constructor() {
    new Player().createPlayer();
    new Move();
    new RunGame();
    new Style();
  }
}

new App();
