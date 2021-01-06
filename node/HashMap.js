/*
    Implemented with bitwise hashing and storing key value in a JS object
*/
class HashMap {
    constructor() {
        this.map = new Map();
    }

    getValue(key) {
        // if not available, undefined is returned
        return this.map.get(this.hash(key));
    }

    setValue(key, value) {
        this.map.set(this.hash(key), value);
        return this.map.get(this.hash(key));
    }

    remove(key) {
        let item = this.map.get(this.hash(key));
        this.map.delete(this.hash(key));
        return item;
    }

    // implementation of Java's String.hashCode() method
    hash(key) {
        var hash = 0;
        if(key.length == 0) return hash;
        for(var i = 0; i < key.length; i++) {
            let c = key.charCodeAt(i);
            hash = ((hash<<5)-hash)+c;
            hash = hash & hash;
        }
        return hash;
    }
}

module.exports = HashMap;

let hash = new HashMap();

hash.setValue("ME!", { name: "Nick Lackman", nickname: "lackdaddy"});
hash.setValue("SecondME!", { name: "Nick Lackman", nickname: "better lackdaddy"});
hash.setValue("Other", { name: "New Person", nickname: null});

console.log(hash.getValue("ME!"));
console.log(hash.getValue("SecondME!"));
console.log(hash.getValue("Other"));
console.log(hash.getValue("Null"));

hash.remove("ME!");
hash.remove("SecondME!");
hash.remove("Other");