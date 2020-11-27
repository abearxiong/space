import { Paging, PagingForm } from '@/models';
import { FormCache } from '@/utils';
import {
  observable,
  action,
  computed,
  autorun,
  toJS,
  makeObservable,
  // makeObservable,
} from 'mobx';

// TODO: 浏览器窗口，部分toJS获取数据，以后删除
window.toJS = toJS;
/**
 * StoreBase
 * 如果要开启缓存，在constructor开启
 *  this.getCache();
 *  this.setCache();
 * 或者，自己手动调用配置
 */
class StoreBase<T = any> {
  name = 'StoreBase';
  // KEY的作用是对那些唯一化路由处理，比如路由页面/:id不同的
  // 如果没有不同，一般默认值即可
  key = 'KEY';
  Storage = localStorage;
  time = 60 * 60;
  // 缓存当前页面数据
  @observable data: SimpleObject | T = {};

  constructor() {
    // 第一次获取，同时更新获取时间
    if (this.name !== 'StoreBase') {
      // the autocache must handle in children
      this.getCache();
      this.setCache();
    }
    makeObservable(this, {
      data: observable,
      setData: action.bound,
    });
    // console.log('storeBase constructor', this.SaveName);
  }
  /**
   *
   * @param data
   * @param options: isSet=true是直接覆盖
   */
  @action.bound
  setData(data: any, { isSet = false }: any = {}) {
    if (isSet) {
      this.data = data;
    } else {
      if (this.data) {
        this.data = { ...this.data, ...data };
      } else {
        this.data = data;
      }
    }
  }
  @computed get dataToString() {
    return JSON.stringify(this.data);
  }
  @observable dispose: () => any = () => false;
  // 自动缓存
  autoCache = () => {
    // console.groupCollapsed(this.SaveName + ' cache ' + this.name);
    // console.log('cacheData', this.SaveName, this.data);
    // console.log('data', toJS(this.data));
    // console.groupEnd();
    const data = toJS(this.data);
    // Object.keys(data as object);
    data && FormCache.set(data, this.SaveName, this.Storage, this.time);
  };
  // 刷新后获取cache 如果需有其他 覆盖
  getCache = () => {
    this.data = FormCache.get(this.SaveName, this.Storage) ?? {};
    // console.log('this.getCache', this.data, toJS(this.data));
    return this.data;
  };
  // 设定缓存
  setCache = () => {
    // console.log('this.dispose', this.dispose);
    // this.dispose && this.dispose();
    this.dispose = autorun(() => {
      this.autoCache();
    });
  };
  // 取消缓存
  cancelCache = () => {
    // 如果具有自动缓存，取消缓存
    this.dispose && this.dispose();
    this.dispose = () => false;
  };
  // 清除缓存
  clearCache = () => {
    this.data = {};
    FormCache.clear(this.SaveName, this.Storage);
  };
  @computed get SaveName() {
    return this.name + this.key;
  }
}
/**
 * StorePage
 * 功能
 * 1. 举例:有表格的页面元素
 * 2. 使用作为，默认设定的store（主页，具有表单的）
 * 不具备多个附加类型，孩子页面，使用的表单类型，但是类型类似
 * ----
 * 思考多个数据类型，组件类型应用，建议StorePage
 * 注意： 根据不同的页面，如果有多个的话，建议，多类型处理
 * ------
 */
class StorePage<T = any, S = SimpleObject, V = any> extends StoreBase<V> {
  name = 'StorePage';
  key = 'KEY';
  /**
   * 分页数据
   */
  @observable
  pageData: Paging<T> = {
    list: [],
  };
  /**
   * 表单数据, 默认为空，refresh会更新（不空）
   */
  @observable
  formData: PagingForm<S> | PagingForm<SimpleObject> | undefined = undefined;
  /**
   * 更新表单
   */
  @action.bound
  refresh() {
    if (this.formData) {
      this.formData = { ...this.formData };
    } else {
      this.formData = {};
    }
  }
  @action.bound
  setPageData(payload: any) {
    this.pageData = payload;
  }
  @action.bound
  defaultPageData() {
    if (this.pageData.list.length > 0) this.pageData = { list: [] };
  }
  @action.bound
  setFormData(payload: any, { isSet = false }: any = {}) {
    if (isSet) {
      this.formData = payload;
      return;
    }
    const formData = this.formData;
    this.formData = { ...formData, ...payload };
  }
  @action.bound
  defaultFormData() {
    this.formData = undefined;
  }
}

export { StoreBase, StorePage };
