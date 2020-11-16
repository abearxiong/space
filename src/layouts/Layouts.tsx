import { observer } from 'mobx-react';
import React from 'react';

import { LayoutHead } from './layout-head/LayoutHead';
import { Layout as AntLayout } from 'antd';

export type LayoutProp = {
  children: any;
} & SimpleObject;
export const Layout = observer(({ children }: LayoutProp) => {
  return (
    <AntLayout style={{ height: '100%' }}>
      <LayoutHead />
      <AntLayout.Content style={{ flexGrow: 1 }}>{children}</AntLayout.Content>
    </AntLayout>
  );
});
