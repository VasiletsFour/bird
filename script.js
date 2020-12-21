"use strict";

class Move {
  up() {
    const elem = document.getElementById(this.id);

    this.playerTop -= 35;
    elem.style.top = `${this.playerTop}px`;
  }

  down() {
    const elem = document.getElementById(this.id);

    this.playerTop += 2;
    elem.style.top = `${this.playerTop}px`;
  }

  click() {
    return (document.body.onkeyup = (event) =>
      event.keyCode === 32 && this.up());
  }

  runLeft() {
    const elem = document.getElementById(this.id);

    this.obstacleLeft -= 20;
    elem.style.marginLeft = `${this.obstacleLeft}px`;
  }
}

class Player extends Move {
  constructor() {
    super();

    this.playerTop = window.innerHeight / 2 + 200;
    this.id = "player";
  }
  createPlayer() {
    const player = document.createElement("div");

    player.setAttribute("id", this.id);

    return field.appendChild(player);
  }

  click() {
    super.click();
  }
}
class Obstacles extends Move {
  constructor(left, id) {
    super();

    (this.left = left), (this.id = id);
    this.displayWidth = window.innerWidth;
    this.obstacleTopLeft = this.displayHeiht;
    this.obstacleTopHeight = 160;
    this.obstacleLeft = window.innerWidth;
    this.obstacleBottomHeight = 200;
    this.obstacleColor = "green"
  }

  createObstacleBottom() {
    const obstacleBottom = document.createElement("div");

    obstacleBottom.setAttribute("id", "obstacleBottom");

    obstacleBottom.style.backgroundColor = this.obstacleColor
    obstacleBottom.style.height = `${this.obstacleBottomHeight}px`;
    obstacleBottom.style.width = "30px";
    obstacles.style.padding = 0;
    obstacleBottom.style.marginLeft = `${this.obstacleLeft - 100}px`;

    obstacles.appendChild(obstacleBottom);
  }

  createObstacleTop() {
    const obstacleTop = document.createElement("div");

    obstacleTop.setAttribute("id", "obstacleTop");

    obstacleTop.style.backgroundColor = this.obstacleColor
    obstacleTop.style.height = `${this.obstacleTopHeight}px`;
    obstacleTop.style.width = "30px";
    obstacles.style.padding = 0;
    obstacleTop.style.marginLeft = `${this.obstacleLeft - 100}px`;
    obstacleTop.style.marginTop = `${
      window.innerHeight - this.obstacleTopHeight
    }px`;

    obstacles.appendChild(obstacleTop);
  }

  cretateObstacles() {
    const obstacles = document.createElement("div");

    obstacles.setAttribute("id", "obstacles");

    obstacles.style.display = "flex";
    obstacles.style.flexDirection = "column";
    obstacles.style.height = "100vh";

    field.appendChild(obstacles);

    this.createObstacleBottom();
    this.createObstacleTop();
  }
}

class GameOver{
  constructor() {
    this.displayHeiht = window.innerHeight;
    this.score = 0;
    this.offsetTop = player.offsetTop;
  }

  lose() {
    if (this.offsetTop <= 0 || this.displayHeiht <= this.offsetTop + 30) {
      alert(`Game over: your scroe ${this.score}`);
    }
  }
}

class RunGame {
  constructor() {
    this.player = new Player();
    this.goTop = new Obstacles(window.innerWidth - 100, "obstacleTop");
    this.bottomGo = new Obstacles(window.innerWidth - 100, "obstacleBottom");
    this.run();
  }

  run() {
    this.player.createPlayer();
    this.player.click();
    new Obstacles().cretateObstacles();

    setInterval(() => {
      this.player.down();
      this.goTop.runLeft();
      this.bottomGo.runLeft();
      new GameOver().lose();
    }, 100);
  }
}

class Style {
  constructor() {
    this.displayHeiht = window.innerHeight;
    this.field = document.getElementById("field");
    this.player = document.getElementById("player");
    this.playerLeft = 100;
    this.playerTop = this.displayHeiht / 2 + 200;
  }

  createStyle() {
    // const marquee = document.createElement("marquee");
    // const img = document.createElement("img");

    // marquee.setAttribute("id", "marquee")
    // marquee.setAttribute("behavior", "scroll")
    // marquee.setAttribute("direction","left")
    // img.setAttribute("id", "img")
    // img.setAttribute("src", "./img/CloudBackGround.jpg");
    // field.appendChild(marquee);
    // marquee.appendChild(img)

    obstacles.style.display = "flex";
    obstacles.style.flexDirection = "column";
    obstacles.style.height = "100vh";

    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.padding = 0;
    document.body.style.margin = 0;

    this.field.style.position = "realiteve";
    this.field.style.width = "100%";  
    this.field.style.height = "100%";
    this.field.style.backgroundImage = "url('./img/CloudBackGround.jpg')";
    this.field.style.display = "flex";

    // img.style.position = "absolute"
    // img.style.height = "100vh"
    // img.style.width = "100vw"
    // img.zIndex = "100";

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
    new RunGame();
    new Style().createStyle();
  }
}

new App();
