import { LOGIN_USER } from './../../graphql/user/LOGIN_USER';
import { message } from 'antd';
import { StoreBase } from '@/models';
import { observable, action, makeObservable, computed } from 'mobx';
import { USERINFO, UserData } from './userinfo';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import CryptoJS from 'crypto-js';
// const CryptoJS = require('crypto-js');
import { encrypt, decrypt } from '@/utils/crypto';
import { unionBy } from 'lodash-es';
import { GithubToken } from 'think-space-oauth';
import { history } from '@/utils';
// 默认配置的token，权限只有查看公共的库。
// 个人的token，登录更改
// sxiongxiao
// aOTlkW6kabeSzhohDeKAZJz/HT9Ws7/MordiD83KYAK6ijOsaLMDXnzo2YmAEhNN
// abearxiong
// bt1247BD3B5C3UHkZQlzSDHN5IAIPPg1WpdOFvlfRhS/Mu1A5Ozn1x6xeRiKOymI
const defaultToken =
  'aOTlkW6kabeSzhohDeKAZJz/HT9Ws7/MordiD83KYAK6ijOsaLMDXnzo2YmAEhNN';

export type UserInfo = UserData;
export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: false;
  startCursor: string;
  [key: string]: any;
};
export type SpaceData = {
  node: {
    id: string;
  } & SimpleObject;
};
/**
 * name 仓库名字
 * owner 仓库拥有者
 */
export type UserRepository = {
  name: string; // 仓库名字
  owner: string; // 仓库拥有者
  canWrite: boolean; // 能否写入
} & SimpleObject;

const userRepository: UserRepository = {
  owner: 'abearxiong', // 仓库拥有者
  name: 'abearxiong.github.io', // 仓库名字
  repositoryId: 'MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE=',
  canWrite: true,
};
export class UserStore extends StoreBase {
  @observable name = USERINFO;
  @observable key = 'xx-space';
  @observable time = 365 * 24 * 60 * 60;

  constructor() {
    super();
    this.getCache();

    this.getSave();

    this.connect();

    this.setCache();
    makeObservable(this, {
      userRepository: observable,
      setUserRepository: action.bound,
      // pageInfo: observable,
      userData: observable,
      isShowSetting: observable,
      setIsShowSetting: action.bound,
    });
    // makeObservable(this);
  }

  @observable token = defaultToken;

  @observable client_id = 'ccf21c3104b11fcd9219';
  @observable client_id_local = '6d1f0f1a67b21e729050'; //  xx-space-local-dev
  // @observable client_sercret = ''
  @action.bound
  postCode(login = false) {
    let client_id;
    if (location.href.match(/localhost/)) {
      client_id = this.client_id_local;
    } else {
      client_id = this.client_id;
    }
    // client_id = this.client_id;
    const a = GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
      useQueryUrl: true,
      client_id,
    });
    if (login) {
      a.logout();
    }
    const isNext = a.isNext();
    if (isNext || login) {
      a.auto().then((res) => {
        const token = a.getToken();
        if (token) {
          this.setToken(token);
          message.success('登录成功');
          setTimeout(() => {
            //uitls的需要绑定 createHistory
            history.push('/space/');
          }, 2000);
        } else {
          // this.postCode();
          if (isNext) {
            message.error('登录失败，请重新登陆');
            setTimeout(() => {
              history.push('/space/');
            }, 3000);
          }
        }
      });
    }
  }

  /**1
   * 登陆用户的用户信息
   */
  @observable userData: UserData | SimpleObject = {};
  isShowSetting = false;
  setIsShowSetting(v: boolean) {
    this.isShowSetting = v;
  }
  @observable client: ApolloClient<any> | undefined;
  @computed get variables() {
    return {
      ...this.userRepository,
    };
  }
  /** 连接client
   * 设置client
   */
  @action.bound
  connect = () => {
    this.setClient();
  };
  @action.bound
  setClient = () => {
    if (!this.token) {
      return;
    }
    const githubToken = this.githubToken();
    const httpLink = new HttpLink({
      uri: 'https://api.github.com/graphql', // 配置请求url
      headers: {
        // 配置header
        Authorization: `Bearer ${githubToken}`,
      },
    });
    if (this.client) this.client = undefined;

    this.client = new ApolloClient({
      link: httpLink,
      // cache: new InMemoryCache(),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              project: {
                merge(existing, incoming) {
                  // return incoming;
                  return { ...existing, ...incoming };
                },
              },
            },
          },
          Repository: {
            fields: {
              issues: {
                merge(existing, incoming) {
                  if (!existing) return incoming;
                  console.log('existing', existing);
                  console.log('incoming', incoming);
                  const edges = incoming.edges ? [...incoming.edges] : [];
                  // const pageInfo = incoming.pageInfo;
                  // if (pageInfo && !isLatest) this.pageInfo = pageInfo;

                  if (edges) {
                    let pageData = [...existing.edges];
                    if (pageData.length === 0) {
                      pageData = edges;
                    } else {
                      const newEdges = unionBy(
                        edges.reverse(),
                        pageData.reverse(),
                        'node.id',
                      );
                      pageData = newEdges.reverse();
                    }
                    return { ...incoming, edges: pageData };
                  }
                  return incoming;
                },
              },
            },
            // keyFields: ['id'],
          },
        },
      }),
    });
    this.client
      .query({
        query: LOGIN_USER,
      })
      .then((res) => {
        if (res.data && res.data.viewer) {
          this.userData = res.data.viewer;
        }
      });
    return this.client;
  };
  @action.bound
  githubToken() {
    if (!this.token) {
      //
      return '';
    }
    const setToken = decrypt(this.token, this.key);
    // return '86c5916da4c66dc5108797bff15a5c27ca65fb2c';
    // console.log(encrypt('86c5916da4c66dc5108797bff15a5c27ca65fb2c', this.key));
    return setToken;
  }
  @action.bound
  setToken(token: string) {
    this.token = encrypt(token, this.key);
    this.updateData();
    // token 更新重新连接
    this.connect();
  }
  @computed get GithubToken() {
    return decrypt(this.token, this.key);
  }
  @action.bound
  setUserData(v: UserData, update = true) {
    this.userData = { ...this.userData, ...v };
    update && this.updateData();
  }

  // 获取缓存信息
  @action.bound
  getSave() {
    const data: any = this.data;
    const { userData = {}, userRepository, token } = data;
    this.setUserData(userData, false);
    if (userRepository) {
      this.setUserRepository(userRepository, false);
    }
    if (token) {
      this.token = encrypt(token, this.key);
    }
  }
  // 更新本地的信息进缓存当中
  @action.bound
  updateData(v: any = {}) {
    this.data = {
      ...this.data,
      userData: this.userData,
      userRepository: this.userRepository,
      token: decrypt(this.token, this.key),
      ...v,
    };
  }

  // 清除用户信息
  @action.bound
  clearUserinfo() {
    this.userData = {};
    this.setToken(decrypt(defaultToken, this.key));
    this.userRepository = userRepository;
    this.clearCache();
  }

  // 显示仓库信息
  // 仓库名字
  userRepository: UserRepository = userRepository;
  setUserRepository(v: any, update = true) {
    this.userRepository = { ...userRepository, ...v };
    update && this.updateData();
  }
}
