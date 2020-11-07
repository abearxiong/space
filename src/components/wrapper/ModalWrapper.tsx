import React, { ReactNode } from 'react';
import { ModalProps } from '@/models';
import Modal from 'antd/lib/modal/Modal';

type PropsModalWrapper = {
  children: ReactNode;
};
type Props = ModalProps<PropsModalWrapper>;
// useway
/*

type SelfProps = {
  form: any;
  BrandInfo: any;
};
type Props = ModalProps<SelfProps>;


*/
//

// 因为显示visible是外层控制
// 因此
// 对modal处理，对onOk和onCancel进行默认处理
const ModalWrapper = ({
  title,
  visible,
  setVisible,
  onOk,
  onCancel,
  children,
  ...rest
}: Props) => {
  // onOk和okCancel不存在则设置默认的隐藏
  const onHidden = () => setVisible(false);
  onOk = onOk || onHidden;
  onCancel = onCancel || onHidden;
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export { ModalWrapper };
