/**
 * 路由处理：ChildrenRoute和ParentRoute
 * // icon 根据情况设置，建议使用iconfont配置
 */
import { lazy } from 'react';
import { IconFont, IconFontType } from '@/components';
import { ChildrenRoute } from '@/models';
import React from 'react';

const EditRoute: ChildrenRoute = {
  path: '/edit/new',
  name: '开发中',
  // eslint-disable-next-line react/display-name
  icon: (color: string) => (
    <IconFont type={IconFontType.Danseshixintubiao} style={{ color: color }} />
  ),
  component: lazy(() => import('./Edit')),
  // noMenu: true,
};

export { EditRoute };

export const EditRoutes = [EditRoute];
