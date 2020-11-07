import { ReactElement } from 'react';

// 路由配置
type ParentRoute = {
  parentPath: string;
  name: string;
  pathname?: string;
  icon?: (color: string, isChoose?: boolean) => ReactElement;
  children: ChildrenRoute[];
};
type ChildrenRoute = {
  path: string;
  pathname?: string;
  component: any;
  name: string;
  icon?: (color: string, isChoose?: boolean) => ReactElement;
  isSinglePage?: boolean;
  noMenu?: boolean;
  noTab?: boolean;
};
type RouteConfig = ParentRoute | ChildrenRoute;

export { ParentRoute, ChildrenRoute, RouteConfig };
