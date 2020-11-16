import { DocumentNode } from 'graphql';
import { unionBy } from 'lodash-es';
import { action, observable, toJS, makeObservable } from 'mobx';
import { MergeDataOptions, StoreGraphgl } from '../models';

export type IssueLabel = {
  color: string;
  description: string;
  id: string;
  name: string;
  url: string;
};
export class LabelsStore<T = any> extends StoreGraphgl<T> {
  constructor(userStore: any, query: DocumentNode) {
    super(userStore, query);
    makeObservable(this, {
      labelCheck: observable,
      setLabelCheck: action.bound,
    });
  }
  name = 'LabelsStore';
  variables: any = { first: 100 };
  /**
   * 合并数据
   * pageInfo处理
   */
  @action.bound
  mergePageData(newData: any, { isLatest = false }: MergeDataOptions = {}) {
    console.groupCollapsed(`handle data(${this.name})`);
    const labels = newData?.repository?.labels;
    if (labels) {
      const edges = labels.edges ? [...labels.edges] : [];
      const pageInfo = labels.pageInfo;
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
      console.log(labels);
      console.log(edges);
    } else {
      console.error('no new query labels data');
    }
    console.groupEnd();
  }
  @observable labelCheck: any[] = [];

  @action.bound
  setLabelCheck(e: any[]) {
    this.labelCheck = e;
  }
}
