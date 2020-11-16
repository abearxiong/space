import { useStores } from '@/hooks/user-stores';
import { useMount } from 'ahooks';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { GithubToken } from 'think-space-oauth';

const LoginCallback = observer(() => {
  const { userStore } = useStores();
  const history = useHistory();
  useMount(() => {
    postCode();
  });
  function postCode() {
    let client_id;
    if (location.href.match(/localhost/)) {
      client_id = userStore.client_id_local;
    } else {
      client_id = userStore.client_id;
    }
    const a = GithubToken({
      proxyUrl: 'http://message.xiongxiao.me/cors/',
      // useQueryUrl: true,
      client_id,
    });
    a.auto().then((res) => {
      const token = a.getToken();
      if (token) {
        userStore.setToken(token);
        history.push('/');
      }
    });
  }

  window.postCode = postCode;
  return (
    <div>
      <a onClick={postCode}>若没有自动跳转，请手动点击登录</a>
    </div>
  );
});

export default LoginCallback;
