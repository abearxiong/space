import React from 'react';
import { Table } from './TableCommon';
import { TableProps } from 'antd/es/table';

type Props = {
  columns: any;
  loading?: boolean;
  pageData: any;
  getNewPage?: any;
};
const TableSimple = ({
  columns,
  loading,
  pageData,
  getNewPage,
  pagination,
  ...rest
}: Props & TableProps<any>) => {
  return (
    <Table
      {...rest}
      columns={columns}
      loading={loading}
      pagination={{
        current: pageData.current,
        total: pageData.total,
        pageSize: pageData.size ?? 10,
        onChange: (current, size) => {
          getNewPage && getNewPage({ current, size });
        },
        ...pagination,
      }}
      // scroll={{ x: 1000 }}
      dataSource={pageData.list}
    />
  );
};
export { TableSimple };
