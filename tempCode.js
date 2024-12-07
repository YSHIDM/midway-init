const arr = [{
  id: '1',
  name: 'a',
  treePath: '1'
}, {
  id: '2',
  name: 'b',
  treePath: '1/2'
}, {
  id: '3',
  name: 'c',
  treePath: '1/3'
}, {
  id: '4',
  name: 'd',
  treePath: '1/3/4'
}, {
  id: 'a1',
  name: 'c',
  treePath: '1/3'
}, {
  id: 'a2',
  name: 'd',
  treePath: 'a1/a2'
}]
const trees = [{
  id: '1',
  name: 'a',
  treePath: '1',
  children: [{
    id: '2',
    name: 'b',
    treePath: '1/2',
  }, {
    id: '3',
    name: 'c',
    treePath: '1/3',
    children: [{
      id: '4',
      name: 'd',
      treePath: '1/3/4'
    }]
  }]
}]
function buildTree(arr) {
  const tree = [];
  const map = new Map();

  arr.forEach((item) => {
    const parts = item.treePath.split('/');
    const id = parts[parts.length - 1];
    if (!map.has(id)) {
      const newItem = {
       ...item,
        children: []
      };
      map.set(id, newItem);
      if (parts.length === 1) {
        tree.push(newItem);
      } else {
        const parentId = parts[parts.length - 2];
        const parent = map.get(parentId);
        if (parent) {
          parent.children.push(newItem);
        }
      }
    }
  });

  return tree;
}

const trees2 = buildTree(arr);
console.log('trees2 :>>', JSON.stringify(trees2, null, 2))
