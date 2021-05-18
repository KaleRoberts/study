// Linked Lists


/* Example of what a linked list looks like in JavaScript
const exampleList = {
    head: {
        value: 6,
        next: {
            value: 10,
            next: {
                value: 12,
                next: {
                    value: 3,
                    next: null
                }
            }
        }
    }
}
*/

class ListNode {
    data: any;
    next: any;
    constructor(data) {
        this.data = data;
        this.next = null
    }
}

let bob = new ListNode(5);

class LinkedList {
    head: any;
    size: () => void;
    clear: () => void;
    getLast: () => any;
    getFirst: () => any;
    constructor(head = null) {
        this.head = head;
    }
}

let node1 = new ListNode(2);
let node2 = new ListNode(5);
node1.next = node2;

let list = new LinkedList(node1);

console.log(list.head.next.data);

LinkedList.prototype.size = function() {
    let count = 0;
    let node = this.head;
    while(node) {
        count++;
        node = node.next;
    }
    return count;
}

LinkedList.prototype.clear = function() {
    this.head = null;
}

LinkedList.prototype.getLast = function() {
    let lastNode = this.head;
    if(lastNode) {
        while(lastNode.next) {
            lastNode = lastNode.next;
        }
    }
    return lastNode;
}

LinkedList.prototype.getFirst = function() {
    return this.head;
}
