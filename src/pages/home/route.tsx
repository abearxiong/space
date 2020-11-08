import React, { lazy } from 'react';
import { IconFont, IconFontType } from '@/components/icon';

import { ChildrenRoute } from '@/models';
const HomeRoute: ChildrenRoute = {
  path: '/',
  name: '首页',
  // eslint-disable-next-line react/display-name
  icon: (color: string, isChoose) => <IconFont type={IconFontType.Shouye} />,
  component: lazy(() => import('./Home')),
  // noMenu: true,
};

export { HomeRoute };
