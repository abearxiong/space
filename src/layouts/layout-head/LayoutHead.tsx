import { observer } from 'mobx-react';
import React from 'react';

import { Dropdown, Layout, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useStores } from '@/hooks/user-stores';
import Styles from './LayoutHead.scss';
import { SettingModal } from './SettingModal';
import { useHistory } from 'react-router-dom';
import { useMount } from 'ahooks';

export const LayoutHead = observer(() => {
  const { userStore } = useStores();
  const history = useHistory();
  window.h = history;
  useMount(() => {
    userStore.postCode();
  });

  const avatar = (
    <Avatar src={userStore.userData.avatarUrl} style={{ marginRight: 5 }} />
  );
  const UserMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          console.log('user on click');
          userStore.setIsShowSetting(true);
        }}
      >
        账号管理
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          history.push('/edit/new');
        }}
      >
        新建页面
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          window.open('https://github.com/abearxiong/space');
        }}
      >
        star github
      </Menu.Item>
    </Menu>
  );
  const UserInfoComm = (
    <Dropdown overlay={UserMenu} className={Styles.UserInfoComm}>
      <div>
        {avatar} {userStore.userData.name}
      </div>
    </Dropdown>
  );
  return (
    <>
      <Layout.Header className={Styles.LayoutHead} style={{ color: '#fff' }}>
        <div
          onClick={() => {
            history.push('/');
          }}
        >
          Space
        </div>
        {UserInfoComm}
      </Layout.Header>
      <SettingModal />
    </>
  );
});
