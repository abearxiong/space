import { UploadFile } from 'antd/es/upload/interface';
import { RcFile } from 'antd/lib/upload';
import { parseUrl } from '.';

export type UFile = { response?: string } & RcFile;
// 上传图片表单处理方法  序列化为列表
export type NormFile = {
  file: UFile;
  fileList: UFile[];
};
// 序列化显示的是RcFile类型
const normFile = (e: NormFile | any[]) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
export const normImg = (e: NormFile) => {
  if (e.fileList.length >= 1) {
    // return e.fileList.map(v => v.response).join(' ');
    return e.fileList.map((v: any) => parseUrl(v.response, true)).join(' ');
  } else if (e.fileList.length === 0) {
    return '';
  }
  const picUrl = e.file.response;
  return picUrl;
};
const imgLimit = (_min = 0, max: number) => {
  return (rule: any, value: any) => {
    // 序列化图片为字符串，但是预览显示不好
    if (typeof value === 'string') {
      if (!value) return Promise.resolve();
      const len = value.split(' ').length;
      if (len > max) {
        return Promise.reject(`最多上传${max}张`);
      }
      if (len < _min) {
        return Promise.reject(`至少上传${_min}张`);
      }
      return Promise.resolve();
    }
    if (value?.[0]?.status === 'uploading') {
      return Promise.resolve();
    }
    const len = value && value.filter((v: any) => v.status === 'done').length;
    if (len > max) {
      return Promise.reject(`最多上传${max}张`);
    }
    if (len < _min) {
      return Promise.reject(`至少上传${_min}张`);
    }
    return Promise.resolve();
  };
};
// 上传图片限制
const ruleImgLimit = (_min = 0, max: number) => {
  return { validator: imgLimit(_min, max) };
};

// 图片上传之前 处理函数
// 本身 beforeUpload = (file: File, fileList: FileList) => any;
const beforeUpload = (file: File, maxSize = 10): Promise<any> => {
  const m = 1024 * 1024;
  const isLimit = file.size / m < maxSize;
  if (!isLimit) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};
//  图片预览 新窗口
const onPreview = async (file: UploadFile | string) => {
  console.log('file', file);
  let src: any;
  if (typeof file === 'string') {
    src = file;
  } else {
    src = (file as UploadFile).url ?? '';
  }
  if (!src) {
    const originFIleObj: any = (file as UploadFile).originFileObj;
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(originFIleObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open();
  imgWindow && imgWindow.document.write(image.outerHTML);
};

export const onDownloadPng = async (src: string, name: string) => {
  if (!src) return;
  fetch(src).then((res) => {
    if (res.status === 200) {
      const a = document.createElement('a');
      const url = res.url;
      const filename = `${name}.png`;
      a.href = url;
      a.download = filename;
      a.click();
    } else {
      alert('You have no permission to download the file!');
    }
  });
  // const image = new Image();
  // image.src = src;
  // const a = document.createElement('a');
  // const url = window.URL.createObjectURL(blob);
  // const filename = 'myfile.zip';
  // a.href = url;
  // a.download = filename;
  // a.click();
  // window.URL.revokeObjectURL(url);
};
export { normFile, beforeUpload, ruleImgLimit, onPreview };

/**
 * axios.get(url, { responseType: 'blob', params });
 * @param fileName 文件名
 * @param blob 文件流
 */
export const downloadExcell = (res: any, fileName = 'download.xls') => {
  const disposition = res.headers['content-disposition'];
  if (disposition) {
    fileName = decodeURI(
      disposition.substring(
        disposition.indexOf('filename') + 22,
        disposition.length,
      ),
    );
  }
  const elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  elink.href = URL.createObjectURL(res.data);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
};

export const downloadBlob = (blob: Blob, fileName = 'download.xls') => {
  const elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
};
