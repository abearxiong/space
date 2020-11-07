/**
 * Main use for Table
 * -- table image 100*100
 */
import React from 'react';
import { Image } from 'antd';
import { ImageProps } from 'rc-image';

// alt	图像描述	string	-	4.6.0
// fallback	加载失败容错地址	string	-	4.6.0
// height	图像高度	string | number	-	4.6.0
// placeholder	加载占位, 为 true 时使用默认占位	ReactNode	-	4.6.0
// preview	是否开启预览	boolean	true	4.6.0
// src	图片地址	string	-	4.6.0
// width	图像宽度
type Props = {
  style?: React.CSSProperties;
  className?: string;
} & ImageProps;
const TableImage: React.FC<Props> = ({
  style = { borderRadius: 5 },
  className,
  width = 100,
  height = 100,
  placeholder = true,
  ...rest
}) => {
  return (
    <Image
      style={style}
      className={className}
      width={width}
      height={height}
      object-fit='scale-down'
      placeholder={placeholder}
      {...rest}
    />
  );
};

export { TableImage };
