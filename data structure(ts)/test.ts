import SortAlgorithm from './src/sort.js'

// 测试区
let sort = new SortAlgorithm()
let arr = [1, 4, 5, 5, 7, 7, 2, 3, 6, 8, 10, 9]

console.log('bubbleSort result: ' + sort.bubbleSort(arr))
console.log('selectionSort result: ' + sort.selectionSort(arr))
console.log('insertionSort result: ' + sort.insertionSort(arr))
console.log('shellSort result: ' + sort.shellSort(arr))
console.log('mergeSort result: ' + sort.mergeSort(arr))
console.log('quickSort result: ' + sort.quickSort(arr))
console.log('countSort result: ' + sort.countSort(arr))
console.log('heapSort result: ' + sort.heapSort(arr))
