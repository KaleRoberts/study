/* Quick Sort

Pick a random number as your pivot point and then swap values in the array such that the elements less than the pivot appear before elements greater than the pivot. This achieves a partial sort, Then we recursively sort the left and right sides using the same approach.
Big O of a Quick Sort is O (N log N) in the expected use/ expected case scenario

Best Case is O(N)
Worst Case is O(N2)
 */

/* Multi-part algorithms
An algorithm with two steps, or multi-step algorithms

Add Runtimes: O(A+B)				Multiply Runtimes: O(A * B)
for(let a: arrA) {					for(let a: arrA) {
	print(a);					    for(let b: arrB) {
}								print(a + “,” + b);
							     }
for(let b: arrB) {					}
	print(b);
}

Here we do A chunks of work then B			Here we do B chunks of work for each 	
chunks of work. Total work is O(A +B)		element in A. Total work is O(A * B)
 */

/* Binary Search and Log N Runtimes
    Look for an example number, x in an N-element sorted array. We first compare x to the midpoint of the array.
    If x === middle, then we are done, O(1) best case.
    If x < middle then we need  to search the left side of the array.
    If x > middle then we need to search the right side of the array.
    We start off with an N-element array to search (an array of arbitrary size).
    After a single step we’re down to N/2 elements.
    Another step and we’re down to N/4  We stop when we either find the value or we’re down to just one element.
    Total runtime of this search is a matter of how many steps (dividing N by 2 each time) we can take until N becomes 1.

    When there is a problem where the number of elements in the problem space gets halved each time, that is typically an O(log N)
    runtime.

Recursive Runtimes

const f = n => {
	if( n <= 1) {
		return 1;
	}
	return f(n -1) + f(n + 1);
}

Do not confuse this with O(N^2)

O(2^N)
 */

/* More Big O Thought Problems
Consider an algorithm that takes in an array of strings, then sorts each string, and then sorts the full array. What is the runtime of such an algorithm?

[‘pikachu’, ‘squirtle’, ‘charmander’, ‘ivysaur’, ‘mewtwo’, ‘lapras’]

Let s be the length of the longest string
Let a be the length of the array containing the strings

So sorting each string would be O(s log s)
This has to be done for every string and since there are a strings we have O(a*s log s)
Then we have to sort the array of sorted strings which is O(a*s  log a)

If we combine all of that and reduce we come out to O(a*s(log a + log s) )


** If we have a balanced (?sorted) binary search tree and there are N nodes, then the depth of that tree is roughly log N



Big O and Prime Numbers Algorithm
This method checks if a number is prime by checking for divisibility on numbers less than it. It only needs to go up to the square root of n because if n is divisible by a number greater than its square root then it is divisible by something smaller than it.

const isPrime = (n) => {
    for(let x = 2; x * x <= n; x++) {
        if (n % x == 0) {
            return false;
        }
    }
    return true;
}

A better way to write the above function and realize the time complexity is to see that the for loop is going to run until x * x = n or in other words x2 = n or even better x = sqrt(n)
Then we re write the above function as

const isPrimeBetter = (n: number): boolean => {
    for(let x = 2; x <= Math.sqrt(n); x++) {
        if(n % x == 0) {
            return false;
        }   
    }
    return true;
}
 */


const foo = (arr) => {
    let sum = 0;
    let product = 1;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    for(let i = 0; i < arr.length; i++) {
        product += arr[i];
    }
    console.log(sum + ", " + product);
}

// Runtime is O(N)

const printPairs = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        for(let k = 0; k < arr.length; k++) {
            console.log(arr[i] + ", " + arr[k]);
        }
    }
}

// Runtime is O(N^2)

const printUnorderedPairs = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        for(let k = i + 1; k < arr.length; k++) {
            console.log(arr[i] + ", " + arr[k]);
        }
    }
}

// Runtime is also O(N^2) Reference is Sum of Integers 1+2+3+4 + ... N Ends up O(N^2)

/* 
    Array reversal with a temporary array
*/

const reverse = (array) => {
    for(let i = 0; i < array.length / 2; i++) {
        let other = array.length - i - 1;   // Length will be greater than array indicies by 1. This gets the index of the last element in the array
        let temp = array[i];
        array[i] = array[other];
        array[other] = temp;
    }
    return array;
}

let array = ['s', 't', 't', 'u', 'b'];

reverse(array); // ['b', 'u', 't', 't', 's']



/* 
    isPrime and Big O
*/

const isPrime = (n) => {
    for(let x = 2; x * x <= n; x++) {
        if (n % x == 0) {
            return false;
        }
    }
    return true;
}

const isPrimeBetter = (n: number): boolean => {
    for(let x = 2; x <= Math.sqrt(n); x++) {
        if(n % x == 0) {
            return false;
        }   
    }
    return true;
}

// Runtime of this is just how long our inner for loop will run which is O(sqrt(n))


/* Factorials and Big O */

/* Recursive method example */  

const f = (n) => {
    if(n <= 1) {
        return 1;
    }
    return f(n - 1) + f(n -1);
}

// This will essentially make a tree of calls

/* 
                                    f(4)
                           /                  \
                        f(3)                  f(3)
                        /  \                /     \
                      f(2) f(2)            f(2)   f(2)
                     /  \   /  \           / \    /  \ 
                  f(1) f(1) f(1) f(1)    f(1)f(1) f(1)f(1)

*/ 


/* 
    Given a smaller string s and a larger string b, design an algorithm to find all permutations
    of the shorter string within the longer one.
    Print the location of each permutation.

*/


const sum = 13;
const numArray = ['10', '20', '5', '3', '4', '9', '8', '12', '1', '2'];

const sumPairs = (arr, sum) => {
    arr = arr.sort((a, b) => a - b);
    let temp = [];

    for(let i = 0; i < arr.length / 2; i++) {
      for(let k = 1; k < arr.length; k++) {
        if(parseInt(arr[i], 10) + parseInt(arr[k], 10) == sum) {
          temp.push([arr[i], arr[k]]);
        }
      }
    }
    return temp;
}

console.log(numArray.sort((a, b) => a - b));
console.log(numArray.sort((a, b) => a - b).length);
console.log(Math.ceil(numArray.length / 2));

console.log(sumPairs(numArray, sum)); // [ [ '1', '12' ], [ '3', '10' ], [ '4', '9' ], [ '5', '8' ] ]