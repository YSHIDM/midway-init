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
const PDFDocument = require('pdf-lib').PDFDocument
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
probe.FFPROBE_PATH = ffprobeInstaller.path

// import async from 'async'
// import * as util from 'util';
// import * as gm from 'gm';
// const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
// import ffprobeInstaller from '@ffprobe-installer/ffprobe';

const { promises } = fs

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
  filePath = filePath.replace(/\\/g, '/')
  const isExists = await exists(filePath)
  if (!isExists) {
    return
  }
  const stat = await promises.stat(filePath)
  if (stat.isFile()) {
    if (fileCallback) {
      return await fileCallback(filePath, stat)
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
export const deleteFile = async (file: string) => await promises.unlink(file).catch(() => void 0)

export const parseFile = async (file: string, to?: string) => {
  const { dir, base, ext: _ext } = path.parse(file)
  const ext = _ext.toLowerCase()
  let data: any = {}
  if (to) {
    const { size, md5, filePath } = await moveFile(file, to)
    data = { size, md5, filePath }
    file = filePath
  }
  const mediaExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.rmvb', '.mp3', '.wav', '.flac', '.aac', '.ogg', 'ape'];

  if (mediaExtensions.includes(ext)) {
    data = await parseMp3Mp4(file)
  } else if (ext === '.pdf') {
    data = await parsePdf(file)
  }
  data.md5 = data.md5 || await getFileMd5(file).catch(o => console.log(o))
  data.size = data.size || await getSize(file)
  const tag = getFileType(ext)
  let result: any = {
    filename: base,
    lowerName: base.toLowerCase(),
    filePath: file,
    dirPath: dir,
    ext,
    tags: [tag],
    ...data,
  }
  return getFileInfo(result)
}
export const simpleParseFile = (file: string, isDir = false) => {
  const { dir, base, ext: _ext } = path.parse(file)
  let ext = ''
  if (_ext) {
    ext = _ext.toLowerCase()
  }
  const tag = getFileType(ext)
  let result: any = {
    filename: base,
    lowerName: base.toLowerCase(),
    filePath: file,
    dirPath: dir,
    ext,
    isDir,
    tags: [tag],
  }
  return getFileInfo(result)
}
function getFileType(ext) {
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.rmvb'];
  const audioExtensions = ['.mp3', '.wav', '.flac', '.aac', '.ogg', 'ape'];
  const documentExtensions = ['.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.pdf'];
  const textExtensions = ['.txt', '.log', '.md', '.doc', '.doc', '.doc']
  const codeExtensions = ['.js', '.cjs', '.mjs', '.ts', '.java', '.c', '.c++', '.h', '.py', '.html', '.css', '.vue', '.sql', '.json', '.xml']
  const imageExtensions = ['.jpg', '.jpeg', 'webp', '.png', '.gif', '.bmp', '.svg', '.ico'];
  const compressExtensions = ['.zip', '.rar', '.7z'];

  if (videoExtensions.includes(ext)) {
    return '视频';
  } else if (audioExtensions.includes(ext)) {
    return '音乐';
  } else if (documentExtensions.includes(ext)) {
    return '文档';
  } else if (imageExtensions.includes(ext)) {
    return '图片';
  } else if (textExtensions.includes(ext)) {
    return '文本';
  } else if (codeExtensions.includes(ext)) {
    return '代码';
  } else if (compressExtensions.includes(ext)) {
    return '压缩包';
  } else {
    return '其他';
  }
}

const parseMp3Mp4 = async file => {
  const probeData = await probe(file)
    .catch(error => {
      return { error }
    })
  if (probeData.error) {
    return { error: probeData.error }
  }
  const { duration, size, tags, } = probeData.format
  return {
    duration,
    size,
    title: tags?.title,
    artist: tags?.artist,
  }
}
const parsePdf = async file => {
  const pdfBuffer = await promises.readFile(file);
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const pageSize = pdfDoc.getPages().length;
  return {
    pageSize,
    size: pdfBuffer.length,
  }
}

// const parseTorrent = async file => {

// }
const getFileInfo = file => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
  file.tags = file.tags || null
  file.resolution = file.resolution || null
  file.duration = file.duration * 1 || null
  return {
    // filename: base,
    // lowerName: base.toLowerCase(),
    alias: '',
    // ext,
    tags: [],
    // filePath: dir,
    duration: 0,
    // size,
    // resolution: '',
    title: '',
    artist: '',
    // md5,
    desc: '',
    secret: '',
    level: 1,
    isDir: false,
    isParse: false,
    showRecycle: false,
    deleted_version: '',
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

export const parseFiles = async filePath => {
  dirTreeToList(filePath, async file => {
    return parseFile(file)
  })
}

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
 * 根据文件页数判断是否 分割pdf，生成缓存文件
 * @param {string} pdfPath pdf文件位置
 * @param {string} partPath pdf文件位置
 * @param {number} skip 跳过页数
 * @param {number} limit 分片页数
 * @returns {Promise<'false'|'true'|string>} 'false'|'true'| Error.message
 */
export const splitPdf = async (pdfPath, partPath, skip = 0, limit = 20) => {
  const docmentAsBytes = await fs.promises.readFile(pdfPath);
  let result = 'false'
  const pdfBytes = await splitPdfBuffer(docmentAsBytes, skip, limit)
    .catch(err => {
      result = err.message
    })
  if (pdfBytes) {
    await write(partPath, pdfBytes);
    return 'true';
  }
  return result;
}
/**
 * pdf 通过 buffer 分页, 根据页数判断是否分页，不分页则返回null
 * @example
 * const pdfBytes = await splitPdfBuffer(docmentAsBytes, skip, limit)
 * const buffer = Buffer.from(pdfBytes)
 * @param {Buffer} buffer pdf buffer
 * @param {number} skip 跳过页数
 * @param {number} limit 分页数, 0表示按文件大小分页
 * @returns {Promise<Uint8Array|null>}
 */
export const splitPdfBuffer = async (buffer, skip = 0, limit = 20) => {
  const split_file_size = 5242880 // 5m
  if (buffer.length < split_file_size) {
    return null;
  }
  const pdfDoc = await PDFDocument.load(buffer);

  let start = skip;
  const numberOfPages = pdfDoc.getPages().length;
  if (limit > numberOfPages) {
    return null;
  }
  if (skip > numberOfPages) {
    throw new Error('页数超过最大值')
  }
  const end = skip + limit < numberOfPages ? skip + limit : numberOfPages;

  const pages = [];
  for (; start < end; start++) {
    pages.push(start);
  }

  const subDocument = await PDFDocument.create();
  const pageList = await subDocument.copyPages(pdfDoc, pages);
  pageList.map(page => subDocument.addPage(page));
  return await subDocument.save();
}
/**
 * 自动分割pdf
 * 按内存大小分割有两点需注意：
 * 1. 分块数向上取整，所以实际分割文件内存大概率小于参数
 * 2. pdf 存在图片与文字，每页内存大小差距较大时，分割文件内存可能大于参数
 * 第二种情况，sizeLimit 参数值应取小一些
 * @param pdfPath pdf文件路径
 * @param sizeLimit 按大小分割
 * @param limit 按页分割
 * @returns 
 */
export const autoSplitPdf = async (pdfPath, sizeLimit = 0, limit = 20) => {
  const docmentAsBytes = await fs.promises.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(docmentAsBytes);
  const numberOfPages = pdfDoc.getPages().length;
  if (limit > numberOfPages) {
    return;
  }
  let start = 0;
  let part = 1
  if (sizeLimit > docmentAsBytes.length) {
    return
  } else if (sizeLimit > 0) {
    limit = Math.ceil(numberOfPages / Math.ceil(docmentAsBytes.length / (sizeLimit * 1024 * 1024)));
  }
  part = Math.ceil(numberOfPages / limit)
  for (let i = 0; i < part; i++) {
    const _end = start + limit;
    const end = _end < numberOfPages ? _end : numberOfPages;
    const pages = [];
    for (; start < end; start++) {
      pages.push(start);
    }

    const subDocument = await PDFDocument.create();
    const pageList = await subDocument.copyPages(pdfDoc, pages);
    pageList.map(page => subDocument.addPage(page));
    const pdfBytes = await subDocument.save();

    const { dir, name, ext } = path.parse(pdfPath)
    const partPath = path.join(dir, name, `${name} (${i+1})${ext}`)
    
    await fs.promises.mkdir(path.join(dir, name), {recursive: true})
    await fs.promises.writeFile(partPath, pdfBytes);
  }
}