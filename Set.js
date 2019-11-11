// Extentions for Sets
Set.prototype.union = function union(set) {
    let unionSet = new Set();

    this.forEach(item => {
        unionSet.add(item);
    });

    set.forEach(item => {
        unionSet.add(item);
    });

    return unionSet;
};

// Set.prototype.toString() = function toString() {
//     let string = "";

//     this.forEach(item => {
//         string += item.toString();
//     });
// }

module.exports = Set;