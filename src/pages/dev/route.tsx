/**
 * 路由处理：ChildrenRoute和ParentRoute
 * // icon 根据情况设置，建议使用iconfont配置
 */
import { lazy } from 'react';
import { IconFont, IconFontType } from '@/components';
import { ChildrenRoute } from '@/models';
import React from 'react';

const DevRoute: ChildrenRoute = {
  path: '/dev',
  name: '开发中',
  // eslint-disable-next-line react/display-name
  icon: (color: string) => (
    <IconFont type={IconFontType.Danseshixintubiao} style={{ color: color }} />
  ),
  component: lazy(() => import('./dev')),
  // noMenu: true,
};

export { DevRoute };

export const DevRoutes = [DevRoute];
