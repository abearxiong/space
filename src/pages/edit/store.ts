import { observable } from 'mobx';
import { StoreBase } from '@/models/store-model';
import React from 'react';

/**
 * Store举例，按使用要求删除其他
 */
class EditStore<T = any> extends StoreBase<T> {
  @observable name = 'Edit';
  Storage = sessionStorage;
  constructor() {
    super();
    console.log('EditStore', this.SaveName, this.Storage);
    // 获取缓存到数据到data
    this.getCache();
    // setCache会自动缓存data的数据到Storage对应到位置，localStorage或者sessionStorage
    this.setCache();
  }
  //  函数的name和缓存数据相关，为类store的唯一性，尽量设置，name，当相同类型当时候，设置key进行区分
  //  其他详细信息看StorePage类
}

const StoresContext = React.createContext({
  editStore: new EditStore(),
});
export const useStore = () => React.useContext(StoresContext);
