import React, { FC, ReactNode } from 'react';
import styles from './Explain.less';
import { check } from '@/utils';

type Props = {
  title?: string;
  description?: ReactNode[];
  style?: React.CSSProperties;
  className?: string;
  isOrder?: boolean;
  isNotitle?: boolean;
  isNoIcon?: boolean;
  isWarn?: boolean;
};

//
const Explain: FC<Props> = ({
  title = '温馨提示',
  description = [],
  style,
  className = '',
  isOrder = true,
  isNotitle,
  isNoIcon,
  isWarn,
}) => {
  const names = [styles.article];

  isWarn && names.push(styles.warn);
  isNoIcon && names.push(styles.noIcon);
  className && names.push(className);

  const desc = description.map((v, i) => {
    const Reg = check.HTML.pattern;
    if (Reg.test(v + '')) {
      return <li key={i} dangerouslySetInnerHTML={{ __html: `${v}` }}></li>;
    }
    return <li key={i}>{v}</li>;
  });
  const content = isOrder ? <ol>{desc}</ol> : <ul>{desc}</ul>;
  return (
    <article className={names.join(' ')} style={style}>
      {!isNotitle && <h4>{title}: </h4>}
      <div className={isNotitle ? styles.isNotitle : ''}>{content}</div>
    </article>
  );
};

export default Explain;
