// 遍历文件夹与文件
// 文件批量重命名 1.按空间大小排序;2.[前缀]+文件名+[后缀]+(.文件类型);
// 文件夹批量重命名 1.按空间大小排序*;2.[前缀]+文件名+[后缀];
// 获取 md5 值及其他信息,并存储,可以根据 md5自动去重,存进备份文件夹;
// 移动文件或文件夹,并更新数据库
// 软删除文件或文件夹到自定义回收站
// 管理文件: 文件库-文件夹-文件

// 图片分辨率
// 音乐:时长,文件大小,歌手等
// 视频:时长,文件大小

import * as fs from 'fs'
import * as path from 'path'
const md5File = require('md5-file')
// import probe from 'node-ffprobe'
const probe = require('node-ffprobe')
import * as dayjs from 'dayjs'
const crypto = require('crypto')
// import async from 'async'
// import * as util from 'util';
// import * as gm from 'gm';
// const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
// import ffprobeInstaller from '@ffprobe-installer/ffprobe';


const { promises } = fs
// const Mime = require('mime');

//   /**
//    * 图片压缩临界值,200K,值单位:byte
//    */
//   IMAGE_CRITICAL_SIZE: 204800, // 2000 * 1024,
//   /**
//    * 按临界值压缩上传图片,移动至存储位置,并返回文件大小
//    * @param criticalSize 图片压缩临界大小
//    * @param oldPath 旧地址
//    * @param newPath 新地址,默认等于 oldPath
//    */
//    renameAndGetSize: async (criticalSize=204800, oldPath, newPath = oldPath) => {
//     newPath = newPath || oldPath;
//     /*
//      * 递归创建文件存储位置
//      */
//     let { size } = await promises.stat(oldPath);
//     if (size > criticalSize) {
//       try {
//         await gm(oldPath)
//           .setFormat('JPEG')
//           .quality(20) // 设置压缩质量: 0-100
//           .strip()
//           .autoOrient()
//           .writePromise(newPath);
//       } catch (error) {
//         console.error(error);
//         throw {
//           code: 4000,
//           // msg: `${path.basename(newPath)} 图片压缩失败，可尝试修改图片再上传`,
//           data: null,
//         };
//       }
//       size = (await promises.stat(newPath)).size;
//     }
//     return {
//       code: 2000,
//       msg: null,
//       data: {
//         size,
//       },
//     };
//   },

/**
 * 获取文件大小
 * 路径为文件夹时返回值是其本身大小,而非文件夹所有文件大小总和
 * @param {string} filePath 文件路径
 * @returns {Promise<number>} 单位:
 */
export const getSize = async (filePath: string): Promise<number> => await promises.stat(filePath).then(stat => stat.size)
/**
 * 文件/目录是否存在
 * @param {string} filePath 文件路径
 * @return {Promise<boolean>} true:存在;false:不存在
 */
export const exists = async (filePath: string): Promise<boolean> => await promises.access(filePath).then(() => true).catch(() => false)
/**
 * 是文件
 * @param {string} filePath 文件路径
 * @return {Promise<boolean>} true:是;false:不是或不存在
 */
export const isFile = async (filePath: string): Promise<boolean> => await promises.stat(filePath).then(stat => stat.isFile()).catch(() => false)
/**
 * 是目录
 * @param {string} filePath 文件路径
 * @return {Promise<boolean>} true:是;false:不是或不存在
 */
export const isDirectory = async (filePath: string): Promise<boolean> => await promises.stat(filePath).then(stat => stat.isDirectory()).catch(() => false)
// async function dirTreeToList2(filePath: string, fileCallback?: (file: string) => string, dirCallback?: (dir: string) => void): Promise<string[]>;
// async function dirTreeToList2(filePath: string, fileCallback?: (file: string) => any, dirCallback?: (dir: string) => void): Promise<any[]>;
// async function dirTreeToList2(filePath: string, fileCallback?: (file: string) => void, dirCallback?: (dir: string) => void): Promise<void[]>;
// async function dirTreeToList2(filePath: string, fileCallback?: (file: string) => void, dirCallback?: (dir: string) => void): Promise<void[]>;
export async function dirTreeToList(filePath: string,
  fileCallback?: (file: string, arg1: fs.Stats) => Promise<(any)>,
  dirCallback?: (dir: string) => void) {
  const isExists = await exists(filePath)
  if (!isExists) {
    return
  }
  const stat = await promises.stat(filePath)
  if (stat.isFile()) {
    if (fileCallback) {
      return fileCallback(filePath, stat)
    }
    return [filePath]
  }
  const files = await promises.readdir(filePath).then(o => o)
  if (!files) {
    return
  }
  const fileNamePromiseList: Promise<unknown>[] = files.map(async fileName => {
    const file = path.join(filePath, fileName)
    return await dirTreeToList(file, fileCallback, dirCallback)
  })
  if (dirCallback) {
    dirCallback(filePath)
  }
  // return ([] as unknown[]).concat(...await Promise.all(fileNamePromiseList))
  return (await Promise.all(fileNamePromiseList)).flat()
}
export const write = async (filePath: string, data: string) => promises.writeFile(filePath, data)
export const rename = async (oldPath: string, newPath: string) => promises.rename(oldPath, newPath)
export const getFileMd5 = async (file: string) => await md5File(file)

export const parseFile = async (file: string, to?: string) => {
  const { dir, base, ext } = path.parse(file)
  let result: any = {
    filename: base,
    lowerName: base.toLowerCase(),
    filePath: dir,

  }
  if (to) {
    const { size, md5, filePath } = await moveFile(file, to)
    result = { ...result, size, md5, filePath }
  } else {
    // const size = await getSize(file)
    const md5 = await getFileMd5(file)
    result = { ...result, md5 }
  }
  if (['.mp3', '.mp4', '.avi', '.mkv',].includes(ext)) {
    const probeData = await probe(file)
    if (probeData.error) {
      return getFileInfo(result)
    }
    const { duration, size, tags, } = probeData.format
    return getFileInfo({
      duration,
      size,
      title: tags?.title,
      artist: tags?.artist,
      ...result
    })
  } else if (ext === '') {
    console.log('result :>>', result)
  }
  return getFileInfo(result)
}

const getFileInfo = file => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
  return {
    // filename: base,
    // lowerName: base.toLowerCase(),
    alias: '',
    // ext,
    tags: [],
    // filePath: dir,
    duration: '',
    // size,
    // resolution: '',
    title: '',
    artist: '',
    // md5,
    desc: '',
    secret: '',
    level: 1,
    isDir: false,
    deleted_version: '',
    show_recycle: '',
    createdAt: now,
    updatedAt: now,
    ...file,
  }
}

/** @typedef {{path:string,name:string,node_type:string,fullPath:string,children:TreeNode[]}} TreeNode */
/**
 * 创建文件夹树形结构
 * @param {string[]} paths 路径列表
 * @returns {[TreeNode[],string[]]}
 */
export const buildTree = (paths: string[]) => {
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
export const moveFile = async (from: string, to: string) => {
  const stream = fs.createReadStream(from)
  const ws = fs.createWriteStream(to)
  const hash = crypto.createHash('md5')
  let size = 0
  const md5: string = await new Promise((res, rej) => {
    stream.on('data', chunk => {
      hash.update(chunk)
      size += chunk.length
    })
    stream.on('error', error => {
      rej(error)
    })
    stream.on('end', () => {
      const md5Hash = hash.digest('hex')
      res(md5Hash)
    })
  })
  stream.pipe(ws)
  return {
    size,
    md5,
    filePath: to,
  }
}
