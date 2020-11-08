import { StoreBase } from '@/models';
import { observable, action, computed } from 'mobx';
import { USERINFO, UserData } from './userinfo';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export type UserInfo = UserData;

export type UserRepository = {
  name: string; // 仓库名字
  owner: string; // 仓库拥有者
};
export class UserStore extends StoreBase {
  @observable name = USERINFO;
  @observable key = 'xx-space';
  // 缓存两天
  @observable time = 2 * 24 * 60 * 60;

  constructor() {
    super();
    this.getCache();
    this.setCache();

    this.getSave();
  }

  // 仓库
  @observable userRepository?: UserRepository;

  // 默认配置的token，权限只有查看公共的库。
  @observable token =
    'U2FsdGVkX19B3HPXWKdG/BW8oy5ld+5t4WogKry+ve6B0RWRGtSjQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg==';

  @observable client_id = 'ccf21c3104b11fcd9219';
  @observable client_id_local = '6d1f0f1a67b21e729050'; //  xx-space-local-dev
  /**
   * 登陆用户的用户信息
   */
  @observable
  userData: UserData | SimpleObject = {};
  @observable client: ApolloClient<any> & any;

  @action.bound
  setClient = () => {
    if (!this.token) {
      return;
    }
    const httpLink = new HttpLink({
      uri: 'https://api.github.com/graphql', // 配置请求url
      headers: {
        // 配置header
        Authorization: `Bearer ${this.githubToken}`,
      },
    });
    if (this.client) this.client = null;

    this.client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
    return this.client;
  };
  @computed get githubToken() {
    if (!this.token) {
      //
      return '';
    }
    const decrypted = CryptoJS.AES.decrypt(this.token, this.key);
    const setToken = decrypted.toString(CryptoJS.enc.Utf8); //转化为utf8
    return setToken;
  }
  @action.bound
  setUserData(v: UserData, update = true) {
    this.userData = { ...this.userData, ...v };
    update && this.updateData();
  }

  // 获取缓存信息
  getSave() {
    const data: any = this.data;
    const { userData = {} } = data;
    this.setUserData(userData, false);
  }
  updateData() {
    this.data = {
      ...this.data,
      userData: this.userData,
    };
  }

  @action.bound
  clearUserinfo() {
    this.userData = {};
    this.clearCache();
  }
}
