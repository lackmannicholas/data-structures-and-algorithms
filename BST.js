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

    printTreePaths = () => {
        let result = [];

        if(this.root)
            this.buildPath(this.root, "", result);

        return result;
    }

    buildPath = (node, path, result) => {
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

    InOrderTraversal = () => {
        let result = [];

        if(this.root)
            this.inOrderTraversal(this.root, result);

        return result;
    }

    inOrderTraversal = (node, result) => {
        if(!node)
            return;

        this.inOrderTraversal(node.left, result);

        result.push(node.val);

        this.inOrderTraversal(node.right, result);

        return result;
    }
}



modules.export = BST;