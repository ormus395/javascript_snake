/*
TODOS:

Need to work on collision with walls and rabbit
if colide with wall, clear the interval and end game
if collide with the rabbit, update score, increase size of snake
create new rabbit and place the new rabbit
*/

const SCALE = 20;

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    this.queue.shift();
  }

  getFront() {
    return this.queue[0];
  }
}

function trackKeys(keys) {
  let down = Object.create(null);

  let keyEventQueue = new Queue();

  function track(event) {
    if (keys.includes(event.key)) {
      // down[event.key] = event.type == "keydown";
      if(event.type == "keydown") {
        keyEventQueue.enqueue({[event.key]: true});
      }
      event.preventDefault();
    }
    console.log("Pressed")
  }
  window.addEventListener("keydown", track);
  // window.addEventListener("keyup", track);
  // console.log(down)
  console.log(keyEventQueue.queue)
  return keyEventQueue;
}

var arrowKeys =
  trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

function generateRandomPOS() {
  let pos = {
    x: Math.floor(Math.random() * 25),
    y: Math.floor(Math.random() * 25)
  };

  return pos;
}

class Game {
  constructor(snake, rabbit) {
    this.root = document.querySelector(".game");
    this.grid = new Grid(snake, rabbit);
    this.score = 0;
    this.snake = snake
    this.rabbit = rabbit
  }

  update(keys) {
    this.snake.update(keys);
    let newGrid = new Grid(this.snake, this.rabbit);
    // this.grid.update(this.snake);
    this.grid = newGrid;
    this.grid.drawGrid(this.root)
  }
}

// xDirection: -1 = left
// 1 = right
// 0 = not moving

// y direction 
// -1 = down
// 1 = up
// 0 = no y moving

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.speed = 1;
    this.xDirection = 0;
    this.yDirection = 0;
  }

  toString() {
    return "S";
  }
}

Snake.prototype.update = function(keys) {
  console.log(keys, 'snake update')
  let move = keys.getFront();

  if(move) {
    if(move.ArrowUp) {
      this.yDirection = -1;
      this.xDirection = 0;
    } else if(move.ArrowDown) {
      this.yDirection = 1;
      this.xDirection = 0;
    } else if(move.ArrowLeft) {
      this.yDirection = 0;
      this.xDirection = -1;
    } else if(move.ArrowRight) {
      this.yDirection = 0;
      this.xDirection = 1;
    }
  }

  this.x += this.xDirection;
  this.y += this.yDirection;

  keys.dequeue();
}

class Rabbit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "R";
  }
}

class Grid {
  constructor(snake, rabbit) {
    this.board = [];
    for(let row = 0; row < 25; row++) {
      let r = [];
      for(let col = 0; col < 25; col++) {
        r.push(" ");
      } 
      this.board.push(r);
    }

    this.board[snake.y][snake.x] = snake.toString();
    this.board[rabbit.y][rabbit.x] = rabbit.toString();
  }

  drawGrid(parent) {
    if(parent.hasChildNodes()) {
      let grid = document.querySelector(".grid");
      if(grid) {
        grid.remove()
      }
    }
    let displayGrid = document.createElement("table");
    displayGrid.classList.add("grid");
    this.board.map(row => {
      let tr = document.createElement("tr");

      row.map(col => {
        let td = document.createElement("td");
        if(col === "S") 
          td.classList.add("snake");
        else if(col === "R")
          td.classList.add("rabbit");

        tr.appendChild(td);
      })

      displayGrid.appendChild(tr);
    })

    parent.appendChild(displayGrid);
  }

  update(snake, rabbit) {
    this.board[snake.y][snake.x] = snake.toString();
  }
}

let randoPOS = generateRandomPOS();
let game = new Game(new Snake(), new Rabbit(randoPOS.x, randoPOS.y));

function update() {
  // want to update the game
  game.update(arrowKeys);
  console.log("im updating the game")
}

update()

// setInterval(update, 200);
