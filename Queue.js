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
        if(this.q.length == 0)
            throw Error("Queue is empty");

        return this.q[0];
    }

    get isEmpty() {
        return this.q.length == 0;
    }

    get Count() {
        return this.q.length;
    }
}

let queue = new Queue();

console.log(queue.isEmpty);
queue.enqueue({Name: "this name"});
queue.enqueue({Count: 2354});
console.log(queue.peek());
console.log(queue.Count);
console.log(queue.dequeue());
console.log(queue.isEmpty);
console.log(queue.Count);
console.log(queue.dequeue());
console.log(queue.Count);
console.log(queue.isEmpty);