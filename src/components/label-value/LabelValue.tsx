/**
 * 页面当中，经常出现需要显示kev和value的值，统一结构，取消重新代码
 */
import React from 'react';
import Styles from './LabelValue.less';

export type LableValueKV = {
  name: string;
  value: any;
  className?: string;
  style?: React.CSSProperties;
};
type Props = {
  kv: LableValueKV[];
  className?: string;
  style?: React.CSSProperties;
};

export const LabelValue = ({ kv, className, style }: Props) => {
  const KvComm = kv.map((item, index) => {
    return (
      <div key={index} className={item.className} style={item.style}>
        <span>{item.name}:</span>
        {/* <span dangerouslySetInnerHTML={{ __html: item.value }}></span> */}
        <span>{item.value}</span>
      </div>
    );
  });
  return (
    <div className={Styles.LabelValue + ' ' + className} style={style}>
      {KvComm}
    </div>
  );
};
