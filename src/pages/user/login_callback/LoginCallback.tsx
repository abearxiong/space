import { useMount } from 'ahooks';
import { observer } from 'mobx-react';
import React from 'react';
import { GithubToken } from 'think-space-oauth';

const LoginCallback = observer(() => {
  useMount(() => {
    console.log('run');
    const a = GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
      useQueryUrl: true,
    }).auto();
    a.then(console.log);
  });
  function postCode() {
    const a = GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
      useQueryUrl: true,
    }).auto();
    a.then(console.log);
  }

  window.postCode = postCode;
  return (
    <div>
      callback页面
      <a onClick={postCode}>获取到code，登录请求</a>
    </div>
  );
});

export default LoginCallback;
