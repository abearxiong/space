import React from 'react';
import Styles from './Title.less';

type Props = {
  title: string;
  style: React.CSSProperties;
  className: string;
};

export const Title = ({ className, style, title }: Props) => {
  return (
    <div className={className + '' + Styles.Title} style={style}>
      {title}
    </div>
  );
};
