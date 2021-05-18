// Recursion and Dynamic Programming

/* Fibonacci Numbers! Yay! */

// With a loop de loop
const fibonacciLoop = (num) => {
    let a = 1, b = 0, temp: number;
  
    while (num >= 0){
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }
  
    return b;
  }


// Solving Fibonacci recursively
const fibonacciRec = (n) => {
    if(n <= 1) return 1;

    return fibonacciRec(n - 1) + fibonacciRec(n - 1);
}



// With memoization
const fibonacciMemo = (num, memo) => {
    memo ? memo : {};

    if (memo[num]) return memo[num];
    if (num <= 1) return 1;

    return memo[num] = fibonacciMemo(num - 1, memo) + fibonacciMemo(num - 'T', 'T'emo);
}

/* 8.1 Triple Step
*/

/* 8.2 Robot in a Grid
  Imagine a robot sitting on the upper left corner of a grid with r rows and c columns
  The robot can only move in two directions, right and down, but certain cells are "off limits" such that
  the robot cannot step on them. Design an algorithm to find a path for the robot from the top left to the 
  bottom right.

  So in order to get to spot (r, c) we need to move to one it's adjacent tiles either (r - 1, c) or (r, c - 1)
  And in order to get to one of those spots we need to be adjacent to that spot (r - 2, c) or (r, c - 2) or ()
*/  

// const c = [
//   ['T', 'T', 'T',  'T', 'T'],
//   ['T', 6, 7,  8, 'T'],
//   [9, 5, 'T', 12, 'T'],
//   ['T', 14,15,16, 'T']
// ];


// const getPath = (maze) => {

// }


/* 8.3 Magic Index
  A magic index in an array A[0....n-1] is defined to be an index such that A[i] = i;
  Given a sorted array of distinct integers, write a method to find a magic index, if one exists
  in array A.  
*/

/* could check the middle as in binary search
  if magic[magic.length / 2] === magic.length / 2 // return magic[magic.length / 2];
  if magic[magic.length / 2] <= 
  Do a binary search recursively
  The the value at the midpoint of the array does not equal the index, then 
  If the value at the midpoint index is less than that index then search to the right recursively
  If the value at the midpoint index is more than that index then search to the left recursively
*/

const magic = [0, 1, 2, 3, 4, 9, 11, 15, 20];
const otherMagic = [-10, -5, 2, 4, 5, 7, 9, 11, 12, 13, 14, 15, 16, 17];

const findMagicSuper = (arr) => {
  return findMagic(arr, 0, arr.length - 1);
}

const findMagic = (arr, start, end) => {
  if(end < start) {
    return -1;
  }

  let mid = Math.floor((start + end) / 2);

  if(arr[mid] === mid){
    return arr[mid];
  } else if(arr[mid] < mid) { // Search the left half of the array.
    // let newMid = Math.floor((mid + (arr.length - 1)) / 2); // Define the newMidpoint
    return findMagic(arr, start, mid - 1); // We define a new endpoint which is our midpoint shifted left one index
  } else { // Search the right half of the array.
    // let newMid = Math.floor((mid + (arr.length - 1)) / 2); // Define the newMidpoint
    return findMagic(arr, start, mid + 1);
  }

}

console.log(findMagicSuper(magic));
console.log(findMagicSuper(otherMagic));


const indistinct = [-10, -5, 2, 2, 2, 3, 4, 5, 9, 12, 13];

// For indistinct values
const magicFastSuper = (arr) => {
  return magicFast(arr, 0, arr.length - 1);
}

const magicFast = (arr, start, end) => {
  if(end < start) {
    return -1;
  }

  let midIndex = Math.floor(start + end) / 2;
  let midValue = arr[midIndex];
  if(midValue === arr[midIndex]) {
    return arr[midIndex];
  }

  /* Search left side */
  let leftIndex = Math.min(midIndex - 1, midValue);
  let left = magicFast(array, start, leftIndex);
  if(left >= 0) {
    return left;
  }

  /* Searh right side */
  let rightIndex = Math.max(midIndex + 1, midValue);
  let right = magicFast(array, rightIndex, end);

  return right;
}

magicFastSuper(indistinct);

/* 8.4 Power Set
  Write a method to return all subsets of a set.

  Hope you never get asked this question because god damnit I'm not doing this in JavaScript come on.
*/

/* 8.5 Recursive Multiply
  Write a recursive function to multiply two positive integers without using the * operator. You can
  use addition, subtraction, and bit shifting, but you should minimize the number of those operations.
*/

const multiply = (n, m) => {
  if(m === 0 || n === 0) return 0;
  if(n === 1) return m;
  if(m === 1) return n;
  let sum = 0;
  for(let i = 0; i < m; i++) {
    sum += n
  }
  return sum;
}

console.log(multiply(2,500));

const minProduct = (a, b) => {
  let bigger = a < b ? b : a;
  let smaller = a < b ? a : b;
  return minProductHelper(smaller, bigger);
}

const minProductHelper = (smaller, bigger) => {
  if(smaller === 0) return 0;
  else if(smaller === 1) return bigger;

  let s = smaller << 1; // Divide by two
  let halfProd = minProductHelper(s, bigger);

  if(smaller % 2 === 0) {
    return halfProd + halfProd;
  } else {
    return halfProd + halfProd + bigger;
  }
}

console.log(minProduct(3, 4));

/* 8.6 Towers of Hanoi
  Disks moving from Tower 1 to Tower 2 to Tower 3 given N number of disks etc. etc. etc.
*/

// Pseudocode implementation
const moveDisks = (n, origin, destination, buffer) => {
  /* Establish base case */
  if(n <= 0) {
    return;
  }

  /* Move top n - 1 disks, from origin to buffer, using destination as a buffer. */
  moveDisks(n -1, origin, buffer, destination);

  /* Move top from origin to destination */
  moveTop(origin, destination);

  /* Move top n -1 disks from bufer to destination, using origin as a buffer */
  moveDisks(n - 1, buffer, destination, origin);
}


/* 8.7 Permutations without Duplicates
  Write a method to compute all permutations of a string of unique characters.

  Base case and build

  Assume we have a string S represented by the characters A1, A2, A3, ........An (read A sub 1, A sub 2 to A sub N as it's a set)


  Base case: Permutations of first character substring

  P(A1) = A1
  P(A1, A2) = A1A2 and A2A1
  P(A1, A2, A3) = A1A2A3, A1A3A2, A2A1A3, A2A3A1, A3A1A2, A3A2A1, 
  
  Now if we get to P(A1,A2,A3,A4) what can we extrapolate here?
  P(A1,A2,A3,A4) is just each ordering of P(A1, A2, A3) with A4 in them.

  That is
  A1A2A3 -> A1A2A3A4, A1A4A2A3, A1A2A4A3, A1A2A3A4
  "" -> ""
  "" -> ""
  "" -> ""
  "" -> ""
  "" -> ""

  We can implement this algorithm recursively
*/

const getPerms = (str) => {
  if(str === null) return null;

  let permutations = new Array();

  if(str.length === 0) {
    permutations.push("");
    return permutations;
  }

  let first = str.charAt(0); // get our first character in the string
  let remainder = str.substring(1); // remove the first character, get the rest of the string
  let words = getPerms(remainder);
  console.log(words);
  words.forEach(word => {
    for(let i = 0; i <= words.length; i++){
      let s = insertCharAt(word, first, i);
      permutations.push(s);
    }
  })

  return permutations;
}

/* Inserts character c at index i in word */
const insertCharAt = (word, c, i) => {
  let start = word.substring(0, i);
  let end = word.substring(i);
  return start + c + end;
}

// console.log(getPerms('cat'));


/* 8.12 N-Queens The best problem ever

*/


let GRID_SIZE = 8;

const placeQueens = (row, columns, results) => {
  results.push(columns.clone);
}






















