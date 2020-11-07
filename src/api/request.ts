import axios, { AxiosRequestConfig } from 'axios';

import { message } from 'antd';
import { useThrottle } from 'ahooks';

// const env = process.env.ENV ?? 'development';
// export const isMock = !!process?.env?.MOCK;
const isMock = false;
const baseURL = isMock ? '' : '/api';

// console.log('isMock', isMock, process?.env?.MOCK, 'process', process?.env);
export const baseURlMerge = (url: string) => {
  return baseURL + url;
};
const headers: any = {
  'Content-Type': 'application/json',
};

const instance = axios.create({
  headers,
  timeout: 0,
  baseURL,
});
const history = {
  push: (url: string) => {
    window.location.href = url;
  },
};
instance.interceptors.request.use(
  (config) => {
    const headers = config.headers;
    // 添加 token 请求头
    const token = 'getUserinfo().token';
    token && (headers['Authorization'] = token);

    return config;
  },
  (error) => {
    console.groupCollapsed('request error');
    console.error(error);
    console.groupEnd();
    message.error(error.msg || '请求错误,请重试');
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    const {
      config: { url },
    } = response;
    const { data } = response;
    console.groupCollapsed(`res: ${url}`);
    console.error('data', data);
    console.groupEnd();
    //没有code或code错误
    if (data.code !== 0 && data.code !== 1) {
      if (data.code) {
        message.error(data.msg || '服务端错误,请重试');
        throw data.code;
      }
    }
    return data;
  },
  (error) => {
    if (!isNaN(error)) {
      Promise.reject(error);
    }
    console.groupCollapsed('response error');
    console.log(error);
    const { response } = error;
    console.log('response', response);

    if (response?.status == 401) {
      message.error('请重新登录！');
      useThrottle(
        () => {
          history.push('/login');
        },
        { wait: 300 },
      );
    } else if (response?.status === 403) {
      message.error('没有权限,禁止请求');
    } else {
      message.error(error.msg || '网络错误,请稍后再试');
    }
    console.groupEnd();
    const errCode = response?.status;
    return Promise.reject(errCode);
  },
);

export { instance };

// 浏览器请求错误，可能是服务器或者404，让react开发不报错
const errBrowerCode = [403, 404, 500];
// 错误抓取
const errHandle = (code: number | string) => {
  // console.log('err-code', code);
  // throw code;
  if (typeof code === 'string') {
    const s: any = code;
    if (isNaN(s)) {
      throw code;
    }
  }
  const c = Number(code);
  const isErrBrower = errBrowerCode.includes(c);
  if (!isErrBrower) {
    throw c;
  }
  return;
};
// 因为很多内容都是通用，数据请求一般都是类似的形式，进行对应处理化，减少重复代码
const get = (url: string, requestConfig: AxiosRequestConfig | any = {}) =>
  instance.get(url, { ...requestConfig }).catch((err) => errHandle(err));
const post = (url: string, requestConfig: AxiosRequestConfig | any = {}) =>
  instance.post(url, { ...requestConfig }).catch((err) => errHandle(err));
const deleteApi = (url: string, requestConfig: AxiosRequestConfig | any = {}) =>
  instance.delete(url, { ...requestConfig }).catch((err) => errHandle(err));
const put = (url: string, requestConfig: AxiosRequestConfig | any = {}) =>
  instance.put(url, { ...requestConfig }).catch((err) => errHandle(err));
export { baseURL, get, post, deleteApi, put };
