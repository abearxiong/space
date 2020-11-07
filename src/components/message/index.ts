import { message } from 'antd';
const MyMessage = {
  success: (info = '') => {
    message.success(info || '操作成功');
  },
  info: (info = '') => {
    message.info(info || '警告');
  },
  error: (err = '') => {
    message.error(err || '操作失败');
  },
};
export { MyMessage };
