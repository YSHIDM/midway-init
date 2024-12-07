
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
const getCode = (prefix: string, length = 20) => {
  const customNanoid = customAlphabet(alphabet, length - prefix.length);
  return prefix + customNanoid();
}

const arr = [
  {
    "id": "tree1100",
    "name": "1110",
    "branch": "tree1000"
  },
  {
    "id": "tree1110",
    "name": "1110",
    "branch": "tree1000/tree1100"
  },
  {
    "id": "tree1120",
    "name": "1120",
    "branch": "tree1000/tree1100"
  },
  {
    "id": "tree1101",
    "name": "1101",
    "branch": "tree1000/tree1100"
  },
  {
    "id": "tree1121",
    "name": "1121",
    "branch": "tree1000/tree1100/tree1120"
  },
  {
    "id": "tree1122",
    "name": "1122",
    "branch": "tree1000/tree1100/tree1120"
  }
]

function copyNodeData(arr, branch = 'tree1000', newBranch = 'tree2000/tree2100') {
  const idMap = new Map();
  idMap.set(branch, newBranch)
  const nodeList = arr.map(node => {
      const newId = getCode('tree');
      idMap.set(node.id, newId);
      return {...node, id: newId };
  });
  const regex = new RegExp([...idMap.keys()].join('|'), 'g');
  nodeList.forEach(node => {
      node.branch = node.branch.replaceAll(regex, matched => idMap.get(matched));
  });
  return nodeList;
}
const nodeList = copyNodeData(arr)
console.log(nodeList)
