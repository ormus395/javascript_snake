import Node from "../util/Node";

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
    this.head = new Node({
      x:this.x, y:this.y, xDirection: 0, yDirection: 0
    });
    this.tail = null;
    this.speed = 1;
    this.xDirection = 0;
    this.yDirection = 0;
  }

  toString() {
    return "S";
  }

  // need to make the snake bigger
  // receives pos object
  // create a new node, and assign the new position to the node
  // make new node the head
  getBigger(pos) {
    // create a new head, head has next coords, 
    // this creates the new head
    let nX = this.x
    let newHead = new Node(/* new Pos */);
    newHead.next = this.head;
    newHead.previous = null;

    this.head.prev = newHead;

    this.head = newHead;

    // now to create new Tail
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

export default Snake;