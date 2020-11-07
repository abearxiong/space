// 分页
type ParamsGet<T = any> = {
  current?: number;
  status?: number;
  size?: number;
  startTime?: number;
  endTime?: number;
} & T;

export { ParamsGet };

const params = (data: any) => {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
};
export { params };
