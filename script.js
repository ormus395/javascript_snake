/*
TODOS:

Need to work on collision with walls and rabbit
if colide with wall, clear the interval and end game
if collide with the rabbit, update score, increase size of snake
create new rabbit and place the new rabbit

GAME IS DETECTING RABBIT COLLISION
NEED TO CHANGE THE WAY THE SNAKE IS BUILT
MIGHT USED A LINKED LIST

when creating a the snake as a linked list, create a new head
// when eating rabbit,

to handle movement, create a new head with the position of the current direction
this pushed the links down, when doing this the tail must be deleted
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

// to be used to create the snake
class LinkedList {

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

  // if making the snake a linked list, update method calls update on
  // all of the links in the snake
  update(keys) {
    console.log(this.checkCollision())
    this.snake.update(keys);
    let newGrid = new Grid(this.snake, this.rabbit);
    // this.grid.update(this.snake);
    this.grid = newGrid;
    this.grid.drawGrid(this.root)
  }

  checkCollision() {
    if(this.snake.x === this.rabbit.x && this.snake.y === this.rabbit.y)
      return "Ate rabbit";
  }
}

// xDirection: -1 = left
// 1 = right
// 0 = not moving

// y direction 
// -1 = down
// 1 = up
// 0 = no y moving

// transform into linked list
// when eating the rabbit create a new node
class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = [];
    this.speed = 1;
    this.xDirection = 0;
    this.yDirection = 0;
  }

  toString() {
    return "S";
  }

  // need to make the snake bigger
  ateRabbit() {
  }
}

Snake.prototype.update = function(keys, rabbit) {
  let move = keys.getFront();

  if(move) {
    if(move.ArrowUp && this.yDirection != 1) {
      this.yDirection = -1;
      this.xDirection = 0;
    } else if(move.ArrowDown && this.yDirection != -1) {
      this.yDirection = 1;
      this.xDirection = 0;
    } else if(move.ArrowLeft && this.xDirection != 1) {
      this.yDirection = 0;
      this.xDirection = -1;
    } else if(move.ArrowRight && this.xDirection != -1) {
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
}

let randoPOS = generateRandomPOS();
let game = new Game(new Snake(), new Rabbit(randoPOS.x, randoPOS.y));

function update() {
  // want to update the game
  game.update(arrowKeys);
}

update()

// setInterval(update, 200);
