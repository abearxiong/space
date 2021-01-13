import { useStores } from '@/hooks/user-stores';
import { Layout, message } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import Styles from './Home.scss';
import { SpaceList } from './components/space-list/SpaceList';
import { useMount } from 'ahooks';

const Home = observer(() => {
  const { userStore, issuesStore } = useStores();
  useMount(() => {
    window.addEventListener('scroll', onScrollNew);
    if (issuesStore.pageData.length <= 0) {
      issuesStore.getPageData();
    }
  });

  const onScrollNew = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const isBottom = scrollTop + clientHeight > scrollHeight - 2;
    if (isBottom && !issuesStore.loading) {
      message.info('loading more');
      getNewPage();
    }
  };
  const getNewPage = async () => {
    issuesStore.getNextPage();
  };

  return (
    <Layout.Content className={Styles.Home}>
      <SpaceList
        issues={issuesStore.pageData}
        repository={userStore.userRepository}
      />
    </Layout.Content>
  );
});

export default Home;
