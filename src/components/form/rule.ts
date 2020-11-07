/**
 * 表单的一些通用类型
 */
import { FormInstance } from 'rc-field-form';

export type FormInstanceBase = FormInstance;
const ruleNo = () => {
  return {
    validator(rule: any, value: any) {
      return Promise.resolve();
    },
  };
};

export { ruleNo };
