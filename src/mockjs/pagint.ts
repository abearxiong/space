import { Random } from 'mockjs';
export const MockData = (data: any = {}) => {
  return { code: 1, data, msg: '' };
};
export const MockPaging = (record: any = {}) => {
  const pagging = {
    current: function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that: any = this;
      return Random.integer(1, that.size);
    },
    'records|10': [record],
    pages: function (): any {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that: any = this;
      // 向上取整
      return Math.ceil(that.total / that.size);
    },
    size: 10,
    'total|10-100': 1,
  };
  return MockData(pagging);
};
