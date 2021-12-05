import Snake from "./Snake";

class Grid {
  constructor(snake, rabbit) {
    this.board = [];
    for (let row = 0; row < 25; row++) {
      let r = [];
      for (let col = 0; col < 25; col++) {
        r.push(" ");
      }
      this.board.push(r);
    }

    // snake is a doubly linked list
    // need to traverse the snake to place each segment
    // snake pos
    let snakeSegment = snake.head;
    while (snakeSegment) {
      let snakePOS = snakeSegment.data;
      if (this.isCollision(snake)) {
        return null;
      }
      this.board[snakePOS.y][snakePOS.x] = snake;
      this.board[rabbit.y][rabbit.x] = rabbit;

      snakeSegment = snakeSegment.next;
    }

    // console.log(this.board);
  }

  isCollision(snake) {
    let pos = snake.head.data;

    if (pos.x == -1 || pos.x == 25 || pos.y == -1 || pos.y == 25) {
      return true;
    }
  }

  drawGrid(parent) {
    if (parent.hasChildNodes()) {
      let grid = document.querySelector(".grid");
      if (grid) {
        grid.remove();
      }
    }
    let displayGrid = document.createElement("table");
    displayGrid.classList.add("grid");
    this.board.map((row) => {
      let tr = document.createElement("tr");

      row.map((col) => {
        let td = document.createElement("td");
        if (col.toString() === "S") td.classList.add("snake");
        if (col.toString() === "R") td.classList.add("rabbit");

        tr.appendChild(td);
      });

      displayGrid.appendChild(tr);
    });

    parent.appendChild(displayGrid);
  }
}

export default Grid;
