class Queue {
  constructor() {
    this.q = [];
  }

  enqueue(item) {
    this.q.push(item);
  }

  dequeue() {
    return this.q.shift();
  }

  peek() {
    if (this.q.length == 0)
      throw Error("Queue is empty");

    return this.q[0];
  }

  get isEmpty() {
    return this.q.length == 0;
  }

  get Count() {
    return this.q.length;
  }

  toString() {
    let result = "";

    this.q.forEach(item => {
      result += item + ",";
    });

    if (result.length > 0)
      result = result.substr(0, result.length - 1);

    return result;
  }
}

module.exports = Queue;