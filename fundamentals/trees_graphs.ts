// Trees and Graphs

/* 
    A nice way to understand a tree is with a recursive explanation. A tree is a data structure composed of nodes.
    - Each tree has a root node. (Actually, this isn't strictly necessary in graph theory, but it's usually how we use
        trees in programming, and especially programming interviews.)
    - The root node has zero or more child nodes.
    - Each child node has zero or more child nodes and so on.

    The tree cannot contain cyles. The nodes may or may not be in a particular order, they could have any data type
    as values, and they may or may not have links back to their parent nodes.
*/

// Simple class definition for a particular node
// TS contains an interface for a Node, Node also extends EventTarget in the TS library
// class Node {
//     name: any;
//     children: any;
//     constructor(name, children) {
//         this.name = name;
//         this.children = children;
//     }
// }

/* 
    We could also have a tree class to wrap this Node. For the purposes of interview questions,
    we typically do not use a Tree class. 

    class Tree {
        public Node root;
    }

    Tree and graph questions are rife with ambiguous details and incorrect assumptions.
    Be sure to watch out for the following issues and seek clarification when necessary.


*/



/* 
    Trees vs. Binary Trees

    A binary search tree is one that satisfies the following condition
    all left descendents <= n < all right descendents
    This must be true for each node n


    Binary Search Tree                                  Not a 

                8
            /       \
           4        10
          / \         \
         2   6         20
*/

/* 
    Balanced vs. Unbalanced

    Two common types of balanced trees are red-black trees, and AVL trees. These are
    discussed in more detail in the Advanced Topics section.

    - Complete Binary Tree
    A complete binary tree is a binary tree in which every level of the tree is fully filled,
    except for perhaps the last level. To the extent that if a last level is going to be filled you'll know because it is filled left to right.

    - Full Binary Tree
    A full binary tree is a binary tree in which every node has either zero or two children. That is, no nodes
    have only one child.

    - Perfect Binary Tree
    All interior nodes have two children and all leaf nodes are at the same level. A perfect tree must have
    exactly Math.pow(k, 2) - 1 or (2^k - 1) nodes. Where k is the number of levels. 


    ***Depth First Search Concept
     In Depth First Search we visit a node A and then iterate through each of A's neighbors. When visiting
     a node B that is a neighbor of A, we visit all of B's neighbors before going on to A's other neighbors.
    A exhaustively searches B's branches before any of its other neighbors.

    Pseeudocode for DFS
    const search = (root: Node) => {
        if(root === null) return;
        visit(root);
        root.visited = true;
        root.adjacent.forEach(n => {
            if(n.visited === false) {
                search(n);
            } 
        })
    }


    ***Breadth First Search
    BFS is not recursive. It usues a QUEUE

    Node A visits each of A's neighbors BEFORE visiting any of their neighbors. You can think of this as
    searching level by level out from A. An iterative solution involving a QUEUE usually works best. The
    below pseudocode demonstrates this approach.


    Array.unshift() // Add element to beginning of array. Not sure what queue operation is equivalent.
    Array.push() // Adds element to the end of the array, returns new length of Array. Very similar to enqueue() 
    
    Arra.shift() // Removes the first element in the array and returns it. Similar to dequeue()
    Array.pop() // Removes the last element in the array and returns it. Not sure of equivalent queue operation.

    const search = (root: Node) => {
        const queue = new Array(); // JavaScript doesn't really have a notion of a queue, but I think we can use
    }                              // Arrays as a queue for the most part?
        root.marked = true;
        queue.push(root); // Add root to the end of the array.
        
        while(queue.length !== 0) {
            let r: Node = array.shift(); // Remove from the front of the "queue".
            visit(r);
            r.adjacent.forEach(n => {
                if(n.marked === false) {
                    n.marked = true;
                    queue.push(n);  // Add our marked node to the end of our "queue"
                }
            })
        }

    If I am asked to implement BFS, the key thing to remember is the use of the queue. The rest of the 
    algorithm flows from this fact.

    Adjacency List Graph HashMap Implementation

    const graph = {
        a: ['a', 'b'], 
        b: ['c'],
        c: ['d'],
        d: ['b', 'c']
    }

*/

class GraphNode {
    value: any;
    adjacents: any[];
    constructor(value) {
        this.value = value;
        this.adjacents = [];
    }

    addAdjacent(node) {
        this.adjacents.push(node);
    }

    removeAdjacent(node) {
        const index = this.adjacents.indexOf(node);
        if(index > -1) {
            this.adjacents.splice(index, 1);
            return node;
        }
    }

    getAdjacents() {
        return this.adjacents;
    }

    isAdjacent(node) {
        return this.adjacents.indexOf(node) > -1;
    }
}


class Graph {
    static UNDIRECTED: symbol;
    static DIRECTED: symbol;
    nodes: Map<any, any>;
    edgeDirection: any;
    constructor(edgeDirection = Graph.DIRECTED) {
        this.nodes = new Map();
        this.edgeDirection = edgeDirection;
    }

    addEdge(source, destination) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);

        sourceNode.addAdjacent(destinationNode);

        if(this.edgeDirection === Graph.UNDIRECTED) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    addVertex(value) {
        if(this.nodes.has(value)) {
            return this.nodes.get(value);
        } else {
            const vertex = new GraphNode(value);
            this.nodes.set(value, vertex);
            return vertex;
        }
    }

    removeVertex(value) {
        const current = this.nodes.get(value);
        if(current) {
            for(let node of this.nodes.values()) {
                node.removeAdjacent(current);
            }
        }
        return this.nodes.delete(value);
    }

    removeEdge(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);

        if(sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);

            if(this.edgeDirection === Graph.UNDIRECTED) {
                destinationNode.removeAdjacent(sourceNode);
            }
        }

        return [sourceNode, destinationNode];
    }
}
Graph.UNDIRECTED = Symbol('directed graph');
Graph.DIRECTED = Symbol('undirected graph');

/* 4.1 Route Between Nodes
    Given a directed graph and two nodes (S and E), design an algorithm to find out whether
    there is a route from S to E.

    
*/

enum State {
    Unvisited,
    Visited,
    Visiting
}

const search = (g: Graph, start: GraphNode, end: GraphNode) => {
    if(start == end) return true;
    
    const q = new LinkedList();


}