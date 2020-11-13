import React, { Suspense, ReactNodeArray } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
import { ParentRoute, ChildrenRoute, RouteConfig } from '@/models';

import { HomeRoute } from '../pages/home';
import { UserRoutes } from '../pages/user';
import { EditRoute } from '../pages/edit';

// 所有路由，父子路由并存
let allRoute: RouteConfig[] = [];
// 路径数组，深层递归， 为数组，全是子路由
const allPathRoute: PathRoute[] = [];
// 根据path路径，path为key，路由为value 为对象
const allRouteName: SimpleObject = {};

// 单页面路由
const SigleRoute: ReactNodeArray = [];
const SigleRouteName: PathRoute[] = [];

allRoute = allRoute.concat([HomeRoute, ...UserRoutes, EditRoute]);

export type PathRoute = RouteConfig & {
  noTab?: boolean;
  isSinglePage?: boolean;
  pathname: string;
};
const DeepRoute = (r: ParentRoute | ChildrenRoute, path: string) => {
  if ((r as ParentRoute).parentPath) {
    const parent = r as ParentRoute;
    for (const i in parent.children) {
      DeepRoute(parent.children[i], path + parent.parentPath);
    }
  } else {
    const child = r as ChildrenRoute;
    child.pathname = path + child.path;
    allPathRoute.push(child as PathRoute);
  }
};
Array.from(allRoute).forEach((item) => {
  if ((item as ParentRoute).parentPath) {
    const parent = item as ParentRoute;
    // 第一次递归
    DeepRoute(parent, '');
  } else {
    item.pathname = (item as ChildrenRoute).path;
    allPathRoute.push(item as PathRoute);
  }
});
// ===========================================================
// 不可以包含在tab的路径 name数组
const pathCantInTab: any[] = [];
// console.log('pathCantInTab', pathCantInTab);

// 单页面的路径
const pathIsSinglePage: any[] = [];
// ===========================================================
export const SinglePageRoutes: ChildrenRoute[] = [];

// 路径的名字，并打印出来，根据typescript进行类型推断
// 保存url路径
let kv: SimpleObject = {};
allPathRoute.forEach((item) => {
  const pathname = item.pathname;
  let c: SimpleObject = {};
  if (pathname === '/') {
    c = { HOME: pathname };
  } else {
    c[pathname?.replace(/\//g, '').toUpperCase()] = pathname;
  }
  kv = { ...kv, ...c };
  pathCantInTab.includes(item.name) && (item.noTab = true);
  pathIsSinglePage.includes(item.name) && (item.isSinglePage = true);
  pathname && (allRouteName[pathname] = item);
});

// IMPORTANT: 这里打印具体的值
console.groupCollapsed('urlFront');
console.log(JSON.stringify(kv));
console.groupEnd();
export const urlPath = {
  ...kv,
};
// 路由渲染方法--渲染layout包含的页面
const renderRoutes = (): ReactNodeArray => {
  const res: ReactNodeArray = [];
  allPathRoute.map((v) => {
    if (!v.isSinglePage) {
      res.push(
        <Route
          key={v.pathname}
          path={`${v.pathname}`}
          component={(v as ChildrenRoute).component}
          exact={true}
        />,
      );
    } else {
      SigleRoute.push(
        <Route
          key={v.pathname}
          path={`${v.pathname}`}
          component={(v as ChildrenRoute).component}
        />,
      );
      SigleRouteName.push(v);
    }
  });
  return res;
};
const renderRoutesDom = renderRoutes();
const Routes = () => {
  const history = useHistory();
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Switch>
        {renderRoutesDom}
        <Route
          render={() => (
            <Result
              status='404'
              title='404'
              subTitle='对不起，您访问的页面不存在。'
              extra={
                <Button type='primary' onClick={() => history.push('/')}>
                  返回首页
                </Button>
              }
            />
          )}
        />
      </Switch>
    </Suspense>
  );
};

export default Routes;
export {
  allRoute,
  allPathRoute,
  pathCantInTab,
  allRouteName,
  SigleRoute,
  SigleRouteName,
};
