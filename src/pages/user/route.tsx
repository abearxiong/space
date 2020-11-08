import React, { lazy } from 'react';
import { IconFont, IconFontType } from '@/components/icon';

import { ChildrenRoute } from '@/models';

export const LoginRoute: ChildrenRoute = {
  path: '/login',
  name: '首页',
  // eslint-disable-next-line react/display-name
  icon: (color: string, isChoose) => <IconFont type={IconFontType.Shouye} />,
  component: lazy(() => import('./Login/Login')),
  // noMenu: true,
};
export const LoginCallbackRoute: ChildrenRoute = {
  path: '/login_callback',
  name: '首页',
  // eslint-disable-next-line react/display-name
  icon: (color: string, isChoose) => <IconFont type={IconFontType.Shouye} />,
  component: lazy(() => import('./login_callback/LoginCallback')),
  // noMenu: true,
};
export const UserRoutes = [LoginRoute, LoginCallbackRoute];
