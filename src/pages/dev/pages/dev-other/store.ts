import { observable } from 'mobx';
import { StoreBase, StorePage } from '@/models/store-model';
import React from 'react';

/**
 * Store举例，按使用要求删除其他
 */
class DevOtherStore<T = any> extends StoreBase<T> {
  @observable name = 'DevOther';
  Storage = sessionStorage;
  constructor() {
    super();
    console.log('DevOtherStore', this.SaveName, this.Storage);
    // 获取缓存到数据到data
    this.getCache();
    // setCache会自动缓存data的数据到Storage对应到位置，localStorage或者sessionStorage
    this.setCache();
  }
  //  函数的name和缓存数据相关，为类store的唯一性，尽量设置，name，当相同类型当时候，设置key进行区分
  //  其他详细信息看StorePage类
}

class DevOtherPageStore<T = any, S = any> extends StorePage<T, S> {
  @observable name = 'DevOtherPage';
  // 根据分页数据获取
  //  默认formData和pageData，类型与T和S有关
  //  默认refresh刷新formData
  //  若要缓存数据改数据data，并开启缓存
  //  其他详细信息看StorePage类
}

const StoresContext = React.createContext({
  devOtherStore: new DevOtherStore(),
  devOtherPageStore: new DevOtherPageStore(),
});
export const useStore = () => React.useContext(StoresContext);
