class BinaryMinHeap {
    constructor() {
        this.heap = [];
    }

    Min () {
        if(this.heap.length == 0)
            throw Error("Heap is empty");
            
        return this.heap[0];
    }

    RemoveMin() {
        return this.heap.shift();
    }

    Insert(item) {
        this.heap.push(item);
        let i = this.heap.length - 1;
        while(i > 0) {
            let half = Math.floor(i/2);
            if(this.heap[half] <= this.heap[i])
                break;
            this.heap[i] = this.heap[half];
            this.heap[half] = item;

            i = Math.floor(i/2);
        }
    }
}