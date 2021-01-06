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

    toString() {
        let result = "";

        this.q.forEach(item => {
            result += item + ",";
        });

        if(result.length > 0)
            result = result.substr(0, result.length - 1);
        
        return result;
    }
}

let queue = new Queue();

console.log(queue.isEmpty);
queue.enqueue({Name: "this name"});
queue.enqueue({Count: 2354});
console.log(queue.toString());
console.log(queue.peek());
console.log(queue.Count);
console.log(queue.dequeue());
console.log(queue.isEmpty);
console.log(queue.Count);
console.log(queue.dequeue());
console.log(queue.Count);
console.log(queue.isEmpty);