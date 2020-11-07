// 处理url格式化
const parseUrl = (url: string | undefined, setHttps = false) => {
  if (!url) return '';
  const http = 'http://';
  const https = 'https://';

  const isHttp = url.startsWith(http);
  const isHttps = url.startsWith(https);
  const hasHttp = isHttp || isHttps;
  const urlHead = setHttps ? https : http;
  if (hasHttp) {
    if ((setHttps && isHttps) || (!setHttps && isHttp)) return url;

    if (setHttps && isHttp) return url.replace(http, https);
    if (!setHttps && isHttps) return url.replace(https, http);
  }
  return `${urlHead}${url}`;
};
export { parseUrl };
