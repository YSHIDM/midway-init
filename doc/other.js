
// id
// filename
// lowerName
// alias
// ext
// tags
// filePath
// duration
// size
// resolution
// title
// artist
// md5
// desc
// annex
// secret
// level
// is_dir
// deleted_version
// show_recycle
// creator
// createdAt
// modifier
// updatedAt


// folder_tree
// top_file
// sub_file
// move
// recycle
// restore
// rename
// delete

//   'all' | 'children' | 'top' | 'topFile' | 'topDir' | 'allFile'

// tags // 修改标签

// upload
// download


function escapeRegExp(string) {
  //$&表示整个被匹配的字符串
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


/**
 * 指定目录下文件或文件夹
 * @param {string} logic_path 目标文件夹
 * @param {'all'|'children'|'top'|'topFile'|'topDir'|'allFile'} type 查询类型
 */
async function getTargetFileList(logic_path, type = 'all') {
  const subfolderOption = {
    logic_path: { $regex: `^${logic_path}/` },
    deleted_version: { $eq: null },
  };
  // 顶级目录
  const topLevel = { logic_path, deleted_version: { $eq: null } };
  const logic_path_reg = escapeRegExp(logic_path)
  const topReg = `^${logic_path_reg}/[^/]+$`;
  /** @type {{ $or?:*,logic_path?:*,deleted_version?:*,is_dir?:* }} */
  // type = all
  let query = { $or: [subfolderOption, topLevel] };
  switch (type) {
    case 'children':
      topLevel.is_dir = false;
      break;
    case 'top':
      subfolderOption.logic_path.$regex = topReg;
      subfolderOption.is_dir = true;
      topLevel.is_dir = false;
      break;
    case 'topFile':
      topLevel.is_dir = false;
      query = topLevel
      break;
    case 'topDir':
      subfolderOption.logic_path.$regex = topReg;
      subfolderOption.is_dir = true;
      query = subfolderOption;
      break;
    case 'allFile':
      subfolderOption.is_dir = false;
      topLevel.is_dir = false;
      break;
  }
  return await this.model.find(query).lean()
}
/** @typedef {{path:string,name:string,node_type:string,fullPath:string,children:TreeNode[]}} TreeNode */
/**
 * 创建文件夹树形结构
 * @param {string[]} paths 路径列表
 * @returns {[TreeNode[],string[]]}
 */
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
