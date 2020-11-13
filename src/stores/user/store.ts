import { message } from 'antd';
import { StoreBase } from '@/models';
import { observable, action, makeObservable } from 'mobx';
import { USERINFO, UserData } from './userinfo';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import CryptoJS from 'crypto-js';
// const CryptoJS = require('crypto-js');
import { encrypt, decrypt } from '@/utils/crypto';
import { unionBy } from 'lodash-es';

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
} & SimpleObject;

const userRepository: UserRepository = {
  owner: 'abearxiong', // 仓库拥有者
  name: 'abearxiong.github.io', // 仓库名字
  repositoryId: 'MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE=',
};
export class UserStore extends StoreBase {
  @observable name = USERINFO;
  @observable key = 'xx-space';
  // 缓存两天
  @observable time = 2 * 24 * 60 * 60;

  constructor() {
    super();
    this.getCache();
    this.getSave();
    this.connect();
    this.setCache();
    makeObservable(this, {
      spaceDatas: observable,
      setSpaceDatas: action.bound,
      userRepository: observable,
      // pageInfo: observable,
      // note信息
      note: observable,
      setNote: action.bound,
    });
    // makeObservable(this);
  }

  // 默认配置的token，权限只有查看公共的库。
  // 个人的token，登录更改
  @observable token =
    'bt1247BD3B5C3UHkZQlzSDHN5IAIPPg1WpdOFvlfRhS/Mu1A5Ozn1x6xeRiKOymI';

  @observable client_id = 'ccf21c3104b11fcd9219';
  @observable client_id_local = '6d1f0f1a67b21e729050'; //  xx-space-local-dev
  /**1
   * 登陆用户的用户信息
   */
  @observable
  userData: UserData | SimpleObject = {};
  @observable client: ApolloClient<any> | undefined;
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
  // 更新本地的信息进缓存当中
  updateData(v: any = {}) {
    this.data = {
      ...this.data,
      userData: this.userData,
      ...v,
    };
  }

  // 清除用户信息
  @action.bound
  clearUserinfo() {
    this.userData = {};
    this.clearCache();
  }
  /**
   * 处理用户获取的库的数据
   * @type {any[]}
   * @memberof UserStore
   */
  spaceDatas: SpaceData[] = [];
  @observable spacePageInfo?: PageInfo;
  @observable spaceVariables: any;

  // 仓库名字
  userRepository: UserRepository = userRepository;

  setSpaceDatas(data: any) {
    if (!data) {
      message.error('获取数据错误');
    }
    const issues = data?.repository?.issues ?? {};
    const edges = issues.edges ?? [];
    const pageInfo = issues.pageInfo;
    if (pageInfo) this.spacePageInfo = pageInfo;

    this.mergeSpaceData(edges);
    console.groupCollapsed('handle data');
    console.log(data);
    console.log(issues);
    console.log(edges);
    console.groupEnd();
  }
  @action.bound
  clearSpaceDatas() {
    this.spaceDatas = [];
  }
  @action.bound
  mergeSpaceData(up?: any[]) {
    if (!up) return;
    const spaceData = this.spaceDatas;
    if (spaceData.length === 0) {
      this.spaceDatas = up;
      return;
    }
    const newData = unionBy(up.reverse(), spaceData.reverse(), 'node.id');
    this.spaceDatas = newData.reverse();
  }
  @action.bound
  setSpaceVariables(variables: any = {}) {
    this.spaceVariables = {
      ...this.userRepository,
      ...variables,
    };
  }
  // 保存的编辑器的信息
  note: SimpleObject = {
    title: '',
    text: '',
  };
  // 设置编辑器内容
  setNote({ title, text, ...rest }: SimpleObject) {
    title = title ?? this.note.title;
    text = text ?? this.note.text;
    this.note = { ...this.note, title, text, ...rest };
  }
}
