function buildTree(paths) {
  const tree = []
  const fullPathSet = new Set()
  for (const path of paths) {
    const segments = path.split('/')
    let currentNode = tree
    let fullPath = ''
    for (const segment of segments) {
      let existingNode = currentNode.find(node => node.path === segment)
      fullPath += fullPath ? ('/' + segment) : segment
      fullPathSet.add(fullPath)
      if (!existingNode) {
        const newNode = { path: segment, name: segment, node_type: 'folder', fullPath }
        currentNode.push(newNode)
        existingNode = newNode
      }
      if (!existingNode.children) {
        existingNode.children = []
      }
      currentNode = existingNode.children
    }
  }
  return [tree, [...fullPathSet]]
}

const obj = buildTree([
  'tree1000',
  'tree1000/tree1001',
  'tree1000/tree1100/tree1101',
  'tree1000/tree1100/tree1110',
  'tree1000/tree1100/tree1120',
  'tree1000/tree1100/tree1120/tree1121',
  'tree1000/tree1100/tree1120/tree1122',
  'tree1000/tree1200',
  'tree1000/tree1200/tree1201',
  
])
console.log('obj :>>', JSON.stringify(obj, null, 2))
