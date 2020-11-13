import { message } from 'antd';
import { PageInfo } from './user/store';
import { StoreBase } from '@/models';
import { UserStore } from '@/stores';
import { action, makeObservable, observable, toJS } from 'mobx';
import { DocumentNode } from '@apollo/client';
import { unionBy } from 'lodash-es';

export type MergeDataOptions = {
  isLatest?: boolean;
};
export type PageOptions = {
  isLatest: boolean;
};
class StoreGraphgl<T = any, V = any> extends StoreBase<V> {
  userStore: UserStore;
  query: DocumentNode;

  loading?: boolean;
  networkStatus?: any;
  pageInfo?: PageInfo;
  // @observable pageData: T[] = [];
  pageData: T[] = [];
  variables: any = { first: 10 };

  constructor(userStore: any, query: DocumentNode) {
    super();
    this.userStore = userStore;
    this.query = query;
    makeObservable(this, {
      pageData: observable,
    });
  }
  @action.bound
  setPageInfo(pageInfo: any) {
    this.pageInfo = { ...this.pageInfo, ...pageInfo };
  }
  @action.bound
  setVariables(variables?: any | PageInfo) {
    const newVariables: any = {
      ...this.userStore.userRepository,
      ...this.variables,
      ...variables,
    };
    console.log('variable', variables);
    if (variables && (variables as PageInfo).endCursor) {
      newVariables.after = (variables as PageInfo).endCursor;
    }
    if (!variables && this.pageInfo) {
      const after = this.pageInfo?.endCursor;
      if (after) {
        newVariables.after = (variables as PageInfo).endCursor;
      }
    }
    this.variables = newVariables;

    return newVariables;
  }
  @action.bound
  getNextPage() {
    if (this.pageInfo && this.pageInfo.hasNextPage) {
      this.setVariables(toJS(this.pageInfo));
      this.getPageData();
    } else if (this.pageInfo) {
      message.info('no more');
    }
  }
  // 其他方式合并
  setPageData(pageData: any) {
    this.pageData = pageData;
  }

  // 获取数据
  @action.bound
  async getPageData(pageOptions?: PageOptions) {
    const variables = this.setVariables(this.userStore.userRepository);
    const client = this.userStore.client;
    if (client) {
      const { loading, data, networkStatus } = await client.query({
        query: this.query,
        variables,
      });
      this.loading = loading;
      this.networkStatus = networkStatus;
      this.mergePageData(data, pageOptions);
    } else {
      console.error('client失效');
    }
  }
  /**
   * 合并数据
   * pageInfo处理
   */
  @action.bound
  mergePageData(newData: any, { isLatest = false }: MergeDataOptions = {}) {
    console.groupCollapsed(`handle data(${this.name})`);
    const issues = newData?.repository?.issues;
    if (issues) {
      const edges = issues.edges ? [...issues.edges] : [];
      const pageInfo = issues.pageInfo;
      if (pageInfo && !isLatest) this.pageInfo = pageInfo;

      if (edges) {
        const pageData = [...toJS(this.pageData)];
        if (pageData.length === 0) {
          this.pageData = edges;
        } else {
          const newEdges = unionBy(
            edges.reverse(),
            pageData.reverse(),
            'node.id',
          );
          this.pageData = newEdges.reverse();
        }
      } else {
        console.error('no new query edges data');
      }
      console.log('new Data', newData);
      console.log(issues);
      console.log(edges);
    } else {
      console.error('no new query issues data');
    }
    console.groupEnd();
  }
}
export { StoreGraphgl };
