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
    this.snake.update(keys, this.rabbit);
    let snakePOS = this.snake.head.data;
    if (snakePOS.x == this.rabbit.x && snakePOS.y == this.rabbit.y) {
      this.rabbit = new Rabbit(this.generateRandomPOS());
    }
    let newGrid = new Grid(this.snake, this.rabbit);
    if (newGrid.isCollision(this.snake) || !newGrid) {
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
