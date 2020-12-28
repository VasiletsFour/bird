"use strict";

class Element {
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

    return field.appendChild(obstacleBottom);
  }

  createObstacleTop() {
    const obstacleTop = document.createElement("div");

    obstacleTop.setAttribute("class", "obstacleTop");

    return field.appendChild(obstacleTop);
  }

  getObstaclesList(className) {
    return document.getElementsByClassName(className);
  }

  delete(px) {
    const obstacleTopList = this.getObstaclesList("obstacleTop");
    const obstacleBottomList = this.getObstaclesList("obstacleBottom");

    for (let i = 0; i <= obstacleTopList.length - 1; i++) {
      const pxTop = px.getIntLeft(obstacleTopList[i]);
      const pxBottom = px.getIntLeft(obstacleBottomList[i]) - 20;

      pxTop < 0 && obstacleTopList[i].remove();
      pxBottom < 0 && obstacleBottomList[i].remove();
    }
  }
}

class Style {
  #field = document.getElementById("field");

  constructor(element) {
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

    return null;
  }

  createPlayerStyle(player) {
    player.style.position = "absolute";
    player.zIndex = "10";
    player.style.backgroundColor = this.playerColor;
    player.style.borderRadius = "100%";
    player.style.width = "30px";
    player.style.height = "30px";
    player.style.marginLeft = `${this.playerLeft}px`;
    player.style.top = `${this.playerTop}px`;

    return null;
  }

  createObstacleBottomStyle(className) {
    className.style.position = "absolute";
    className.style.backgroundColor = this.obstacleColor;
    className.style.height = this.obstacleHeight;
    className.style.width = "40px";
    className.style.padding = 0;
    className.style.marginLeft = `${1000}px`;
    className.style.marginTop = `${568}px`;
  }

  createObstacleTopStyle(className) {
    className.style.position = "absolute";
    className.style.backgroundColor = this.obstacleColor;
    className.style.height = this.obstacleHeight;
    className.style.width = "40px";
    className.style.padding = 0;
    className.style.marginLeft = `${800}px`;
    className.style.marginTop = `${
      window.innerHeight - this.obstacleTopHeight
    }px`;
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
  #px = new Px();

  constructor(player) {
    this.player = player;
  }

  onClick() {
    return (document.body.onkeyup = (event) =>
      event.keyCode === 32 && this.#up());
  }

  #up() {
    const top = this.#px.getIntTop(player) - 40;

    return (player.style.top = `${top}px`);
  }

  down() {
    const top = this.#px.getIntTop(player) + 8;

    return (player.style.top = `${top}px`);
  }

  left(obstacleTop, obstacleBottom) {
    for (let i = 0; i <= obstacleTop.length - 1; i++) {
      let pxTop = this.#px.getIntLeft(obstacleTop[i]) - 20;
      let pxBottom = this.#px.getIntLeft(obstacleBottom[i]) - 20;

      obstacleTop[i].style.marginLeft = `${pxTop}px`;
      obstacleBottom[i].style.marginLeft = `${pxBottom}px`;
    }
  }
}

class GameOver {
  constructor(player) {
    this.score = 0;
  }

  #getFirstElement(element) {
    const list = element;

    return list[0]?.offsetLeft > 60 ? list[0] : list[1];
  }

  getScore(obstacleBottom, obstacleTop) {
    const top = this.#getFirstElement(obstacleTop);
    const bottom = this.#getFirstElement(obstacleBottom);
      
    if (
      top?.offsetLeft < player.offsetLeft ||
      bottom?.offsetLeft < player.offsetLeft
    ) {
      this.score += 1;
    }
  }

  lose(displayHeight, obstacleBottom, obstacleTop) {
    const top = this.#getFirstElement(obstacleTop);
    const bottom = this.#getFirstElement(obstacleBottom  );
    console.log(bottom?.offsetLeft,player.offsetLeft)
    if (
      player.offsetTop < 10 ||
      displayHeight < player.offsetTop + 27 ||
      (top?.offsetLeft <= player.offsetLeft &&
        top?.offsetTop + 400 >= player.offsetTop) ||
      (bottom?.offsetLeft <= player.offsetLeft &&
        bottom?.offsetTop - 15 <= player.offsetTop)   
    ) {
      return true;
    }
  }
}
class App {
  constructor() {
    this.stop = true;
    this.style = new Style();
    this.element = new Element(this.style);
    this.move = new Move(this.element.getPlaeyerId());
    this.gameOver = new GameOver(this.element.getPlaeyerId());
    this.px = new Px();
  }

  run() {
    this.style.createStyle();
    this.element.createPlayer();
    this.style.createPlayerStyle(this.element.getPlaeyerId());
    this.move.onClick();

    const firstInter = setInterval(() => {
      const top = this.element.createObstacleTop();
      const bottom = this.element.createObstacleBottom();
      this.style.createObstacleBottomStyle(bottom);
      this.style.createObstacleTopStyle(top);
    }, 3000);

    const secondInter = setInterval(() => {
      const topList = this.element.getObstaclesList("obstacleTop");
      const bottomList = this.element.getObstaclesList("obstacleBottom");
      const stop = this.gameOver.lose(this.style.getDisplayHeight(), bottomList, topList);

      this.move.left(topList, bottomList);
      this.element.delete(this.px);
      this.move.down();
      !stop && this.gameOver.getScore(bottomList, topList);

      if (stop) {
        this.stop = !stop;
        stopFirst();
        stopSecond();

        alert(`Your Score:${this.gameOver.score}`);
      }
    }, 150);

    const stopFirst = () => clearInterval(firstInter);
    const stopSecond = () => clearInterval(secondInter);
  }
}

new App().run();
