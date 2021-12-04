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

  // need to make the snake bigger
  // receives pos object
  // create a new node, and assign the new position to the node
  // make new node the head
  getBigger() {
    console.log("Got bigger");
    // create a new head, head has next coords,
    // this creates the new head
    let lastPOS = this.head.data;
    let newPOS = {
      x: (lastPOS.x += this.xDirection),
      y: (lastPOS.y += this.yDirection),
    };
    let newHead = new Node(newPOS);
    newHead.next = this.head;
    newHead.previous = null;

    // if not tail, create new tail
    if (!this.tail) {
      this.tail = new Node(this.head.data);
      this.tail.previous = newHead;
      this.tail.next = null;
    }

    this.head = newHead;
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
  let oldPOS = this.head.data;
  let newPOS = {
    x: (oldPOS.x += this.xDirection),
    y: (oldPOS.y += this.yDirection),
  };

  let newHead = new Node(newPOS);
  // if newPOS = rabbit POS
  // push the new node instead of reassinging the head
  // if there is no tail, create the tail
  if (newPOS.x === rabbit.x && newPOS.y === rabbit.y) {
    console.log("GEtting bigger");
    newHead.next = this.head;
    newHead.previous = null;
    this.head.previous = newHead;

    if (!this.tail) {
      this.tail = this.head;
    }

    this.head = newHead;
    return;
  }

  // if just the head
  if (!this.tail) {
    this.head = newHead;
  }
  // then make the tails previous node the new tail,
  //and delete the old tail
  else if (this.tail) {
    console.log("I shouldnt call with getting bigger");
    console.log("tail in snake update function: ", this.tail);
    // grab the tails previous nodes position
    let pos;
    if (this.tail.previous) {
      pos = this.tail.previous.data;
    }
    let newTail = new Node(pos);
    newTail.next = null;
    this.tail = newTail;
  }

  keys.dequeue();
};

export default Snake;
