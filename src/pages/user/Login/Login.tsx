import { useStores } from '@/hooks/user-stores';
import { useMount } from 'ahooks';
import { observer } from 'mobx-react';
import React from 'react';
import { GithubToken } from 'think-space-oauth';
const Login = observer(() => {
  const { userStore } = useStores();
  useMount(() => {
    GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
    }).logout();
    login();
  });
  function login() {
    let client_id;
    if (location.href.match(/localhost/)) {
      client_id = userStore.client_id_local;
    } else {
      client_id = userStore.client_id;
    }
    GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
      client_id,
    })
      .auto()
      .then(console.log);
  }
  window.login = login;

  return (
    <div>
      登陆页面
      <a onClick={login}>登录</a>
    </div>
  );
});

export default Login;
