class Stack {
    constructor() {
        this.items = [];
    }

    push = (item) => {
        this.items.push(item);
    }

    pop = () => {
        if(this.items.length == 0)
            throw Error("Stack is empty");

        return item.pop();
    }

    peek = () => {
        return this.items[this.items.length - 1];
    }

    get isEmpty () {
        return this.items.length == 0;
    }

    toString = () => {
        let result = "";

        this.items.forEach(item => {
            result += item + ",";
        });

        if(result.length > 0)
            result = result.substr(0, result.length - 1);
        
        return result;
    }
}