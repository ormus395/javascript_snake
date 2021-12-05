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

    console.log("Snake if grid: ", snake);

    // snake is a doubly linked list
    // need to traverse the snake to place each segment
    // snake pos
    let snakeSegment = snake.head;
    while (snakeSegment) {
      // console.log(snakeSegment);
      // console.log("Snake segment next ", snakeSegment.next);
      let snakePOS = snakeSegment.data;
      // console.log("Snake POS ", snakePOS);
      // console.log("Rabbit POS", rabbit.x, rabbit.y);
      if (this.isCollision(snake)) {
        return null;
      }
      this.board[snakePOS.y][snakePOS.x] = snake.toString();
      this.board[rabbit.y][rabbit.x] = rabbit.toString();

      snakeSegment = snakeSegment.next;
    }

    // console.log(this.board);
  }

  isCollision(snake) {
    let pos = snake.head.data;

    if (pos.x == -1 || pos.x == 25 || pos.y == -1 || pos.y == 25) {
      console.log("POS out of bounds");
      return true;
    } else if (this.board[pos.y][pos.x] === "S" && snake.head.next) {
      console.log("Hit body");
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
        if (col === "S") td.classList.add("snake");
        if (col === "R") td.classList.add("rabbit");

        tr.appendChild(td);
      });

      displayGrid.appendChild(tr);
    });

    parent.appendChild(displayGrid);
  }
}

export default Grid;
