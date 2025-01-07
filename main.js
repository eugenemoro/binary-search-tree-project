import { BinarySearchTree } from "./binarySearchTree.js";

let randomArray = [];
for (let i = 0; i < 100; i++) {
  randomArray.push(Math.floor(Math.random() * 100));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new BinarySearchTree(randomArray);

console.log(`isBalanced: ${tree.isBalanced()}`);

prettyPrint(tree.root);

for (let i = 0; i < 10; i++) {
  tree.insert(100 + Math.floor(Math.random() * 50));
}

prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`);

tree.rebalance();
prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`);

tree.levelOrderRecursive(el => console.log(el.value));
tree.preOrder(el => console.log(el.value));
tree.postOrder(el => console.log(el.value));
tree.inOrder(el => console.log(el.value));
