import { Node } from './node.js';

export class BinarySearchTree {
  root;

  constructor(data) {
    data = [...new Set(data)].sort((a, b) => a - b);
    console.log(data);
    this.root = this.buildTree(data, 0, data.length - 1);
  }

  buildTree(data, start, end) {
    if (start > end) return null;
    const mid = Math.floor((end + start) / 2);
    const rootNode = new Node(data[mid]);
    rootNode.left = this.buildTree(data, start, mid - 1);
    rootNode.right = this.buildTree(data, mid + 1, end);
    return rootNode;
  }

  insert(value, node = this.root) {
    if (value == null) throw new Error('Value cannot be null or undefined.');
    if (value < node.value) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        this.insert(value, node.right);
      }
    }
  }

  deleteItem(value, node = this.root) {
    if (value == null) throw new Error('Value cannot be null or undefined.');
    if (!node) return null;
    if (value < node.value) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left && !node.right) {
        node = null;
      } else if (node.left && !node.right) {
        node = node.left;
      } else if (!node.left && node.right) {
        node = node.right;
      } else {
        node.value = this.#findSuccessor(node.right);
        node.right = this.deleteItem(node.value, node.right);
      }
    }
    return node;
  }

  #findSuccessor(node) {
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  find(value, node = this.root) {
    if (node.value === value) return node;
    if (node.left) {
      const result = this.find(value, node.left);
      if (result) return result;
    }
    if (node.right) {
      const result = this.find(value, node.right);
      if (result) return result;
    }
  }

  levelOrderIterative(callback) {
    if (callback instanceof Function) {
      let node = this.root;
      let queue = [];
      while (node) {
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        node = queue.shift();
      }
    } else {
      throw 'Callback is required';
    }
  }

  levelOrderRecursive(callback, queue = new Array(this.root)) {
    if (callback instanceof Function) {
      if (queue.length === 0) return;
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      callback(node);
      this.levelOrderRecursive(callback, queue);
    } else {
      throw 'Callback is required';
    }
  }

  preOrder(callback, node = this.root) {
    if (callback instanceof Function) {
      if (!node) return;
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    } else {
      throw 'Callback is required';
    }
  }

  inOrder(callback, node = this.root) {
    if (callback instanceof Function) {
      if (!node) return;
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    } else {
      throw 'Callback is required';
    }
  }

  postOrder(callback, node = this.root) {
    if (callback instanceof Function) {
      if (!node) return;
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    } else {
      throw 'Callback is required';
    }
  }

  height(node, height = -1) {
    if (!node) return height;
    height++;
    let heightLeft = this.height(node.left, height);
    let heightRight = this.height(node.right, height);
    return heightLeft > heightRight ? heightLeft : heightRight;
  }

  depth(nodeToMeasure, depth = -1, node = this.root) {
    depth++;
    if (node === nodeToMeasure) return depth;
    if (node.left) {
      const leftDepth = this.depth(nodeToMeasure, depth, node.left);
      if (leftDepth) return leftDepth;
    }
    if (node.right) {
      const rightDepth = this.depth(nodeToMeasure, depth, node.right);
      if (rightDepth) return rightDepth;
    }
  }

  isBalanced(node = this.root, balanced = true) {
    if (!balanced) return false;
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
      leftHeight = this.height(node.left);
      balanced = balanced && this.isBalanced(node.left);
    } 
    if (node.right) {
      rightHeight = this.height(node.right);
      balanced = balanced && this.isBalanced(node.right);
    }
    return (Math.abs(leftHeight - rightHeight) <= 1) && balanced;
  }

  rebalance() {
    const arrayOfNodeValues = [];
    this.inOrder((el) => arrayOfNodeValues.push(el.value));
    this.root = this.buildTree(arrayOfNodeValues, 0, arrayOfNodeValues.length - 1);
  }
}
