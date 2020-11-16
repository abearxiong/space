import React, { FC, ReactElement } from 'react';
// import { message } from 'antd';
import history from '@/utils/history';
import { useStores } from '@/hooks/user-stores';

type Props = {
  children: ReactElement;
  location?: { pathname: string };
};

const authPages = ['/account/password'];
const Auth: FC<Props> = (props: Props): any => {
  const {
    userStore: { userData },
  } = useStores();
  const pathname = props?.location?.pathname ?? '';
  const reg = new RegExp('(^|&)code=([^&]*)(&|$)');
  const r = document.location.search.substr(1).match(reg);
  if (r && Array.isArray(r) && r.length > 3) {
    const code = r[2];
    localStorage.setItem('InvitationCode', code);
  }
  if (!userData && !authPages.includes(pathname)) {
    history.push('/login');
    return null;
  } else {
    return React.cloneElement(props.children);
  }
};

export default Auth;
