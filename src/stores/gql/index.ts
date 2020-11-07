import { StoreBase } from '@/models';
import { observable, action } from 'mobx';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export class GqlStore extends StoreBase {
  @observable name = 'GqlStore';
  @observable key = '';
  // 缓存两天
  @observable time = 2 * 24 * 60 * 60;
  @observable client: ApolloClient<any> & any;

  @action.bound
  getClient = (token: string) => {
    const httpLink = new HttpLink({
      uri: 'https://api.github.com/graphql', // 配置请求url
      headers: {
        // 配置header
        Authorization: `Bearer ${token}`,
      },
    });
    if (this.client) this.client = null;

    this.client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  };
}
