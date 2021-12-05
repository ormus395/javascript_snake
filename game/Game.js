import Grid from "./Grid";
import Rabbit from "./Rabbit";
import Snake from "./Snake";

class Game {
  constructor() {
    this.snake = new Snake();
    this.rabbit = new Rabbit(this.generateRandomPOS());
    this.root = document.querySelector(".game");
    this.grid = new Grid(this.snake, this.rabbit);
    this.score = 0;
  }

  // if making the snake a linked list, update method calls update on
  // all of the links in the snake
  update(keys) {
    let oldSnakePOS = Object.create(this.snake.head.data);
    this.snake.update(keys, this.rabbit);

    let snakeDirection = {
      yD: this.snake.yDirection,
      xD: this.snake.xDirection,
    };

    if (this.grid.isCollision(this.snake)) {
      return -1;
    }

    if (
      this.grid.board[oldSnakePOS.y + snakeDirection.yD][
        oldSnakePOS.x + snakeDirection.xD
      ] instanceof Snake &&
      this.snake.head.next
    ) {
      console.log("@@@ HIT BODY @@@");
      return -1;
    }

    let newSnakePOS = Object.create(this.snake.head.data);
    if (newSnakePOS.x == this.rabbit.x && newSnakePOS.y == this.rabbit.y) {
      this.rabbit = new Rabbit(this.generateRandomPOS());
    }

    let newGrid = new Grid(this.snake, this.rabbit);

    if (!newGrid) {
      return -1;
    }
    // this.grid.update(this.snake);
    this.grid = newGrid;
    this.grid.drawGrid(this.root);
  }

  generateRandomPOS() {
    let pos = {
      x: Math.floor(Math.random() * 25),
      y: Math.floor(Math.random() * 25),
    };

    return pos;
  }
}

export default Game;
