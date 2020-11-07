import { ModalProps as ModalPropsBase } from 'antd/lib/modal/Modal';

type ModalProps<T = any> = {
  visible: boolean;
  setVisible: (params: boolean) => void;
  loading?: boolean;
  onOk?: () => any;
  onCancel?: () => void;
  // Modal上传内容
  // upload?: (params: V) => any;
} & T &
  ModalPropsBase;

export { ModalProps };
