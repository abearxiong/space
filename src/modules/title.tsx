// 如果新建文章的情况下，如果本地已经有了的话，直接设置
export const newXionTitle = () => {
  /* q = d - 1324 * 24 * 60 * 60
   *  1443365529298 是第一天
   *  Sun Sep 27 2015 22:52:09 GMT+0800 (中国标准时间)
   */
  const now = new Date();
  const show_day = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  const aDay = 24 * 60 * 60 * 1000;
  const manyDay = Math.floor((now.getTime() - 1443365529298) / aDay) + 1; // 往下 取整
  const day = now.getDay();
  const title = `奇幻旅程${manyDay} ${show_day[day]}`;
  return title;
};
