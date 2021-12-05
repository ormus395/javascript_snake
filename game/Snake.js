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
    this.head = new Node({
      x: 0,
      y: 0,
    });
    this.tail = null;
    this.speed = 1;
    this.xDirection = 0;
    this.yDirection = 0;
  }

  toString() {
    return "S";
  }
}

Snake.prototype.update = function (keys, rabbit) {
  let move = keys.getFront();

  if (move) {
    if (move.ArrowUp && this.yDirection != 1) {
      this.yDirection = -1;
      this.xDirection = 0;
    } else if (move.ArrowDown && this.yDirection != -1) {
      this.yDirection = 1;
      this.xDirection = 0;
    } else if (move.ArrowLeft && this.xDirection != 1) {
      this.yDirection = 0;
      this.xDirection = -1;
    } else if (move.ArrowRight && this.xDirection != -1) {
      this.yDirection = 0;
      this.xDirection = 1;
    }
  }
  // alg for moving and updating
  // create a new head with new position based on the dirtection
  // make current head new head
  let oldPOS = Object.create(this.head.data);
  let newPOS = {
    x: (oldPOS.x += this.xDirection),
    y: (oldPOS.y += this.yDirection),
  };

  let newHead = new Node(newPOS);
  // if newPOS = rabbit POS
  // push the new node instead of reassinging the head
  // if there is no tail, create the tail
  if (newPOS.x === rabbit.x && newPOS.y === rabbit.y) {
    console.log("*** GETTING BIGGER ***");
    newHead.next = this.head;
    newHead.previous = null;
    this.head.previous = newHead;

    if (!this.tail) {
      this.tail = new Node(oldPOS);
      this.tail.previous = newHead;
      this.tail.next = null;
    }

    this.head = newHead;

    // console.log("Head: ", this.head);
    // console.log("Tail: ", this.tail);
  }
  // then make the tails previous node the new tail,
  //and delete the old tail
  else if (this.tail) {
    // still need to assign new head
    newHead.next = this.head;
    newHead.previous = null;

    this.head.previous = newHead;
    this.head = newHead;

    // console.log("Head", this.head);
    // console.log("tail in snake update function: ", this.tail);
    // console.log("Tail previous: ", this.tail.previous);
    // grab the tails previous nodes position
    if (this.tail.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }
  } else {
    this.head = newHead;
  }

  // this.head = newHead;

  keys.dequeue();
};

export default Snake;
