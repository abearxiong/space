import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { ElementDefault } from '@/models';

type Props = {
  value: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: boolean;
} & ElementDefault;

const FormInputHide: React.FC<Props> = ({
  onChange,
  value,
  hidden = true,
  ...rest
}) => {
  const [hideValue, setHideValue] = useState(value);
  let HiddenInput: any;
  useEffect(() => {
    setHideValue(value);
    if (value) {
      // const event = new Event('change', { bubbles: true });
      // HiddenInput && HiddenInput.input.dispatchEvent(event);
      // 触发修改内容的事件 spend time 2 hours to fixed it;
      if (HiddenInput && HiddenInput.props.value !== value) {
        HiddenInput.props.onChange(value);
      }
      window.h = HiddenInput;
    }
  }, [HiddenInput, value]);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  return (
    <Input
      ref={(ref) => {
        HiddenInput = ref;
      }}
      {...rest}
      onChange={change}
      hidden={hidden}
      value={hideValue}
      defaultValue={hideValue}
    />
  );
};

export { FormInputHide };
