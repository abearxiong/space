const DEFAULTCACHENAME = 'CACHE_NAME';
enum StorageEnum {
  LOCAL,
  SESSION,
}
const FormCache = {
  Storage(flag = StorageEnum.LOCAL) {
    switch (flag) {
      case StorageEnum.LOCAL:
        return localStorage;
      case StorageEnum.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  },
  set: (
    params: SimpleObject = {},
    name = DEFAULTCACHENAME,
    storage = localStorage,
    time: number = 60 * 60,
  ) => {
    if (!params) return;
    // time 缓存有效时间为一个小时
    const endDate = new Date().valueOf() + time * 1000;
    params.localUpdateTime = endDate;
    const str = JSON.stringify(params);
    storage.setItem(name, str);
  },
  get: (name = DEFAULTCACHENAME, storage = localStorage) => {
    const str = storage.getItem(name);
    if (!str) return;
    // console.log('str', str);
    try {
      const parseJson = JSON.parse(str);
      const localUpdateTime = parseJson?.localUpdateTime ?? '';
      if (localUpdateTime) {
        if (new Date().valueOf() > Number(localUpdateTime)) {
          // 当前时间大于有效时间就是有问题，清除
          FormCache.clear(name, storage);
          return null;
        }
      }
      delete parseJson['localUpdateTime'];
      return parseJson;
    } catch {
      return null;
    }
  },
  clear: (name = DEFAULTCACHENAME, storage = localStorage) => {
    storage.removeItem(name);
  },
};

export { FormCache };
window.cache = FormCache;
