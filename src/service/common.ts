import { Config, Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { KEYUTIL, KJUR } from 'jsrsasign';
// import {
//   generateKeyPairSync,
//   publicEncrypt,
//   privateDecrypt,
//   privateEncrypt,
//   publicDecrypt,
//   createSign,
//   createVerify,
//   createHash
// } from 'crypto';
// import { RedisService } from '@midwayjs/redis';
// import { Op } from 'sequelize';
// import { Base } from '../model/Base';
// const { customAlphabet } = require('nanoid')
// import { RedisServiceFactory } from '@midwayjs/redis';
// import { ISpace } from '../interface';
// import STATUS_CODE from '../constant/STATUS_CODE';
// const passphrase = ''

@Provide()
export class CommonService {
  @Inject()
  redisService: RedisService;
  @Config('statusCode')
  statusCode;

  getPageHandler(pageSize, currentPage) {
    return ds => {
      const rows = ds.rows.map(d => d.toJSON());
      const { count } = ds;
      const totalPages = Math.ceil(count / pageSize);
      return { rows, count, currentPage, totalPages };
    };
  }
  /**
   * MD5压缩数据
   * @param data 待压缩数据
   * @returns 压缩数据
   */
  md5(data): string {
    const md5 = new KJUR.crypto.MessageDigest({ alg: 'md5', prov: 'cryptojs' });
    md5.updateString(data);
    return md5.digest();
    // // 创建一个hash对象
    // const md5 = createHash('md5');
    // // 往hash对象中添加摘要内容
    // md5.update(data);
    // // 使用 digest 方法输出摘要内容，不使用编码格式的参数 其输出的是一个Buffer对象
    // // 使用编码格式的参数，输出的是一个字符串格式的摘要内容
    // return md5.digest('hex');
  }
  getKeyPair(): { publicKey: string; privateKey: string } {
    const rsaKeypair = KEYUTIL.generateKeypair('RSA', 2048);
    const privateKey = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS8PRV');
    const publicKey = KEYUTIL.getPEM(rsaKeypair.pubKeyObj);
    return { publicKey, privateKey };
  }
  /**
   * 私钥解密
   * @param encryptData 密文
   * @param privateKey 私钥
   * @returns
   */
  getPrivateDecryptData(encryptData: string, privateKey: string): string {
    const prv = KEYUTIL.getKey(privateKey);
    return KJUR.crypto.Cipher.decrypt(encryptData, prv, 'RSA');
  }

  // getKeyPair(): { publicKey: string, privateKey: string } {
  //   // publicKey, privateKey
  //   return generateKeyPairSync('rsa', {
  //     modulusLength: 2048,
  //     publicKeyEncoding: {
  //       type: 'spki',
  //       format: 'pem'
  //     },
  //     privateKeyEncoding: {
  //       type: 'pkcs8',
  //       format: 'pem',
  //       cipher: 'aes-256-cbc', // 签名不能用
  //       passphrase // 签名不能用
  //     }
  //   })
  // }
  // /**
  //  * 公钥加密
  //  * @param data 待加密数据
  //  * @param publicKey 公钥
  //  * @returns {string} 密文
  //  */
  // getPublicEncryptData(data: string, publicKey: string): string {
  //   return publicEncrypt({
  //     key: publicKey,
  //   }, Buffer.from(data)).toString('base64')
  // }
  // /**
  //  * 私钥解密
  //  * @param encryptData 密文
  //  * @param privateKey 私钥
  //  * @returns
  //  */
  // getPrivateDecryptData(encryptData: string, privateKey: string): string {
  //   return privateDecrypt({
  //     key: privateKey,
  //     passphrase
  //   }, Buffer.from(encryptData, 'base64')).toString()
  // }
  // /**
  //  * 私钥加密
  //  * @param data 待加密数据
  //  * @param privateKey 私钥
  //  * @returns
  //  */
  // getPrivateEncryptData(data: string, privateKey: string): string {
  //   return privateEncrypt({
  //     key: privateKey,
  //     passphrase
  //   }, Buffer.from(data)).toString('base64')
  // }
  // /**
  //  * 公钥解密
  //  * @param privateEncryptData 私钥加密数据
  //  * @param publicKey 公钥
  //  * @returns
  //  */
  // getPublicDecryptData(privateEncryptData: string, publicKey: string): string {
  //   return publicDecrypt({
  //     key: publicKey,
  //   }, Buffer.from(privateEncryptData, 'base64')).toString('base64')
  // }
  // /**
  //  * 获取签名数据
  //  * @param data 待签名数据
  //  * @param privateKey 私钥
  //  * @returns 签名数据
  //  */
  // getSignData(data: string, privateKey: string): string {
  //   const sign = createSign('RSA-SHA256') // 创建签名算法
  //   sign.update(data) // 更新待签名内容
  //   return sign.sign(privateKey, 'hex') // 生成并返回签名
  // }
  // getVerify(signData: string, publicKey: string): boolean {
  //   const verify = createVerify('RSA-SHA256') // 创建验证算法
  //   verify.update('data to sign')
  //   return verify.verify(publicKey, signData, 'hex');
  // }
}
