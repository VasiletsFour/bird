"use strict";

class Element {
  createElement(src) {
    const img = document.createElement("img");
    const element = document.createElement("div");

    img.style.width = "100%";
    img.style.height = "100%";

    img.setAttribute("src", src);

    element.appendChild(img);

    return element;
  }
}

class Player extends Element {
  createPlayer() {
    const player = this.createElement("./img/RedBird.png");

    player.setAttribute("id", "player");

    return field.appendChild(player);
  }

  getPlaeyerId() {
    return document.getElementById("player");
  }
}

class Obstacles extends Element {
  constructor(className) {
    super();

    this.className = className;
  }

  createObstacle() {
    const obstacle = this.createElement("./img/pipe.png");

    obstacle.setAttribute("class", this.className);

    return field.appendChild(obstacle);
  }

  getObstaclesList() {
    return document.getElementsByClassName(this.className);
  }

  delete(px) {
    const obstacleList = this.getObstaclesList(this.className);

    for (let i = 0; i <= obstacleList.length - 1; i++) {
      const pxObstcle = px.getIntLeft(obstacleList[i]);

      pxObstcle < 0 && obstacleList[i].remove();
    }
  }
}

class Style {
  #field = document.getElementById("field");

  constructor() {
    this.obstacleHeight = this.getDisplayHeight()/2-100;
    this.playerLeft = 100;
    this.playerTop = this.getDisplayHeight() / 2;
    this.marginLeftObstacle = this.#getDisplayWidth() - 100;
  }

  getDisplayHeight() {
    return window.innerHeight;
  }

  #getDisplayWidth() {
    return window.innerWidth;
  }

  createStyle() {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.padding = 0;
    document.body.style.margin = 0;

    this.#field.style.position = "realiteve";
    this.#field.style.width = "100%";
    this.#field.style.height = "100%";
    this.#field.style.backgroundImage = "url('./img/sky.jpg')";
    this.#field.style.display = "flex";

    return null;
  }

  createPlayerStyle() {
    player.style.position = "absolute";
    player.zIndex = "10";
    player.style.transform = `rotate(0.0turn)`;
    player.style.borderRadius = "100%";
    player.style.width = "60px";
    player.style.height = "60px";
    player.style.marginLeft = `${this.playerLeft}px`;
    player.style.top = `${this.playerTop}px`;

    return null;
  }

  createObstacleBottomStyle(className, height=0, left=0) {
    className.style.position = "absolute";
    className.style.height = `${this.obstacleHeight + height}px`;
    className.style.width = "80px";
    className.style.marginLeft = `${this.marginLeftObstacle + left}px`;
    className.style.bottom = 0;

    return null;
  }

  createObstacleTopStyle(className, height=0, left=0) {
    className.style.transform = `rotate(0.5turn)`;
    className.style.position = "absolute";
    className.style.height = `${this.obstacleHeight + height}px`;
    className.style.width = "70px";
    className.style.marginLeft = `${this.marginLeftObstacle + left}px`;

    return null;
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
    const bottom = this.#getFirstElement(obstacleBottom);

    if (
      player.offsetTop < 10 ||
      displayHeight < player.offsetTop + 27 ||
      (top?.offsetLeft <= player.offsetLeft &&
        top?.offsetTop + 200 >= player.offsetTop) ||
      (bottom?.offsetLeft <= player.offsetLeft &&
        bottom?.offsetTop - 15 <= player.offsetTop)
    ) {
      return true;
    }
  }
}

class RandomInt {
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}

class Storage {
  getLocalStorage(score) {
    let bestScore = Number(localStorage.getItem("myScore"));

    if (bestScore < score) {
      bestScore = score;
      localStorage.setItem("myScore", score);
    }

    return bestScore;
  }
}

class Level {
  getLevel(score) {
    let level = 1;

    switch (score) {
      case score > 10:
        level = 2;
        break;
      case score > 20:
        level = 2;
    }

    return level;
  }
}
class App {
  constructor() {
    this.stop = true;
    this.player = new Player();
    this.obstacleTop = new Obstacles("obstacleTop");
    this.obstacleBottom = new Obstacles("obstacleBottom");
    this.style = new Style();
    this.move = new Move(this.player.getPlaeyerId());
    this.gameOver = new GameOver(this.player.getPlaeyerId());
    this.px = new Px();
    this.random = new RandomInt();
    this.storage = new Storage();
    this.level = new Level()
  }

  run() {
    this.style.createStyle();
    this.player.createPlayer();
    this.style.createPlayerStyle(this.player.getPlaeyerId());
    this.move.onClick();

    const firstInter = setInterval(() => {
      const level = this.level.getLevel(this.gameOver.score)
      
      let maxHeight
      let minHeight
      let maxLeft
      let minLeft
      
      if(level ===1){
        maxHeight = 50
        minHeight = 10
        minLeft = 10
        maxLeft = 50
      }

      if(level==2){
        maxHeight = 70
        minHeight = 40
        minLeft = 0
        maxLeft = 30
      }

      if(level ===3){
        maxHeight = 80
        minHeight = 70
        minLeft = 10
        maxLeft = 20
      }

      
      const getRandomTopHeight = this.random.getRandom(minHeight, maxHeight);
      const getRandomBottomHeight = this.random.getRandom(minHeight, maxHeight);
      const getRandomTopLeft = this.random.getRandom(minLeft, maxLeft);
      const getRandomBottomLeft = this.random.getRandom(minLeft, maxLeft);
  
      const top = this.obstacleTop.createObstacle();
      const bottom = this.obstacleBottom.createObstacle();

      this.style.createObstacleBottomStyle(bottom, getRandomTopHeight, getRandomTopLeft);
      this.style.createObstacleTopStyle(top, getRandomBottomHeight, getRandomBottomLeft);
    }, 5000);

    const secondInter = setInterval(() => {
      const topList = this.obstacleTop.getObstaclesList();
      const bottomList = this.obstacleBottom.getObstaclesList();
      const stop = this.gameOver.lose(
        this.style.getDisplayHeight(),
        bottomList,
        topList
      );

      this.move.left(topList, bottomList);
      this.obstacleTop.delete(this.px);
      this.obstacleBottom.delete(this.px);

      this.move.down();

      !stop && this.gameOver.getScore(bottomList, topList);

      if (stop) {
        this.stop = !stop;
        stopFirst();
        stopSecond();

        const bestScore = this.storage.getLocalStorage(this.gameOver.score);

        alert(`Your Score:${this.gameOver.score}, best Score:${bestScore}`);
      }
    }, 150);

    const stopFirst = () => clearInterval(firstInter);
    const stopSecond = () => clearInterval(secondInter);
  }
}

new App().run();
