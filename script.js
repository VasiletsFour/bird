"use strict";

class Style {
  #field = document.getElementById("field");
  #player = document.getElementById("player");

  constructor() {
    this.displayHeiht = window.innerHeight;
    this.playerLeft = 100;
    this.playerTop = this.getDisplayHeight() / 2 + 200;
    this.obstacleColor = "green";
    this.playerColor = "red";
    this.obstacleHeight = "400px";
  }

  getDisplayHeight() {
    return window.innerHeight;
  }

  createStyle() {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.padding = 0;
    document.body.style.margin = 0;

    this.#field.style.position = "realiteve";
    this.#field.style.width = "100%";
    this.#field.style.height = "100%";
    this.#field.style.backgroundImage = "url('./img/CloudBackGround.jpg')";
    this.#field.style.display = "flex";
  }

  createPlayerStyle() {
    this.#player.style.position = "absolute";
    this.#player.zIndex = "10";
    this.#player.style.backgroundColor = this.playerColor;
    this.#player.style.borderRadius = "100%";
    this.#player.style.width = "30px";
    this.#player.style.height = "30px";
    this.#player.style.marginLeft = `${this.playerLeft}px`;
    this.#player.style.top = `${this.playerTop}px`;
  }

  createObstacleBottomStyle() {
    const obstaclesBottom = document.getElementsByClassName("obstacleBottom");
    const obstacleBottom = obstaclesBottom[obstaclesBottom.length - 1];

    obstacleBottom.style.position = "absolute";
    obstacleBottom.style.backgroundColor = this.obstacleColor;
    obstacleBottom.style.height = this.obstacleHeight;
    obstacleBottom.style.width = "40px";
    obstacleBottom.style.padding = 0;
    obstacleBottom.style.marginLeft = `${1000}px`;
    obstacleBottom.style.marginTop = `${568}px`;
  }

  createObstacleTopStyle() {
    const obstaclesTop = document.getElementsByClassName("obstacleTop");
    const obstacleTop = obstaclesTop[obstaclesTop.length - 1];

    obstacleTop.style.position = "absolute";
    obstacleTop.style.backgroundColor = this.obstacleColor;
    obstacleTop.style.height = this.obstacleHeight;
    obstacleTop.style.width = "40px";
    obstacleTop.style.padding = 0;
    obstacleTop.style.marginLeft = `${800}px`;
    obstacleTop.style.marginTop = `${
      window.innerHeight - this.obstacleTopHeight
    }px`;
  }
}

class Element {
  #style = new Style();

  createPlayer() {
    const player = document.createElement("div");

    player.setAttribute("id", "player");

    return field.appendChild(player);
  }

  getPlaeyerId() {
    return document.getElementById("player");
  }

  createObstacleBottom() {
    const obstacleBottom = document.createElement("div");

    obstacleBottom.setAttribute("class", "obstacleBottom");
    field.appendChild(obstacleBottom);

    return this.#style.createObstacleBottomStyle();
  }

  createObstacleTop() {
    const obstacleTop = document.createElement("div");

    obstacleTop.setAttribute("class", "obstacleTop");
    field.appendChild(obstacleTop);

    return this.#style.createObstacleTopStyle();
  }

  getObstaclesList(className) {
    return document.getElementsByClassName(className);
  }
}

class Px {
  getIntTop(elem) {
    const topWithPx = window.getComputedStyle(elem).top;
    const topStr = topWithPx.replace("px", "");

    return Number(topStr);
  }

  getIntLeft(elem) {
    const topWithPx = window.getComputedStyle(elem).marginLeft;
    const topStr = topWithPx.replace("px", "");

    return Number(topStr);
  }
}
class Move {
  #element = new Element();
  #px = new Px();
  #player = this.#element.getPlaeyerId();
  #obstacleTop = this.#element.getObstaclesList("obstacleTop");
  #obstacleBottom = this.#element.getObstaclesList("obstacleBottom");

  constructor() {
    this.top = this.#px.getIntTop(this.#player);

    this.playerClick();
  }

  playerClick() {
    return (document.body.onkeyup = (event) =>
      event.keyCode === 32 && this.up());
  }

  up() {
    this.top -= 40;
    this.#player.style.top = `${this.top}px`;
  }

  down() {
    this.top += 3;
    this.#player.style.top = `${this.top}px`;
  }

  left() {
    for (let i = 0; i <= this.#obstacleTop.length - 1; i++) {
      let pxTop = this.#px.getIntLeft(this.#obstacleTop[i]) - 20;
      let pxBottom = this.#px.getIntLeft(this.#obstacleBottom[i]) - 20;

      this.#obstacleTop[i].style.marginLeft = `${pxTop}px`;
      this.#obstacleBottom[i].style.marginLeft = `${pxBottom}px`;
    }
  }
}

class DelEl {
  #element = new Element();
  #px = new Px();
  #obstacleTop = this.#element.getObstaclesList("obstacleTop");
  #obstacleBottom = this.#element.getObstaclesList("obstacleBottom");

  delete() {
    for (let i = 0; i <= this.#obstacleTop.length - 1; i++) {
      let pxTop = this.#px.getIntLeft(this.#obstacleTop[i]);
      let pxBottom = this.#px.getIntLeft(this.#obstacleBottom[i]) - 20;

      pxTop < 0 && this.#obstacleTop[i].remove();
      pxBottom < 0 && this.#obstacleBottom[i].remove();
    }
  }
}

class GameOver {
  #element = new Element();
  #player = this.#element.getPlaeyerId();

  constructor() {
    this.score = 0;
  }

  getFirstElement(className) {
    const list = this.#element.getObstaclesList(className);

    return list[0]?.offsetLeft > 60 ? list[0] : list[1];
  }

  getScore() {
    const top = this.getFirstElement("obstacleTop");
    const bottom = this.getFirstElement("obstacleBottom");

    if (
      top?.offsetLeft < this.#player.offsetLeft ||
      bottom?.offsetLeft < this.#player.offsetLeft
    ) {
      this.score += 1;
    }
  }

  lose() {
    const top = this.getFirstElement("obstacleTop");
    const bottom = this.getFirstElement("obstacleBottom");

    if (
      this.#player.offsetTop < 0 ||
      this.displayHeiht < this.#player.offsetTop + 30 ||
      (top?.offsetLeft <= this.#player.offsetLeft &&
        top?.offsetTop + 400 >= this.#player.offsetTop) ||
      (bottom?.offsetLeft <= this.#player.offsetLeft &&
        bottom?.offsetTop - 15 <= this.#player.offsetTop)
    ) {
      alert(`Game over: your scroe ${this.score}`);
    }
  }
}

class RunGame {
  constructor() {
    this.createEl = new Element();
    this.move = new Move();
    this.gameOver = new GameOver();
    this.del = new DelEl();
  }

  run() {
    setInterval(() => {
      this.createEl.createObstacleTop();
      this.createEl.createObstacleBottom();
    }, 3000);

    setInterval(() => {
      this.move.left();
      this.del.delete();
      this.move.down();
      this.gameOver.lose();
      this.gameOver.getScore();
    }, 150);
  }
}

class App {
  constructor() {
    new Style().createStyle();
    new Element().createPlayer();
    new Style().createPlayerStyle();
    new RunGame().run();
  }
}

new App();
