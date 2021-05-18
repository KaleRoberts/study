// Sorting 

/* 
    Five common sorting algorithms
    
    Bubble Sort | Runtime O(n^2) average and worst case. Space O(1)
    In bubble sort we start at the beginning of the array and swap the first two elements
    if the first is greater than the second. Then we go to the next pair and so on, continuously making sweeps
    of the array unti it is sorted. In doing so, the smaller items slowly bubble up to the beginning of the list.

    Selection Sort | Runtime O(n^2) average and worst case. Space O(1)
    Find the smallest element using a linear scan and move it to the front (swapping it with the front element).
    Then find the second smallest and move it, again doing a linear scan. Continue until all elements are in place.

    Merge Sort | Runtime O(n log(n)) average and worst case. Space Dependent
    Divides array in half, sorts each of those halves and then merges them back together. Each of those halves has the same
    sorting algorithm applied to it. Eventually you just merge two single element arrays. The "merge" part does the heavy lifting. BLECH

    Quick Sort | Runtime O(n log(n)), worst case is O(n^2). Space O(log(n))
    In quick sort we pick a random element and partition the array, such that all numbers that are less than the 
    partitioning point/element come before all elements that are greater than it. Partitioning can be performed
    efficiently through a series of swaps.
    If we repeatedly partition the array (and its sub-arrays) around an element, the array will eventually become
    sorted. However, as the partitioned element is not guaranteed to be the median (or anywhere near the median), our
    sorting could be very slow. Thus we have O(n^2) for our wost case scenario.
*/

const quickSort = (arr, left, right) => {
    let index = partition(arr, left, right);
    if(left < index - 1) {
        quickSort(arr, left, index - 1);
    }
    if(index < right) {
        quickSort(arr, index, right);
    }
}

const partition = (arr, left, right) => {
    let pivot = arr[left + (right - left) / 2]; // Choose pivot point
    while (left <= right) {
        // FInd elem on left taht should be on right
        while(arr[left] < pivot) left++;

        // Find element on right that should be on the left
        while(arr[right] > pivot) right--;

        //Swap elements, and move left and right indicies
        if(left <= right) {
            swap(arr, left, right); // swaps elements
            left++;
            right--;
        }
    }
    return left;
}


/* Binary Search */
const binarySearch = (a, x) => {
    let low = 0;
    let high = a.length - 1;
    let mid;

    while(low <= high) {
        mid = low + (high - low) / 2;
        mid = Math.floor(mid);
        if(a[mid] < x) {
            low = mid + 1;
        } else if(a[mid] > x) {
            low = mid - 1;
        } else {
            return mid;
        }
    }
    return -1; // Error
}

const searchMe = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 100, 200];

console.log(binarySearch(searchMe, 100));

