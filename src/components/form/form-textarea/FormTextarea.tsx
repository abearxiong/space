import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import styles from './FormTextarea.less';

const { TextArea } = Input;

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  rows?: number;
  style?: React.CSSProperties;
  noLengthInfo?: boolean;
};

// 延长显示，rule检查
const FormTextarea: React.FC<Props> = ({
  placeholder = '请输入文本',
  value,
  onChange,
  rows,
  maxLength = 300,
  style,
  noLengthInfo = false,
}) => {
  const paddingBottom = rows === 1 ? 0 : 24;
  const paddingRight = rows === 1 ? 60 : 0;
  const resize = rows === 1 ? 'none' : 'none';
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(event);
    setInputValue(event.target.value);
    // console.log('data', event.target.value);
  };
  return (
    <div className={styles.textareaWrap}>
      <TextArea
        rows={rows ?? 4}
        placeholder={placeholder}
        value={value}
        onChange={onTextAreaChange}
        maxLength={maxLength + 10}
        style={{ paddingBottom, paddingRight, resize, ...style }}
      />
      {!noLengthInfo && (
        <span className={styles.character}>
          {inputValue?.length ?? 0}/{maxLength}
        </span>
      )}
    </div>
  );
};

export { FormTextarea };
