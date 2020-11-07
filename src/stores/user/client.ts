import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import CryptoJS from 'crypto-js';
// 私有token上传会自动把token无效；所以加密一下啊 解密
// import CryptoJS from 'crypto-js'
// var decrypted = CryptoJS.AES.decrypt(token,key);
// let token = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
const key = 'xx-space';
const token =
  'U2FsdGVkX19B3HPXWKdG/BW8oy5ld+5t4WogKry+ve6B0RWRGtSjQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg=='; // 私有限制权限的token
const owner = 'abearxiong'; // 仓库拥有者
const name = 'abearxiong.github.io'; // 仓库名字
const repositoryId = 'MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE=';
const config = {
  key,
  token,
  owner,
  name,
  repositoryId,
};
const decrypted = CryptoJS.AES.decrypt(config.token, config.key);
const setToken = decrypted.toString(CryptoJS.enc.Utf8); //转化为utf8
//console.log(token)
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql', // 配置请求url
  headers: {
    // 配置header
    Authorization: `Bearer ${setToken}`,
  },
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // 缓存
});
