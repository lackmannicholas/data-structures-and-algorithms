class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(node) {
    this.heap.push(node);

    if(this.heap.length === 1) return node;

    let nodeIndex = this.heap.length - 1;
    let parentIndex = Math.floor((nodeIndex-1)/2);
    let parent = this.heap[parentIndex];

    return this.bubbleUp(node, parent, nodeIndex, parentIndex);
  }

  extractMin() {
    const min = this.heap.shift();

    this.maintainAfterDelete();
    
    return min;
  }

  maintainAfterDelete() {
    if(this.heap.length > 0) {
      // clean up to keep heap property intact
      const lastElement = this.heap.pop();
      this.heap.unshift(lastElement);
      this.bubbleDown(lastElement);
    }
  }

  deleteNode(node) {
    let removedNode = null;
    // implementing linear scan for the moment. will change out with recursive search later.
    for(const i in this.heap) {
      if(this.heap[i] === node) {
        removedNode = this.heap.splice(i, 1)[0];
        break;
      }
    }

    if(removedNode) {
      // maintain heap property
      this.maintainAfterDelete();
    }

    return removedNode;
  }

  bubbleUp(node, parent, nodeIndex, parentIndex) {
    while(nodeIndex > 0 && parent.key > node.key) {
      // bubble up the node until it's parents 
      this.heap[nodeIndex] = parent;
      this.heap[parentIndex] = node;

      // set data for next iteration
      nodeIndex = parentIndex;
      parentIndex = Math.floor((parentIndex-1)/2);

      // don't try to get a negative index - vv bad
      if(parentIndex < 0) break;

      parent= this.heap[parentIndex];
    }

    return node;
  }

  bubbleDown(node) {
    // if we only have one node, we don't need to do anything
    if(this.heap.length < 2) return node;

    let i = 0;
    let left = this.leftChild(i);
    let right = this.rightChild(i);

    // while the node is greater than at least one of it's children, bubble down
    while((left && node.key > left.key) || (right && node.key > right.key)) {
      let leftKey = left ? left.key : Number.MAX_SAFE_INTEGER;
      let rightKey = right ? right.key : Number.MAX_SAFE_INTEGER;

      if(leftKey < rightKey) {
        // swap with left child
        const leftChildI = this.leftChildIndex(i);
        this.heap[leftChildI] = node;
        this.heap[i] = left;
        i = leftChildI;
      }
      else {
        // swap with right child
        const rightChildI = this.rightChildIndex(i) ;
        this.heap[rightChildI] =  node;
        this.heap[i] = right;
        i = rightChildI;
      }

      // break if no more levels to go down
      if(i >= this.heap.length || (this.leftChildIndex(i) >= this.heap.length && this.rightChildIndex(i) >= this.heap.length)) break;

      // set up for next iteration
      left = this.leftChild(i);
      right = this.rightChild(i);
    }
  }

  leftChild(i) { return this.heap[this.leftChildIndex(i)] } 
  leftChildIndex(i) { return ((2 * i) + 1)}
  rightChild(i) { return this.heap[this.rightChildIndex(i)] } 
  rightChildIndex(i) { return ((2 * i) + 2)}
  isEmpty() { return this.heap.length > 0 }
}

function testMinHeap(array = [9,34,1,85,3,556,23,5,1]) {
  console.log(array);
  let minHeap = new MinHeap();
  for(let elem of array) {
    minHeap.insert({ key: elem });
  }
  console.log(minHeap.heap);
  console.log(`Deleting: ${minHeap.deleteNode(minHeap.heap[5]).key}`);
  console.log(`Deleting: ${minHeap.deleteNode(minHeap.heap[2]).key}`);
  while(minHeap.heap.length > 0) {
    console.log(minHeap.extractMin());
  }
}

module.exports = { testMinHeap, MinHeap };