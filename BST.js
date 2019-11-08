class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

class BST {
    constructor(root = null){
        this.root = root;
    }

    printTreePaths() {
        let result = [];

        if(this.root)
            this.buildPath(this.root, "", result);

        return result;
    }

    buildPath(node, path, result) {
        path += node.val.toString() + "->";

        // we're at a left because we don't have a left or right child
        // add path and return
        if(!node.right && !node.left) {
            result.push(path.substring(0, path.length - 2));
            return;
        }

        if(node.left)
            this.buildPath(node.left, path, result);

        if(node.right)
            this.buildPath(node.right, path, result);

        return result;
    }

    InOrderTraversal() {
        let result = [];

        if(this.root)
            this.inOrderTraversal(this.root, result);

        return result;
    }

    inOrderTraversal (node, result)  {
        if(!node)
            return;

        this.inOrderTraversal(node.left, result);

        result.push(node.val);

        this.inOrderTraversal(node.right, result);

        return result;
    }

    Insert(item) {
        let newNode = new TreeNode(item);

        this.root = this.sink(this.root, newNode);
    }

    sink(node, newNode) {
        if(!node) 
            return newNode;

        // if the node we're on is larger than the new node go left
        if(node.val >= newNode.val){
            node.left = this.sink(node.left, newNode);
        }
        else { // otherwise go right
            node.right = this.sink(node.right, newNode);
        }

        return node;
    }

    Find(item) {
        return this.search(this.root, item);
    }

    search(node, item) {
        if(!node)
            return null;

        if(node.val == item)
            return node;
        
        if(node.val >= item)
            return this.search(node.left, item);
        else
            return this.search(node.right, item);
    }
}

let bst = new BST();

bst.Insert(100);
bst.Insert(150);
bst.Insert(4500);
bst.Insert(12);
bst.Insert(48);
bst.Insert(234);
bst.Insert(10004);

console.log(bst.InOrderTraversal());

console.log(bst.Find(48));
console.log(bst.Find(100));
console.log(bst.Find(200));