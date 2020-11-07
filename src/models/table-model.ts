import { ColumnsType, ColumnType } from 'antd/lib/table';
export type Column<T = any, S = any> = {
  title: string;
  dataIndex?: string; // 索引对应参数
  key?: string;
  render?: (text: any, record: T, index: number) => any | void;
} & ColumnType<S>;

export type Columns<T = any, S = any> = Column<T, S>[] | ColumnsType;
