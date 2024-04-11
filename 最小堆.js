/**
 * 得到当前节点的父节点下标
 * @param {*} index 当前节点的下标
 * @returns 父项的下标
 */
function getParentNode(index) {
  return Math.floor((index - 1) / 2)
}

/**
 * 得到当前节点的左分支节点
 * @param {*} index 当前节点下标
 * @returns 左分支节点下标
 */
function getLeftNode(index) {
  return index * 2 + 1
}

/**
 * 得到当前节点的右分支节点
 * @param {*} index 当前节点下标
 * @returns 右分支节点下标
 */
function getRightNode(index) {
  return index * 2 + 2
}

/**
 * 取出堆顶的任务
 * @param {*} heap 任务列表
 * @returns 堆顶的任务
 */
function peek(heap) {
  // 返回数组的第一项
  const first = heap.length === 0 ? null : heap[0]
  return first
}

/**
 * 往最小堆中推入一个任务
 * @param {*} heap
 * @param {*} node
 */
function push(heap, node) {
  const index = heap.length
  // 推入到数组的最后一项
  heap.push(node)
  // 向上调整，调整到合适的位置
  siftUp(heap, node, index)
}

/**
 * 从任务堆中弹出第一个任务
 * @param {*} heap
 * @returns
 */
function pop(heap) {
  if (heap.length === 0) return null

  const first = heap[0]
  const last = heap.pop()

  if (first !== last) {
    // 将最后一个任务放到第一个
    heap[0] = last
    // 向下调整
    siftDown(heap, last, 0)
  }
  console.log("pop后：", heap, "推出的任务：", first)

  return first
}

/**
 * 向上调整，当前节点与父节点比较，若当前节点比父节点小，两个元素交换位置
 * @param {*} heap
 * @param {*} node
 * @param {*} index
 */
function siftUp(heap, node, index) {
  let parentIndex = getParentNode(index)
  while (
    heap[parentIndex] &&
    heap[index] &&
    compare(heap, parentIndex, index)
  ) {
    // 两个节点交换位置
    heap[index] = heap[parentIndex]
    heap[parentIndex] = node

    // 当前的index替换成已交互的index
    index = parentIndex
    // 根据新的index获取父index
    parentIndex = getParentNode(index)
  }
}

/**
 * 向下调整，当前先和左子节点比较，若当前节点大于左子节点，交换两个节点位置；否则比较右子节点
 * @param {*} heap
 * @param {*} node
 * @param {*} index
 */
function siftDown(heap, node, index) {
  let leftIndex = getLeftNode(index)
  // 和左子节点比较，比左子节点大，就交互位置
  while (heap[leftIndex] && heap[index] && compare(heap, index, leftIndex)) {
    heap[index] = heap[leftIndex]
    heap[leftIndex] = node

    index = leftIndex
    leftIndex = getLeftNode(index)
  }

  let rightIndex = getRightNode(index)
  // 左子节点比较完毕，进行右子节点比较，大于右子节点，交换两个节点位置
  while (heap[rightIndex] && heap[index] && compare(heap, index, rightIndex)) {
    heap[index] = heap[rightIndex]
    heap[rightIndex] = node

    index = rightIndex
    rightIndex = getLeftNode(index)
  }
}

function compare(heap, firstIndex, lastIndex) {
  return heap[firstIndex].num > heap[lastIndex].num
}

const queue = []

const arr = [4, 2, 10, 1, 11, 21, 8, 18, 2]
arr.forEach((num) => push(queue, { num }))

//       1
//    2     8
//   4 11 21 10
// 18

//        1
//    2      8
//   2 11 21  10
// 18 4

pop(queue)
peek(queue)

// [(1, 2, 8, 2, 11, 21, 10, 18, 4)]
