
/**
 * 转义正则表达式
 * $&表示整个被匹配的字符串
 * @example
 * const filePathReg = escapeRegExp('filePath')
 * const reg = `^${filePathReg}/[^/]+$`;
 * @param string 目标字符串
 * @returns {string}
 */
const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

