// response 类型
type ResponseType<T = any> = {
  code: number;
  data?: T;
  msg?: '';
};
type ResponsePaging<T = any> = {
  current?: number; // 当前页
  records: T[]; // 当前页的数据
  pages?: number; // 总共的页面
  size?: number; // 当前页数量
  total?: number; // 总数
};
//data: list: [,…], total: 1, size: 10, current: 1
type Paging<T = any> = {
  current?: number; // 当前页
  list: T[]; // 当前页的数据
  pages?: number; // 总共的页面
  size?: number; // 当前页数量
  total?: number; // 总数
};
type PageData<T = any> = {
  pageData: Paging<T>;
};
type PagingForm<T> = {
  current?: number;
  size?: number;
  status?: number;
} & T;
type ResponsePage<T = any> = ResponseType<Paging<T>>;

type TransFromPaging = {
  res: ResponseType<ResponsePaging>;
  transList?: (params: any) => any;
};
// 数据转化
const transformPaging = <T = any>({
  res: { code, data, msg },
  transList,
}: TransFromPaging): ResponsePage<T> => {
  // if (!code) return { code: 500 };
  const defaultPaging = { records: [] };
  // console.log('data', data);
  const { current, records, size, pages, total }: ResponsePaging =
    data ?? defaultPaging;
  const list = transList && records.map((item) => transList(item));
  const r: Paging = {
    current,
    list: list ?? records,
    size,
    pages,
    total,
  };
  return { code, data: r, msg };
};
type TransFromRes = {
  res: ResponseType;
  trans?: (params: any) => any;
};
const transformRes = <T = any>({
  res: { code, data, msg },
  trans,
}: TransFromRes): ResponsePage<T> => {
  const rData = trans && trans(data);
  return { code, data: rData ?? data, msg };
};
export {
  ResponseType,
  ResponsePage,
  Paging,
  PagingForm,
  PageData,
  transformPaging,
  transformRes,
};
