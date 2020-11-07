import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;

export { history };

/**
 * 转到其他页面
 *
 * open(
 *  url?: string | undefined,
 *  target?: string | undefined,
 *  features?: string | undefined,
 *  replace?: boolean | undefined
 * ): Window | null
 *
 * @param url 地址url，https
 */
const toUrl = (url: string, ...options: any[]) => {
  window.open(url, ...options);
};

export { toUrl };
