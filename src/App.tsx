import React, { Suspense } from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { UseRequestProvider } from 'ahooks';
import Result from 'antd/lib/result';
import { Button } from 'antd';
import Routes, { SinglePageRoutes } from './route';
import { Layout } from '@/layouts/Layouts';
if (process.env.MOCK) {
  console.log('引入mockjs');
  require('./mockjs');
}
// message 提示
message.config({
  maxCount: 1,
});

window.message = message;

const App = () => {
  const history = useHistory();
  return (
    <ConfigProvider locale={zhCN}>
      <UseRequestProvider
        value={{
          manual: true,
          throwOnError: true,
        }}
      >
        <Router>
          <Suspense fallback={<div>加载中...</div>}>
            <Switch>
              <Layout>
                <Routes />
              </Layout>
              {SinglePageRoutes.map((item) => {
                // console.log('route', item);
                return (
                  <Route
                    key={item.pathname}
                    path={item.path}
                    component={item.component}
                  />
                );
              })}
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
        </Router>
      </UseRequestProvider>
    </ConfigProvider>
  );
};

export default App;
