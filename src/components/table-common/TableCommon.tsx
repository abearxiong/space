import React from 'react';
import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/es/table';
// columns属性 ColumnsType<any>

const Table: React.FC<TableProps<any>> = (props) => {
  const { pagination, rowKey, ...rest } = props;
  if (pagination) {
    // antDesign Pagination 在 total 大于 50 条时会默认显示 size 切换器以提升用户交互体验。
    // 如果你不需要该功能，可以通过设置 showSizeChanger 为 false 来关闭。
    pagination.showSizeChanger = false;
  }
  return <AntTable pagination={pagination} rowKey={rowKey || 'id'} {...rest} />;
};

export { Table };
