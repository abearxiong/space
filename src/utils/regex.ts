type ToCheckParam = {
  reg: RegExp | string | Reg;
  value: string;
  message: string;
  isPromise: boolean;
};

type CheckVaild = {
  reg: RegExp;
  value: string;
  message: string;
  isPromise: boolean;
};
type Reg = {
  pattern: RegExp;
  message: string;
};
const checkVaild = ({ reg, value, message, isPromise }: CheckVaild) => {
  if (isPromise) {
    if (!reg.test(value)) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  } else {
    return Promise.resolve(reg.test(value));
  }
};

type Check = {
  Bank: Reg;
  Email: Reg;
  NumMillion: Reg;
  NumGT1: Reg;
  NumGT10: Reg;
  Num: Reg;
  Money: Reg;
  Password: Reg;
  Phone: Reg;
  StrNoOtherChars: Reg;
  Url: Reg;
  HTML: Reg;
  [key: string]: Reg;
};
type CheckNum = {
  NumGT0: Reg;
};
const checkNum: CheckNum = {
  NumGT0: {
    pattern: /^\-\d+$/,
    message: '必须小于0',
  },
};
type CheckShop = {
  // 自定义url
  IsPinduoduoUrl: Reg;
  IsPinGoodId: Reg;
  IsTaobaoUrl: Reg;
  IsTaobaoId: Reg;
  IsTmallUrl: Reg;
  IsTmallId: Reg;
};
const checkShop: CheckShop = {
  IsPinduoduoUrl: {
    pattern: /yangkeduo\.com/,
    message: '拼多多url',
  },
  IsPinGoodId: {
    pattern: /^(https?:\/\/)[\d\D]*yangkeduo\.com[\d\D]*goods_id=\d{5,12}$/,
    message: '',
  },
  IsTaobaoUrl: { pattern: /taobao\.com/, message: '淘宝url' },
  IsTaobaoId: {
    pattern: /^(https?:\/\/)[\d\D]*taobao\.com[\d\D]*id=\d{12}$/,
    message: '',
  },
  IsTmallUrl: { pattern: /tmall\.com/, message: '天猫url' },
  IsTmallId: {
    pattern: /^(https?:\/\/)[\d\D]*tmall\.com[\d\D]*id=\d{12}$/,
    message: '',
  },
};
type CheckString = {
  WeChat: Reg;
};
// 微信官方定义的微信号规则
// 1、可使用6-20个字母、数字、下划线和减号；
// 2、必须以字母开头（字母不区分大小写）；
// 3、不支持设置中文。

const checkString: CheckString = {
  WeChat: {
    pattern: /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/,
    message: '请输入正确的微信号',
  },
};
const check: Check & CheckShop & CheckNum & CheckString = {
  Bank: { pattern: /^\d{10,28}$/, message: '请输入正确的银行卡号' },
  Email: {
    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    message: '请输入正确的邮箱',
  },
  HTML: { pattern: /<\/?[a-z][\s\S]*>/i, message: 'HTML标签' },
  NumMillion: {
    pattern: /^(\d{1,6}(\.\d{1,2})|\d{1,6})$/,
    message: '精确小数点后2位,最大不超过百万',
  },
  NumGT1: {
    pattern: /^\+?[1-9]\d*$/,
    message: '不能小于1',
  },
  NumGT10: {
    pattern: /^\+?[1-9][0-9]\d*$/,
    message: '不能小于10',
  },
  Num: {
    pattern: /^\d+$/,
    message: '只能是数字',
  },
  Money: {
    pattern: /^(\+)?\d+.\d{2}$/,
    message: '保留两位小数的钱',
  },
  Password: {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    message: '密码',
  },
  Phone: {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号',
  },
  StrNoOtherChars: {
    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
    message: '标题不能含有特殊字符',
  },
  Url: {
    pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,
    message: 'url验证',
  },
  ...checkShop,
  ...checkNum,
  ...checkString,
};
const Copywriting = {
  check,
};

/**
 * 检查类型
 * @param ToCheckParam检查参数
 */
const toCheck = ({
  reg,
  value,
  message = '',
  isPromise = false,
}: ToCheckParam) => {
  if (typeof reg === 'string') {
    const s: string = reg;
    reg = check[s]?.pattern;
    message = message || (check[s]?.message ?? '');
    if (!reg) throw `reg: [${s}] 不存在`;
    return checkVaild({ reg, value, message, isPromise });
  } else if ('pattern' in reg) {
    return checkVaild({ reg: (reg as Reg).pattern, value, message, isPromise });
  }
  return checkVaild({ reg, value, message, isPromise });
};

type ToCheckPattern = {
  reg: string | Reg | RegExp;
  message?: string;
};
/**
 * 返回pattern的类型，主要使用在form表单当中
 * @param ToCheckParam
 */
const toCheckPattern = ({ reg, message = '' }: ToCheckPattern): Reg => {
  if (typeof reg === 'string') {
    const s: string = reg;
    reg = check[s]?.pattern;
    message = message || (check[s]?.message ?? '');
    if (!reg) throw `reg: [${s}] 不存在`;
    return { pattern: reg, message };
  } else {
    message = message || ((reg as Reg).message ?? '');
    return { pattern: (reg as Reg).pattern, message };
  }
};

export { check, Copywriting, toCheck, toCheckPattern };
