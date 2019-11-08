class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.end = null;
        this.count = 0;
    }

    first() {
        return this.head ? this.head.val : null;
    }

    last() {
        return this.end ? this.end.val : null;
    }

    prepend(item) {
        let node = new Node(item);
        
        node.next = this.head;

        this.head = node;

        // maintain the end if this is the first node
        if(!this.end && this.count == 0)
            this.end = node;

        this.count++;
    }

    removeFirst() {
        if(this.count == 0)
            throw Error("LinkedList is empty");

        let first = this.head;

        this.head = first.next;

        this.count--;

        return first.val;
    }

    removeLast() {
        if(this.count == 0)
            throw Error("LinkedList is empty");

        let last = this.end;
    
        this.end = this.end.prev;
        this.end.next = null;

        this.count--;

        return last.val;
    }

    insertAfter(i, item) {
        if(i >= this.count)
            throw Error("i > the number of items in the list");
        
        if(i == this.count - 1) {
            this.end.next = new Node(item);
            this.end = this.end.next;
            return;
        }

        let beforeNode = this.start;

        while(i > 0) {
            beforeNode = beforeNode.next;
            i--;
        }

        let afterNode = beforeNode.next;

        let newNode = new Node(item);
        newNode.prev = beforeNode;
        newNode.next = afterNode;

        beforeNode.next = newNode;

        afterNode.prev = newNode;

        this.count++;
    }

    removeAfter(i) {
        if(i >= this.count)
            throw Error("i > the number of items in the list");
        
        if(i == this.count - 1) {
            let end = this.end;
            this.end = this.end.prev;
            this.end.next = null;
            return end.val;
        }

        let beforeNode = this.head;

        while(i > 0) {
            beforeNode = beforeNode.next;
            i--;
        }

        let removeNode = beforeNode.next;

        beforeNode.next = removeNode.next;
        removeNode.next.prev = beforeNode;

        this.count--;

        return removeNode.val;
    }

    get isEmpty() {
        return this.count == 0;
    }

    get Count() {
        return this.count;
    }
}

let llCoolList = new LinkedList();

llCoolList.prepend("first head");
llCoolList.prepend("second head");
llCoolList.prepend("third head");
llCoolList.prepend("fourth head");

console.log(llCoolList.first());
console.log(llCoolList.last());

console.log(llCoolList.removeAfter(1));
console.log(llCoolList.removeLast());
console.log(llCoolList.removeFirst());
