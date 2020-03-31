"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SortAlgorithm {
    constructor() {
        this.array = [];
    }
    bubbleSort(array, reverseFlag = false) {
        let retArray = [...array];
        for (let i = 0; i < retArray.length - 1; i++) {
            for (let j = 0; j < retArray.length - i; j++) {
                if (retArray[j + 1] < retArray[j]) {
                    ;
                    [retArray[j + 1], retArray[j]] = [retArray[j], retArray[j + 1]];
                }
            }
        }
        return !reverseFlag ? retArray : retArray.reverse();
    }
    selectionSort(array = [], reverseFlag = false) {
        let retArray = [...array];
        for (let i = 0; i < retArray.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < retArray.length; j++) {
                if (retArray[j] < retArray[minIndex]) {
                    minIndex = j;
                }
            }
            ;
            [retArray[minIndex], retArray[i]] = [retArray[i], retArray[minIndex]];
        }
        return !reverseFlag ? retArray : retArray.reverse();
    }
    insertionSort(array = [], reverseFlag = false) {
        let retArray = [...array];
        for (let i = 1; i < retArray.length; i++) {
            let curValue = retArray[i];
            let j;
            for (j = i - 1; j >= 0; j--) {
                if (curValue < retArray[j]) {
                    retArray[j + 1] = retArray[j];
                }
                else {
                    break;
                }
            }
            retArray[j + 1] = curValue;
        }
        return !reverseFlag ? retArray : retArray.reverse();
    }
    shellSort(array = [], reverseFlag = false) {
        let retArray = [...array];
        let gap = 1, n = retArray.length;
        while (gap < Math.floor(n / 3)) {
            gap = gap * 3 + 1;
        }
        for (; gap > 0; gap = Math.floor(gap / 3)) {
            for (let i = gap; i < n; i++) {
                let temp = retArray[i];
                let j;
                for (j = i - gap; j >= 0 && retArray[j] > temp; j -= gap) {
                    retArray[j + gap] = retArray[j];
                }
                retArray[j + gap] = temp;
            }
        }
        return !reverseFlag ? retArray : retArray.reverse();
    }
    mergeSort(array = [], reverseFlag = false) {
        let retArray;
        function mergeArray(front, end) {
            const temp = [];
            while (front.length && end.length) {
                if (front[0] < end[0]) {
                    temp.push(front.shift());
                }
                else {
                    temp.push(end.shift());
                }
            }
            while (front.length) {
                temp.push(front.shift());
            }
            while (end.length) {
                temp.push(end.shift());
            }
            return temp;
        }
        function _mergeSort(array = []) {
            if (array.length < 2) {
                return array;
            }
            const mid = Math.floor(array.length / 2);
            let front = array.slice(0, mid);
            let end = array.slice(mid);
            return mergeArray(_mergeSort(front), _mergeSort(end));
        }
        retArray = _mergeSort(array);
        return !reverseFlag ? retArray : retArray.reverse();
    }
    quickSort(array = [], reverseFlag = false) {
        let retArray = [...array];
        function _quickSort(array, left, right) {
            if (left > right) {
                return;
            }
            let [i, j, pivot] = [left, right, array[left]];
            while (i < j) {
                while (i < j && pivot <= array[j]) {
                    j--;
                }
                if (i < j) {
                    array[i] = array[j];
                    i++;
                }
                while (i < j && array[i] < pivot) {
                    i++;
                }
                if (i < j) {
                    array[j] = array[i];
                    j--;
                }
            }
            array[i] = pivot;
            _quickSort(array, left, i - 1);
            _quickSort(array, i + 1, right);
        }
        _quickSort(retArray, 0, retArray.length - 1);
        return !reverseFlag ? retArray : retArray.reverse();
    }
    countSort(array = [], reverseFlag = false) {
        let retArray = [...array], MAX = Number.MAX_VALUE, min = MAX, max = -MAX;
        for (let num of retArray) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        let helper = new Array(max - min + 1).fill(0);
        for (let num of retArray) {
            helper[num - 1] += 1;
        }
        let idx = 0;
        for (let i = min; i <= max; i++) {
            let cnt = helper[i - 1];
            while (cnt-- > 0) {
                retArray[idx++] = i;
            }
        }
        return !reverseFlag ? retArray : retArray.reverse();
    }
    heapSort(array = [], reverseFlag = false) {
        let retArray = [...array];
        function _heapSort(arr) {
            let arrLength = arr.length;
            for (let i = Math.floor(arrLength / 2) - 1; i >= 0; i--) {
                adjustHeap(arr, i, arrLength);
            }
            for (let j = arrLength - 1; j >= 0; j--) {
                ;
                [arr[j], arr[0]] = [arr[0], arr[j]];
                adjustHeap(arr, 0, j);
            }
        }
        function adjustHeap(arr, i, len) {
            let temp = arr[i];
            for (let k = 2 * i + 1; k < len; k = k * 2 + 1) {
                if (k + 1 < len && arr[k] < arr[k + 1]) {
                    k++;
                }
                if (temp < arr[k]) {
                    arr[i] = arr[k];
                    i = k;
                }
                else {
                    break;
                }
            }
            arr[i] = temp;
        }
        _heapSort(retArray);
        return !reverseFlag ? retArray : retArray.reverse();
    }
}
exports.default = SortAlgorithm;
//# sourceMappingURL=sort.js.map