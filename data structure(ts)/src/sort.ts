/**
 * TS 版本的 各种排序算法
 * 学习 TS + 算法两不误！
 * 默认返回升序数组
 * 通过方法中传入 boolen 参数改变排序方式
 * 仅供自己学习使用
 */

class SortAlgorithm {
  // reverseFlag: boolean = false
  public array: Array<number> = []
  public bubbleSort(array, reverseFlag: boolean = false): Array<number> {
    /**
     * 冒泡排序
     * 对每一对相邻元素进行比较。如果第一个比第二个大，就交换
     * O(1)空间复杂度
     * O(n^2)时间复杂度
     * 稳定的排序算法
     */
    let retArray: Array<number> = [...array]
    for (let i = 0; i < retArray.length - 1; i++) {
      for (let j = 0; j < retArray.length - i; j++) {
        // 每一趟冒泡的结果就是完成当前最大值的安置
        if (retArray[j + 1] < retArray[j]) {
          ;[retArray[j + 1], retArray[j]] = [retArray[j], retArray[j + 1]]
        }
      }
    }
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public selectionSort(array = [], reverseFlag: boolean = false): Array<number> {
    /**
     * 选择排序
     * 在未排序序列中找到最小元素，存放到排序序列的起始位置
     * O(1)空间复杂度
     * O(n^2)时间复杂度
     * 适合于小规模的排序
     * 不稳定的排序算法
     */
    let retArray: Array<number> = [...array]
    for (let i = 0; i < retArray.length - 1; i++) {
      let minIndex: number = i
      for (let j = i + 1; j < retArray.length; j++) {
        // 找到后续未排序数组的最小值索引
        if (retArray[j] < retArray[minIndex]) {
          minIndex = j
        }
      }
      // 交换到头部
      ;[retArray[minIndex], retArray[i]] = [retArray[i], retArray[minIndex]]
    }
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public insertionSort(array = [], reverseFlag: boolean = false): Array<number> {
    /**
     * 插入排序
     * 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置
     * O(1)空间复杂度
     * O(n^2)时间复杂度
     * 稳定的排序算法
     */
    let retArray: Array<number> = [...array]
    for (let i = 1; i < retArray.length; i++) {
      let curValue: number = retArray[i]
      let j: number
      for (j = i - 1; j >= 0; j--) {
        if (curValue < retArray[j]) {
          // 这里的再添加 = 就属于不稳定的排序算法
          retArray[j + 1] = retArray[j]
        } else {
          break
        }
      }
      retArray[j + 1] = curValue
    }
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public shellSort(array = [], reverseFlag: boolean = false): Array<number> {
    /**
     * 希尔排序
     * 也叫做递减增量排序算法，是插入排序的一种更高效的改进版本
     * 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置
     * O(1)空间复杂度
     * O(nlogn)时间复杂度
     * 不稳定的排序算法
     */
    let retArray: Array<number> = [...array]
    let gap: number = 1,
      n: number = retArray.length
    while (gap < Math.floor(n / 3)) {
      gap = gap * 3 + 1
    }
    // 缩小增量
    for (; gap > 0; gap = Math.floor(gap / 3)) {
      for (let i = gap; i < n; i++) {
        let temp: number = retArray[i]
        let j: number
        // 下面就是一个间距为 gap 的插入排序
        for (j = i - gap; j >= 0 && retArray[j] > temp; j -= gap) {
          retArray[j + gap] = retArray[j]
        }
        retArray[j + gap] = temp
      }
    }
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public mergeSort(array = [], reverseFlag: boolean = false) {
    /**
     * 归并排序
     * 利用了分而治之的思想 分为递归部分和合并部分
     * 先递归的分解数列，再合并数
     * O(n)空间复杂度
     * O(nlogn)时间复杂度
     * 不稳定的排序算法
     */

    let retArray: Array<number>
    function mergeArray(front: number[], end: number[]): number[] {
      // 创建一个临时存储数组
      const temp = []
      while (front.length && end.length) {
        // 比较两数组第一个元素,将较小的元素加入临时数组
        if (front[0] < end[0]) {
          temp.push(front.shift())
        } else {
          temp.push(end.shift())
        }
      }
      // 若左右数组有一个为空，那么此时另一个数组一定大于temp中的所有元素，直接将所哟元素加入temp
      while (front.length) {
        temp.push(front.shift())
      }
      while (end.length) {
        temp.push(end.shift())
      }
      return temp
    }

    function _mergeSort(array = []) {
      if (array.length < 2) {
        return array
      }
      // 获取中点
      const mid = Math.floor(array.length / 2)
      // 前半段和后半段
      let front = array.slice(0, mid)
      let end = array.slice(mid)
      return mergeArray(_mergeSort(front), _mergeSort(end))
    }

    retArray = _mergeSort(array)
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public quickSort(array = [], reverseFlag: boolean = false) {
    /**
     * 快速排序
     * 分治思想 + 递归
     * 将比这个数小的数全部放在它的左边，大于或等于它的数全部放在它的右边
     * 对左右两个小数列重复第二步，直至各区间只有1个数
     * O(1)空间复杂度
     * O(nlogn)时间复杂度
     * 不稳定的排序算法
     */
    let retArray: Array<number> = [...array]

    function _quickSort(array, left: number, right: number): void {
      if (left > right) {
        return
      }
      // 选择 arr[left] 为枢纽元 但事实上并不推荐这么简单处理
      let [i, j, pivot] = [left, right, array[left]]
      while (i < j) {
        while (i < j && pivot <= array[j]) {
          j--
        }
        if (i < j) {
          array[i] = array[j]
          i++
        }
        while (i < j && array[i] < pivot) {
          i++
        }
        if (i < j) {
          array[j] = array[i]
          j--
        }
      }
      array[i] = pivot
      // 递归调用
      _quickSort(array, left, i - 1)
      _quickSort(array, i + 1, right)
    }

    _quickSort(retArray, 0, retArray.length - 1)
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public countSort(array = [], reverseFlag: boolean = false) {
    /**
     * 计数排序
     * 辅助数组 + 要求待排序的n个元素的大小在[0, k]之间
     * 不是基于比较的排序算法，它基于计数策略
     * 通过开辟辅助数组，将待排序的元素输入到指定的位置，之后按序返回
     * O(k)空间复杂度
     * O(n)时间复杂度
     * 稳定的排序算法
     */
    let retArray: Array<number> = [...array],
      MAX: number = Number.MAX_VALUE,
      min: number = MAX,
      max: number = -MAX

    for (let num of retArray) {
      min = Math.min(min, num)
      max = Math.max(max, num)
    }
    // 辅助数组
    // typescript 默认编译的 target 为 ES3
    let helper: number[] = new Array(max - min + 1).fill(0)
    // 遍历源数组按照索引加入 helper
    for (let num of retArray) {
      helper[num - 1] += 1
    }
    let idx: number = 0
    // 返回
    for (let i = min; i <= max; i++) {
      let cnt: number = helper[i - 1]
      while (cnt-- > 0) {
        retArray[idx++] = i
      }
    }
    return !reverseFlag ? retArray : retArray.reverse()
  }

  public heapSort(array = [], reverseFlag: boolean = false) {
    /**
     * 堆排序(大顶堆)
     * 将无需序列构建成一个堆，根据升序需求选择大顶堆。此时，整个序列的最大值就是堆顶的根节点
     * 将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆
     * O(n)空间复杂度
     * O(nlogn)时间复杂度
     * 不稳定的排序算法
     */

    let retArray: Array<number> = [...array]
    function _heapSort(arr: number[]): void {
      let arrLength = arr.length
      // 1. 构造大顶堆
      for (let i = Math.floor(arrLength / 2) - 1; i >= 0; i--) {
        // 从第一个非叶子节点 按照从下往上 从左往右的顺序调整
        adjustHeap(arr, i, arrLength)
      }
      // 2. 调整堆结构 交换堆顶和末尾元素
      for (let j = arrLength - 1; j >= 0; j--) {
        ;[arr[j], arr[0]] = [arr[0], arr[j]]
        // 重新调整为大顶堆
        adjustHeap(arr, 0, j)
      }
    }
    function adjustHeap(arr: number[], i: number, len: number): void {
      // 取出当前元素
      let temp: number = arr[i]
      // 从儿子节点中找到最大值
      for (let k = 2 * i + 1; k < len; k = k * 2 + 1) {
        if (k + 1 < len && arr[k] < arr[k + 1]) {
          // 如果右儿子大于左儿子的值
          k++
        }
        if (temp < arr[k]) {
          // 上浮
          arr[i] = arr[k]
          i = k
        } else {
          break
        }
      }
      arr[i] = temp
    }

    _heapSort(retArray)
    return !reverseFlag ? retArray : retArray.reverse()
  }
}

export default SortAlgorithm
