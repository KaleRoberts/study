// Arrays and Strings


/* 1.1 Is Unique
    Implement an algorithm to determine if a string has all unique characters. 
    What if you cannot use additional data structures?

    Solution: First attempt was isUnique. Book's is isUniqueOther
    Should first ask the interviewer if the string is an ASCII string or a Unicode string.
*/

const test = "abcdefgaaccddeeff";
const test2 = "abcdefghijklmnopqrstuvwxyz";
const test3 = "this may beunq srg"
console.log(test.split(''));

const isUnique = (n) => {
    const testArray = n.split('');
    for(let i = 1; i < testArray.length; i++) {
      if(testArray[0] === testArray[i]) {
        return false;
      }
    }
    return true;
}

console.log(isUnique(test3));

const testString = 'abcdefghijkklmnopqrstuvwxyz';
const testString2 = 'abcdefghijklmnopqrstuvwxyz';


// Thinking about this with boolean checks instead
const isUniqueOther = str => {
    if(str.length > 128) {
        return false;
    }

    const charSet = [];

    for(let i = 0; i < str.length; i++) {
        let val = str.charAt(i);
        if(charSet[val]) {
            return false;
        }
        charSet[val] = true;
    }
    console.log(charSet);
    // To be clear this array is empty. It's basically just a look up table
    // with all the string values in it and a corresponding value of true if it was unique.
    return true;
}

console.log(isUniqueOther(testString));
console.log(isUniqueOther(testString2));

/* 1.2 Check Permutation
    Given two strings, write a method to decide if one is a
    permutation of the other

    Questions to ask first: Is the comparison case sensitive?
    Is Tac a permutation of cat? Also, is whitespace significant? In JavaScript both of those are considerations, so probably yes.

    Strings of different lengths cannot be permutations of one another. This isn't the question of another string contains permutations of the one string,
    The question is are the strings permutations of one another?

    Solution: Sort the strings
    Which in js needs to be done using an array.
    You can split up the string, sort it and then join it back together then compare the two strings
    I think the operation is O(N^2) though since you compare each character in each string value to one another
*/

// So consider the length of the template string we are using (sting1 in this case)

const string1 = 'tac';
const string2 = 'cat';

const string1Chars = string1.split('');
const charSet = [];

// This does make a lookup table of each character's Unicode value
string1Chars.forEach((char, index) => {
    charSet[char] = string1.charCodeAt(index);
})

// You can just call sort on JS arrays you dingus
console.log(string1Chars.sort());

const isPermutation = (s1, s2) => {
    console.log(s1.split('').sort().join(''));
    console.log(s2.split('').sort().join(''));

    if(s1.length != s2.length) {
        return false;
    }
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}

const string1 = 'tac';
const string2 = 'cat';

// One line with ES6 arrow functions
const isPermutation = (s1, s2) => s1.length !== s2.length ? false : s1.split('').sort().join('') === s2.split('').sort().join('');

console.log(isPermutation(string1, string2));



const permTest1 = "balls";
const permTest2 = "abtal";

// Very clever solution. Count the frequency of the letters in the first string
// then decrement the frequency of the letters in the second string.
// If we ever get a negative value 
// This is faster because js compares char by char 
const permutation = (s1, s2) => {
    if(s1.length !== s2.length) return false; // Permutations must be the same length

    const letters = [];

    // Could do this to set all the character keys to 0
    // Array.prototype.setAll = function(v, test) {
    //     for(let i = 0; i < test.length; i++) {
    //       this[test.charAt(i)] = v;
    //     }
    // }
    
    // letters.setAll(0, s1);
    // letters.setAll(0, s2);

    // In js at least I think you'd have to seed this "hash-like-table" with 
    // 0 values. All possible keys need to be 0
    for(let i = 0; i < s1.length; i++) {
        letters[s1.charAt(i)] = 0;
        letters[s2.charAt(i)] = 0;
    }

    // We make a "hash-like-table" in js with a frequency of each letter and increment each time it comes up
    for(let i = 0; i < s1.length; i++) {
        letters[s1.charAt(i)] += 1;
    }
    console.log(letters);

    // Then we go through the second array and decrement each time we hit the key value, if we 
    // end up 
    for(let i = 0; i < s2.length; i++) {
        letters[s2.charAt(i)] -= 1;
        if(letters[s2.charAt(i)] < 0) {
            return false;
        }
    }

    console.log(letters);
    return true; // letters has no negative values, and therefore has no positive values either
}

console.log(permutation(permTest1, permTest2));

const wordPermutations = (s1, s2) => {
  if(s1.length !== s2.length) return false;

  const letters = new Map();
  for(let i = 0; i < s1.length; i++) {
      letters.set(s1.charAt(i), 0)
  }

  for(let i = 0; i < s1.length; i++) {
      letters.set(s1.charAt(i), letters.get(s1.charAt(i)) + 1)
  }

  console.log(letters);

  for(let i = 0; i < s2.length; i++) {
      letters.set(s2.charAt(i), letters.get(s2.charAt(i)) - 1);
      if(letters.get(s2.charAt(i)) < 0) {
          return false;
      }
  }

  console.log(letters);
  return true;
}

wordPermutations('alabama', 'balaamb');


/* 1.3 URLify
    Write a method to replace all spaces in a string with '%20'. You may assume that the string has
    sufficient space at the end to hold the additional characters and that you are given the "true"
    length of the string

    EXAMPLE
    Input: "Mr John Smith      ", 13
    Output:"Mr%20John%20Smith"
*/

let urlString = "Mr John Smith      ";
const strlength = 13;

const URLify = (s1, length) => {
    const spaces = [];
    s1.split('');
    for(let i = 0; i < length; i++) {
        if(s1[i] === " ") {
            s1.splice(i, "%20");
        }
    }
    
    return s1;
}
const urlArray = urlString.split('');

let counter = 0;
urlArray.map((char, index) => {
    if(counter >= strlength) {
      return;
    }
    if(char === " ") {
        urlArray.splice(index, 1, "%20");
    }
    counter++;
});

console.log(urlArray.join(''));


/* 1.4 Palindrome Permutation
    Given a string, write a function to check if it is a permutation of a palindrome.
    A palindrome is a word or phrase that is the same forwards and backwards. A permutation
    is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
    Casing and non-letter characters can be ignored.

    EXAMPLE:
    Input: "Tact Coa"
    Output: true (permutations: 'taco cat", "atco cta", "")

    Input: "rac carbdf"
    Output: true (perms: "rracbcarr")

    First thing we should ask about the string is if we can even make palindromes with it
    We need even numbers of all characters and one character can have an odd frequency?
    In this case we need at least 2 of the same letter and no more than one character with a frequency of 1
*/

const isPalindromePerm = (s1) => {

    const letters = [];
    let charArray = s1.split('');

    // Get rid of spaces, could write a regex to remove all non-alpha characters from string
    charArray.map((elem, idx) => {
      if(elem === " ") {
        charArray.splice(idx, 1);
      }
    });

    charArray = charArray.join('');

    // Seed our "hash-like-table" with 0 values for characters in the string
    for(let i = 0; i < charArray.length; i++) {
        letters[charArray.charAt(i)] = 0;
    }

    // Count the frequency of each letter
    for(let i = 0; i < charArray.length; i++) {
        letters[charArray.charAt(i)]++;
    }

    // You can only have character with an odd frequency
    let odd = 0;
    for(let i = 0; i < charArray.length; i++) {
      if(letters[charArray.charAt(i)] % 2 !==0 ) {
        odd++;
      }
    }
    if(odd > 1) {
      return false;
    }
    console.log(letters);

}

const palinTest = "tact coatt";

isPalindromePerm(palinTest);


/* 1.5 One Away
    There are three types of edits that can be performed on strings:
    insert a character, remove a character, or replace a character.
    Given two strings, write a function to check if they are one
    edit (or zero edits) away.

    EXAMPLE:
        pale, ple -> true
        pales, pale -> true
        pale, bale -> true
        pale, bake -> false
        palss, pals -> true
        ssss, sss -> true
*/

const oneAway = (s1, s2) => {
    // Three different things to test
    /* 
        
        ['p', 'a', 'l', 'e', 'b', 'k']
        The length of this array is greater than s1.length + 1
        Or the length of this array is less than s1.length - 1
        If they're the same length then you're good
    */
    const merge = s1.split('');
    const second = s2.split('');
    for(let i = 0; i < s2.length; i++) {
        if(merge[i] !== second[i]) {
            merge.push(second[i]);
        }        
    }

    if(merge.length > s1.length + 1 || merge.length < s1.length -1) {
        console.log(merge);
        return false;
    }

    console.log(merge);
    return true;


}

oneAway('ssss', 'sss');
oneAway('pale', 'pal');
oneAway('bale', 'pale');
oneAway('pale', 'bake');


// Book solution
const oneEditAway = (first, second) => {
    if(first.length === second.length) {
        return oneEditReplace(first, second);
    } else if(first.length + 1 === second.length) {
        return oneEditInsert(first, second);
    } else if(first.length - 1 === second.length) {
        return oneEditInsert(second, first);
    }
}

const oneEditReplace = (s1, s2) => {
    let foundDifference = false;

    for(let i = 0; i < s1.length; i++) {
        if(s1.charAt(i) !== s2.charAt(i)) {
            if(foundDifference) {
                return false;
            }
            foundDifference = true;
        }
    }
    return true;
}

const oneEditInsert = (s1, s2) => {
    let idx1 = 0;
    let idx2 = 0;

    while(idx2 < s2.length && idx1 < s1.length) {
        if(s1.charAt(idx1) !== s2.charAt(idx2)) {
            if(idx1 !== idx2) {
                return false;
            }
            idx2++;
        } else {
            idx1++;
            idx2++;
        }
    }
    return true;
}


const perms = (str, prefix) => {
    if(str.length === 0) {
        console.log(prefix);
    } else {
        for(let i = 0; i < str.length; i++) {
            let rem = str.substring(0, i) + str.substring(i + 1);
            perms(rem, prefix + str.charAt(i));
        }
    }
}

console.log(perms("abc", ""));


/* 1.6 String Compression
    Implement a method to perform basic string compression using the counts
    of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3
    If the compressed string would not become smaller than the original string
    your method should return the original string. You an assume the string has
    only uppercase and lowercase letters (a - z).

    If we assume the string can only have upper and lower then the maximum number
    of unique values we can have is 52 (i.e English Alpha 26 * 2);

    Say we have a string of six characters. In order for every character to be unique
    the resultant string would have to be str.length * 2
    'abcdef' which would be 'a1b1c1d1e1f1'

    'aabbccddeeff' which would be 'a2b2c2d2e2f2' !== str.length * 2
*/


// Kinda had to do this with multiple data structures
const compress = (str) => {
    const letters = {};
    const newString = [];

    for(let i = 0; i < str.length; i++) {
        letters[str.charAt(i)] = 0;
    }

    // Create hash like table of character frequencies
    for(let i = 0; i < str.length; i++) {
        letters[str.charAt(i)]++;
    }
    for(let char in letters) {
      newString.push(`${char}${letters[char]}`)
    }

    if(newString.join('').length === str.length * 2) {
        return str;
    }

    return newString.join('');
}

// compress('abcd');

const tests = ['aabbcddeefg', 'aabcdefghijkl', 'abc', 'def'];
tests.forEach(test => console.log(compress(test)));

// Book Solution - Not sure how to implement StringBuilder thing in js. 

const bookCompress = (str) => {
    /* Check final length and return original input string  if it would be longer. */
    const finalLength = countCompression(str);
    if(finalLength >= str.length) return str;


}

const countCompression = (str) => {
    let compressedLength = 0;
    let countConsecutive = 0;

    for(let i = 0; i < str.length; i++){
        countConsecutive++;

        /* If the next character is different than the current, increase the length */
        if(i + 1 >= str.length || str.charAt(i) != str.charAt(i + 1)) {
            compressedLength += 1 + String.valueOf(countConsecutive).length
        }
    }
}



/* 1.7 Rotate Matrix
    Given an image represented by an N x N matrix, where each pixel in the image is represented by an integer,
    write a method to rotate the image by 90 degrees. Can this be done place?

    ** JAVASCIRPT MATRICIES LOOK LIKE THIS:
    const a = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,16]
    ];

    We work this from the outer layer to the inner layer


    Consider the pseudo code

    for i = 0 to n
    temp = top[i];
    top[i] = left[i];
    left[i] = bottom[i];
    bottom[i] = right[i];
    right[i] = temp

*/

const a = [
    [1, 2, 3,  4],
    [5, 6, 7,  8],
    [9,10, 11,12],
    [13,14,15,16]
];

const rotate = (matrix) => {
    if(matrix.length === 0) return false;

    // If any part of the matrix is smaller (n -1 or n - 2 etc.) then
    // we won't be able to rotate with this algorithm
    for(let i = 0; i < matrix.length; i++) {
      if (matrix.length !== matrix[i].length) return false;
    }

    let n = matrix.length;

    for(let layer = 0; layer < n / 2; layer++) {
        let first = layer; // 0
        let last = n - 1 - layer; // 3
        for(let i = first; i < last; i++) {
            const offset = i - first; // 0 on first run
            let top = matrix[first][i]; // Save our top, store it because we are going to reassign

            // First run matrix[0][0] = matrix[3][0]
            // Second run matrix[0][1] = matrix[2][0]
            // Thirs run matrix[0][2] = matrix[1][0]
            // Move left to the top
            matrix[first][i] = matrix[last - offset][first];

            // First run matrix[3][0] = matrix[3][3]
            // Second run matrix[2][0] = matrix[3][2]
            // Move bottom to the left
            matrix[last - offset][first] = matrix[last][last - offset];

            // First run matrix[3][3] = matrix[0][3]
            // Second run matrix[3][2] = matrix[1][3]
            // Move right to the bottom
            matrix[last][last - offset] = matrix[i][last];

            // First run matrix[0][3] = matrix[0][0]
            // Secons run matrix[1][3] = matrix[0][1]
            // Move top to right
            matrix[i][last] = top;
        }
    }
    return matrix;
}

rotate(a);


/* 1.8 Zero Matrix
    Write an algorithm such that if an element in an M x N matrtix is 0, its entire row and column are set to 0.

    Similar to the above thinking

const a = [
    [1, 2, 3,  0, 1],
    [5, 6, 7,  8, 1],
    [9, 0, 11,12, 1],
    [0, 14,15,16, 1]
];

Is this kinda like minesweeper maybe?
*/

// If we are adding to the Array prototype we should add to its interface

interface Array<T> {
    setAll: (v: any) => void;
}

const setZeroes = (matrix) => {
    let row = new Array(matrix.length);
    let column = new Array(matrix[0].length);

    Array.prototype.setAll = function(v) {
      let n = this.length;
      for(let i = 0; i < n; i++) {
        this[i] = v;
      }
    }

    row.setAll(false);
    column.setAll(false);

    // "Store" the row and column indicies that contains a 0
    // We set the index to true so that we can reference the index position later as
    // a number of the row/column in which the zero was found
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][j] === 0) {
                row[i] = true;
                column[j] = true;
            }
        }
    }

    // Nullify entire rows corresponding to true
    for(let i = 0; i < row.length; i++) {
      if(row[i]) nullifyRow(matrix, i);
    }

    // Nullify entire columns corresponding to true
    for(let j = 0; j < column.length; j++) {
      if(column[j]) nullifyColumn(matrix, j);
    }

    return matrix;

}

const nullifyRow = (matrix, rowNum) => {
  for(let i = 0; i < matrix[0].length; i++) {
    matrix[rowNum][i] = 0;
  }
}

const nullifyColumn = (matrix, colNum) => {
  for(let j = 0; j < matrix.length; j++) {
    matrix[j][colNum] = 0;
  }
}

const c = [
    [1, 2, 3,  0, 1],
    [5, 6, 7,  8, 1],
    [9, 5, 1, 12, 1],
    [0, 14,15,16, 1]
];

setZeroes(c);

/* 1.9 String Rotation
    Assume you have a method isSubstring which checks if one word is a substring
    of another. Given two strings, s1 and s2, write code to check if s2 is a
    rotation of s1 using only one call to isSubstring
    (e.g. "waterbottle" is a rotation of "erbottlewat");


    We'll get back to this one later
 */
/*

Imagine we have an image. We'll represent this image as a simple 2D array where every pixel is a 1 or a 0. The image you get is known to have a single rectangle of 0s on a background of 1s.

Write a function that takes in the image and returns one of the following representations of the rectangle of 0's: top-left coordinate and bottom-right coordinate OR top-left coordinate, width, and height.

image1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

Sample output variations (only one is necessary):

findRectangle(image1) =>
  x: 3, y: 2, width: 3, height: 2
  2,3 3,5 -- row,column of the top-left and bottom-right corners

Other test cases:

image2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
]

findRectangle(image2) =>
  x: 6, y: 4, width: 1, height: 1
  4,6 4,6

image3 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 0],
]

findRectangle(image3) =>
  x: 5, y: 3, width: 2, height: 2
  3,5 4,6
  
image4 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

findRectangle(image4) =>
  x: 0, y: 0, width: 1, height: 1
  0,0 0,0

image5 = [
  [0],
]

findRectangle(image5) =>
  x: 0, y: 0, width: 1, height: 1
  0,0 0,0

n: number of rows in the input image
m: number of columns in the input image

*/


const image1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const image2 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
];

const image3 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 0],
];

const image4 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const image5 = [
  [0],
];

// Rectangle is m x n 0's 

const findRectangle = (img) => {
  const row = img.length - 1; // 5
  const col = img[0].length - 1; // 6
  
  console.log(row, col); // 4, 6
  
  const topLeft = [];
  const coords = [];
  const zeroes = [];
  
  zeroes['0'] = 0;
  
  for(let i = 0; i <= row; i++) {
    for(let j = 0; j <= col; j++) { // Get top left
      if(img[i][j] === 0) {
        zeroes['0']++;
      }
    }
  }
  
  
  for(let i = 0; i <= row; i++) {
    for(let j = 0; j <= col; j++) { // Get top left
      if(img[i][j] === 0) {
        topLeft.push(i, j);
        break;
      }
    }
  }
  
  const topLeftRow = topLeft[0];
  const topLeftCol = topLeft[1];
  const topRightCol = [];
   
  for(let k = img[topLeftRow]; k < col; k++) {
    if(img[topLeftRow][k] === 1) { // Check columns to the right of the top left
      // if it is a zero continue checking, if it is a 1 then stop checking and store the column
      topRightCol.push(k - 1);
    } else {
      topRightCol.push(k);
    }
  
  }
  
  const bottomRight = [];
  
  for(let i = topRightCol; i < col - topRightCol; i++) {
    if(img[i][topRightCol] === 1) {
      bottomRight.push(i - 1);
    } else {
      bottomRight.push(i);
    }
  }
  
  return topLeft, bottomRight;
  
}

console.log(findRectangle(image1));

//findRectangle(image3) =>
//  x: 5, y: 3, width: 2, height: 2
// 3,5 4,6


const findRectangleBoolean = (img) => {
  let row = new Array(img.length);
  let column = new Array(img[0].length);
  
  Array.prototype.setAll = function(v) {
    for(let i = 0; i < this.length; i++) {
      this[i] = v;
    }
  }

  row.setAll(false);
  column.setAll(false);

  // Get positions of zeroes

    // "Store" the row and column indicies that contains a 0
    // We set the index to true so that we can reference the index position later as
    // a number of the row/column in which the zero was found
    for(let i = 0; i < img.length; i++) {
      for(let j = 0; j < img[0].length; j++) {
          if(img[i][j] === 0) {
              row[i] = true;
              column[j] = true;
          }
      }
  }

  let topLeftRow = getTopLeft(row);
  let topLeftCol = getTopLeft(column);

  console.log(topLeftRow);
  console.log(topLeftCol);

}

findRectangleBoolean(image2);

// const getTopLeft = (arr) => { 
//   for(let i = 0; i < arr.length; i++) {
//     if(arr[i]) {
//       return i;
//     }
//   }
// }



/* Proper solution with a boolean array storing the zeroes at indexes */

const image1 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const findRectangleBoolean = (img) => {
  let row = new Array(img.length);
  let column = new Array(img[0].length);
  
  Array.prototype.setAll = function(v) {
    for(let i = 0; i < this.length; i++) {
      this[i] = v;
    }
  }

  row.setAll(false);
  column.setAll(false);

  // Get positions of zeroes

    // "Store" the row and column indicies that contains a 0
    // We set the index to true so that we can reference the index position later as
    // a number of the row/column in which the zero was found
  for(let i = 0; i < img.length; i++) {
    for(let j = 0; j < img[0].length; j++) {
        if(img[i][j] === 0) {
            row[i] = true;
            column[j] = true;
        }
    }
  }

  let topLeftRow = getTopLeft(row);
  let topLeftCol = getTopLeft(column);

  let topRightCol = 0;
  let bottomRightRow = 0;

  console.log(topLeftRow);
  console.log(topLeftCol);


  // Get top right Column value
  console.log(column);
  for(let i = topLeftCol; i < column.length; i++) {  // i starts at 3
    if(img[topLeftRow][i] === 1) {
      topRightCol = (i - 1);
    } else if(i === column.length - 1) {
      topRightCol = i;
    }
  }

  // Get bottom right row value 
  for(let i = topLeftRow; i < row.length; i++) {
    if(img[i][topRightCol] === 1) {
      bottomRightRow = (i - 1);
    } else if(i === row.length - 1) {
      bottmRightRow = i;
    }
  }


  const coords = [];
  coords.push(
    {
      topLeftRow,
      topLeftCol
    },
    {
      bottomRightRow,
      topRightCol
    }
  );
  return coords;

}


const getTopLeft = (arr) => { 
  for(let i = 0; i < arr.length; i++) {
    if(arr[i]) {
      return i;
    }
  }
}

findRectangleBoolean(image1);





/*
Suppose we have some input data describing a graph of relationships between parents and children over multiple generations. The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.

For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4:

1   2    4   15
 \ /   / | \ /
  3   5  8  9
   \ / \     \
    6   7    11


Sample input/output (pseudodata):

parentChildPairs = [
    (1, 3), (2, 3), (3, 6), (5, 6), (15, 9),
    (5, 7), (4, 5), (4, 8), (4, 9), (9, 11)
]


Write a function that takes this data as input and returns two collections: one containing all individuals with zero known parents, and one containing all individuals with exactly one known parent.


Output may be in any order:

findNodesWithZeroAndOneParents(parentChildPairs) => [
  [1, 2, 4, 15],       // Individuals with zero parents
  [5, 7, 8, 11]        // Individuals with exactly one parent
]

n: number of pairs in the input

*/

// We can say that a node with zero parents is a number that never appears in the second part of a pair.
// You should use a Set for this.


const parentChildPairs = [
  [1, 3], [2, 3], [3, 6], [5, 6], [15, 9],
  [5, 7], [4, 5], [4, 8], [4, 9], [9, 11]
];

const findNodesWithZeroAndOneParents = (parentChildPairs) => {
  
}

const getParents = (pairs) => {
  
  let pairlength = pairs[0].length;
  let parents = new Set();  
  let singleParents = [];
  
  for(let i = 0; i < pairs.length; i++) {
      parents.add(pairs[i][0]); 
  }
  
  console.log(parents);
    
    
  for(let i = 0; i < pairs.length; i++) {
    if(!parents.has(pairs[0][i])) {
      singleParents.push(pairs[0][i]);
    }
  }
 
  
  console.log(singleParents);
}

getParents(parentChildPairs);