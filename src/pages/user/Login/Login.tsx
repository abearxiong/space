import { useMount } from 'ahooks';
import { observer } from 'mobx-react';
import React from 'react';
import { GithubToken } from 'think-space-oauth';
const Login = observer(() => {
  useMount(() => {
    GithubToken({ proxyUrl: 'http://message.xiongxiao.me/cors/' }).logout();
  });
  function login() {
    // console.log("login",GithubToken);
    GithubToken().auto().then(console.log);
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
