class BinaryMinHeap {
    constructor(array = [], priorityName = null) {
        this.heap = [];
        // allows a user to use a property name as the priority value
        this.priorityName = priorityName;
        this.size = 0;

        //initial heap
        array.forEach(item => {
            this.Insert(item);
        });
    }

    // Gets value of minimum item
    Min () {
        if(this.heap.length == 0)
            throw Error("Heap is empty");
            
        return this.heap[0];
    }

    // Removes Minimum item
    Pop() {
        if(this.heap.length == 0)
            throw Error("Heap is empty");

        let min = this.heap.shift();
        this.size--;

        // processing work before we return the min:
        let last = this.heap.splice(this.heap.length-1, 1)[0];
        this.heap.unshift(last);
        this.heapify(0);
        
        return min;
    }

    // Inserts item and swims upward
    Insert(item) {
        this.heap.push(item);
        this.size++;

        let i = this.size - 1;
        while(i > 0) {
            let parent = this.parentIndex(i);

            if(this.validParent(i, parent))
                break;

            this.heap[i] = this.heap[parent];
            this.heap[parent] = item;

            i = parent;
        }
    }

    // Creates valid heaps, and subheaps
    heapify(currentParent) {
        let left = this.left(currentParent);
        let right = this.right(currentParent);
        let bestParent = currentParent;

        // looking for the best parent that fulfills the heap property for this node and it's children
        if(left < this.size && !this.validParent(left, bestParent)) {
            bestParent = left;
        }
        if(right < this.size && !this.validParent(right, bestParent)) {
            bestParent = right;
        }

        // if the current parent is not the best parent, we have some work to do
        if(currentParent != bestParent) {
            // swapping new parent with old parent
            let currentParentValue = this.heap[currentParent];
            this.heap[currentParent] = this.heap[bestParent];
            this.heap[bestParent] = currentParentValue;

            // recurse from the best parent's old position
            this.heapify(bestParent);
        }
    }

    // Returns - index of left child
    left(i) {
        return (i*2)+1;
    }

    // Returns - index of right child
    right(i) {
        return (i*2)+2;
    }

    // Returns - Boolean if Heap property of Parent priority < Child priority
    validParent(i, p) {
        // if the user has specified a priorityName property, use that for comparision
        if(this.priorityName) {
            return this.heap[p][this.priorityName] <= this.heap[i][this.priorityName];
        }
        else { // otherwise use the value of the item itself
            return this.heap[p] <= this.heap[i];
        }
    }

    // Returns - index of parent
    parentIndex(i) {
        if(i === 0)
            return 0;

        return Math.floor((i-1)/2);
    }
}
module.exports = BinaryMinHeap;

let weightArray = [
    { weight: 5, source: 1, dest: 3},
    { weight: 10, source: 1, dest: 3},
    { weight: 2, source: 1, dest: 3},
    { weight: .8, source: 1, dest: 3},
    { weight: 6, source: 1, dest: 3},
]

let objectHeap = new BinaryMinHeap(weightArray, "weight");


console.log(objectHeap.Pop());
console.log(objectHeap.Pop());
console.log(objectHeap.Pop());
console.log(objectHeap.Pop());
console.log(objectHeap.Pop());

// let heap = new BinaryMinHeap([431, 139, 1214, 335, 1816, 928, 1038, 602, 1597, 1779, 1257, 1500, 1587, 630, 1210, 918, 1169, 765, 137, 1095, 523, 1271, 941, 867, 408, 499, 277, 1845, 1127, 1731, 107, 1627, 1208, 555, 1160, 421, 1287, 1577, 766, 1899, 50, 701, 400, 1768, 539, 377, 117, 1342, 976, 453, 1994, 1159, 232, 305, 1759, 1354, 911, 817, 1949, 1318, 1927, 5, 650, 273, 1282, 1121, 1413, 1686, 138, 1436, 1082, 1743, 603, 1163, 1356, 1703, 683, 1154, 48, 586, 430, 458, 1393, 131, 1150, 1357, 1650, 1275, 951, 235, 1457, 1438, 1965, 1589, 1195, 460, 1586, 824, 284, 163]);

// console.log(heap.Min());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.Pop());
// console.log(heap.size);

console.log("done");