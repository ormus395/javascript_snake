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

export default Queue;