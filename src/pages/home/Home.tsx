import GET_ISSUES from '@/graphql/repository/issues/GET_ISSUES';
import { useStores } from '@/hooks/user-stores';
import { useQuery } from '@apollo/client';
import { Layout, message } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import Styles from './Home.scss';
import { SpaceList } from './components/space-list/SpaceList';
const Home = observer(() => {
  const { userStore } = useStores();
  const { loading, data, error } = useQuery(GET_ISSUES, {
    client: userStore.client,
    variables: {
      ...userStore.userRepository,
      first: 10,
      after: null,
    },
    onCompleted: (data) => {
      userStore.setSpaceDatas(data);
      return data;
    },
    onError: (error) => {
      message.error(error);
    },
  });
  console.groupCollapsed('useQuery home');
  console.log(`loading ${loading}`);
  console.log(`error ${error}`);
  console.log(data);
  console.log(userStore.spaceDatas, userStore.spaceDatas.length);
  console.groupEnd();

  return (
    <Layout.Content className={Styles.Home}>
      <a
      // onClick={(e) =>
      //   fetchMore({ first: data.repository.issues.pageInfo.endCursor })
      // }
      >
        fetch more lenght: {userStore.spaceDatas.length}
      </a>
      <SpaceList issues={userStore.spaceDatas} />
    </Layout.Content>
  );
});

export default Home;
