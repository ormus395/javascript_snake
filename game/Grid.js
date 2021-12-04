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

    // snake pos
    let snakePOS = snake.head.data;
    console.log("Snake POS ", snakePOS);
    this.board[snakePOS.y][snakePOS.x] = snake.toString();
    this.board[rabbit.y][rabbit.x] = rabbit.toString();
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
        else if (col === "R") td.classList.add("rabbit");

        tr.appendChild(td);
      });

      displayGrid.appendChild(tr);
    });

    parent.appendChild(displayGrid);
  }
}

export default Grid;
