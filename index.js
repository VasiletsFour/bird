"use strict";

class Style {
  #root = document.getElementById("root");

  constructor() {
    this.obstacleHeight = this.getDisplayHeight()/2-100;
    this.playerLeft = 100;
    this.playerTop = this.getDisplayHeight() / 2;
    this.marginLeftObstacle = this.#getDisplayWidth() - 100;

    this.createStyle()
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

    this.#root.style.position = "relative";
    this.#root.style.overflow = "hidden"
    this.#root.style.width = "100vw";
    this.#root.style.height = "100vh";
    this.#root.style.backgroundImage = "url('./img/sky.jpg')";
    this.#root.style.display = "flex";

    return null;
  }

  createPlayerStyle() {
    player.style.position = "absolute";
    player.zIndex = "10";
    player.style.transform = `rotate(-5deg)`;
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
  constructor(){
    super()
    this.createPlayer()
  }
  
  createPlayer() {
    const player = this.createElement("./img/RedBird.png");

    player.setAttribute("id", "player");

    return root.appendChild(player);
  }

  static getPlaeyerId() {
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

    return root.appendChild(obstacle);
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


class Px {
  getIntTop(elem) {    
    const topWithPx = window?.getComputedStyle(elem).top;
    const topStr = topWithPx.replace("px", "");
    
    return Number(topStr);
  }

  getIntLeft(elem) {
    const leftWithPx = window.getComputedStyle(elem).marginLeft;
    const leftStr = leftWithPx.replace("px", "");
        
    return Number(leftStr);
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
    const top = player.offsetTop - 40>0? this.#px.getIntTop(player) - 40:0;
    
    this.player.style.transform = "rotate(-15deg)"
    this.player.style.top = `${top}px`
  }

  down() {
    const top = this.#px.getIntTop(player) + 8;

    this.player.style.transform = "rotate(15deg)"
    this.player.style.top = `${top}px`
  }

  left(obstacle) {
    for (let i = 0; i <= obstacle.length - 1; i++) {
      let px = obstacle[i] && this.#px.getIntLeft(obstacle[i]) - 20;
      if(obstacle[i])  obstacle[i].style.marginLeft = `${px}px`;
      
    }
  }
}

class GameOver {
  constructor() {
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
    const playerTop = player.offsetTop
    const playerLeft =player.offsetLeft
    const top = this.#getFirstElement(obstacleTop);
    const bottom = this.#getFirstElement(obstacleBottom);
    const topHeight = top?.style?.height? Number(top?.style?.height.replace(/px$/, "")): 0 
    const bottomHeight = bottom?.style.height? displayHeight - Number(bottom?.style?.height.replace(/px$/, "")):displayHeight
    
    if (
      playerTop < 1 || displayHeight < playerTop + 53||
      (top?.offsetLeft <= playerLeft && topHeight >= playerTop) ||
      (bottom?.offsetLeft <= playerLeft && bottomHeight-30 <= playerTop)) {
      return true;
    }
  }
}

class RandomInt {
  static getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
}

class Storage {
  static getLocalStorage(score) {
    let bestScore = Number(localStorage.getItem("myScore"));

    if (bestScore < score) {
      bestScore = score;
      localStorage.setItem("myScore", score);
    }

    return bestScore;
  }
}

class Level {
  static getLevel(score) {
    if(score <10){ 
      return {
          maxHeight:10,
          minHeight:60,
          minLeft:0,
          maxLeft:100
      }
    }
    
    if(score<20) {
      return {
        maxHeight: 70,
        minHeight: 40,
        minLeft:0,
        maxLeft:50
      }
    }

    return {
        maxHeight:80,
        minHeight:70,
        minLeft:10,
        maxLeft:20
    }
  }
}

class App {
  #firstIter = ()=>setInterval(()=>this.afterStart(), 5000)
  #secondInter= ()=>setInterval(()=>this.move.down(), 150)
  #thirdInter= ()=>setInterval(()=>this.beforeStart(), 90)

  constructor() {
    new Player()

    this.stop = true;
    this.player = Player.getPlaeyerId();
    this.obstacleTop = new Obstacles("obstacleTop");
    this.obstacleBottom = new Obstacles("obstacleBottom");
    this.style = new Style();
    this.move = new Move(this.player);
    this.gameOver = new GameOver(this.player);
    this.px = new Px();
    this.random = (min, max)=>RandomInt.getRandom(min, max);
    this.bestScore = (score)=> Storage.getLocalStorage(score);
    this.level = (score)=> Level.getLevel(score)
  }

  afterStart(){
    const level = this.level(this.gameOver.score)
    
    const getRandomTopHeight = this.random(level.minHeight, level.maxHeight);
    const getRandomBottomHeight = this.random(level.minHeight, level.maxHeight);
    const getRandomTopLeft = this.random(level.minLeft, level.maxLeft);
    const getRandomBottomLeft = this.random(level.minLeft, level.maxLeft);
    
    const top = this.obstacleTop.createObstacle();
    const bottom = this.obstacleBottom.createObstacle();

    this.style.createObstacleTopStyle(top, getRandomBottomHeight, getRandomBottomLeft);
    this.style.createObstacleBottomStyle(bottom, getRandomTopHeight, getRandomTopLeft);    
  }

  beforeStart(){
    const topList = this.obstacleTop.getObstaclesList();
    const bottomList = this.obstacleBottom.getObstaclesList();

    const stop = this.gameOver.lose(
      this.style.getDisplayHeight(),
      bottomList,
      topList
    );

    
    this.obstacleTop.delete(this.px);
    this.obstacleBottom.delete(this.px);
    this.move.left(topList);
    this.move.left( bottomList)
    
    if(!stop) return this.gameOver.getScore(bottomList, topList);
    if (stop) return this.stopGame()
  }

  run() {
    this.style.createPlayerStyle(this.player);
    this.move.onClick();
    this.afterStart()
   
    this.#firstIter()
    this.#secondInter()
    this.#thirdInter()

  }

  stopGame(){
    if (!this.stop) return;

    const bestScore = this.bestScore(this.gameOver.score);
    
    this.stop = !this.stop;
    
    clearInterval(this.#firstIter);
    clearInterval(this.#secondInter)
    clearInterval(this.#thirdInter)

    
    alert(`Your Score:${this.gameOver.score}, best Score:${bestScore}`);
    
    return window.location   .reload()
  }
}

new App().run();
