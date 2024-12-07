
// import * as fs from 'fs'
// import * as path from 'path';
// const PDFDocument = require('pdf-lib').PDFDocument

// /**
//  * 自动分割pdf
//  * 按内存大小分割有两点需注意：
//  * 1. 分块数向上取整，所以实际分割文件内存大概率小于参数
//  * 2. pdf 存在图片与文字，每页内存大小差距较大时，分割文件内存可能大于参数
//  * 第二种情况，sizeLimit 参数值应取小一些
//  * @param pdfPath pdf文件路径
//  * @param sizeLimit 按大小分割
//  * @param limit 按页分割
//  * @returns
//  */
// const autoSplitPdf = async (pdfPath, sizeLimit = 0, limit = 20) => {
//   const docmentAsBytes = await fs.promises.readFile(pdfPath);
//   const pdfDoc = await PDFDocument.load(docmentAsBytes);
//   const numberOfPages = pdfDoc.getPages().length;
//   if (limit > numberOfPages) {
//     return;
//   }
//   let start = 0;
//   let part = 1
//   if (sizeLimit > docmentAsBytes.length) {
//     return
//   } else if (sizeLimit > 0) {
//     limit = Math.ceil(numberOfPages / Math.ceil(docmentAsBytes.length / (sizeLimit * 1024 * 1024)));
//   }
//   part = Math.ceil(numberOfPages / limit)
//   for (let i = 0; i < part; i++) {
//     const _end = start + limit;
//     const end = _end < numberOfPages ? _end : numberOfPages;
//     const pages = [];
//     for (; start < end; start++) {
//       pages.push(start);
//     }

//     const subDocument = await PDFDocument.create();
//     const pageList = await subDocument.copyPages(pdfDoc, pages);
//     pageList.map(page => subDocument.addPage(page));
//     const pdfBytes = await subDocument.save();

//     const { dir, name, ext } = path.parse(pdfPath)
//     const partPath = path.join(dir, name, `${name} (${i+1})${ext}`)

//     await fs.promises.mkdir(path.join(dir, name), {recursive: true})
//     await fs.promises.writeFile(partPath, pdfBytes);
//   }
// }
// autoSplitPdf('I:/文档/开发/javascript基础与实践教程.pdf', 20).catch(err => console.log(err))
