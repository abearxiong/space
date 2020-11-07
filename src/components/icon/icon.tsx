import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

// 关于商家平台的log
// 方：icon-tianmao icon-taobao icon-pinduoduo
//
// 圆： icon-taobao1 icon-bianzu
//
// 其他
// 首页 icon-shouye 推广 icon-tuiguang  订单 icon-dingdan 财务 icon-caiwu
// 功能 icon-danseshixintubiao- 店铺 icon-4
const IconFontType = {
  Tianmao: 'icon-tianmao',
  Taobao: 'icon-taobao',
  Pinduoduo: 'icon-pinduoduo',
  Taobao1: 'icon-taobao1',
  Shouye: 'icon-shouye', // 首页
  Shouyi: 'icon-shouyi', // 收益
  Tuiguang: 'icon-tuiguang', // 推广
  Dingdan: 'icon-dingdan', // 订单
  Caiwu: 'icon-caiwu', // 财务
  Danseshixintubiao: 'icon-danseshixintubiao-', // 功能
  More: 'icon-gongnengguanli',
  TuiSong: 'icon-tuisongxiaoxi',
  Dianpu: 'icon-4', // 店铺
  Data: 'icon-iconfontpaixingbang', // 数据中心
  Fans: 'icon-fensiguanli',
  Shangpin: 'icon-shangpin',
  Sucai: 'icon-sucai',
  LoginUser: 'icon-login-user',
  LoginPassword: 'icon-login-password',
};
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2089122_xciruq9uvda.js',
});

export type IconImgType = {
  src: string;
  style?: React.CSSProperties;
  className?: string;
};
/**
 * only use to home side menu
 */
export const IconImg = ({ src, style, className }: IconImgType) => {
  return (
    <img
      className={className}
      src={src}
      style={{
        width: 16,
        height: 16,
        marginRight: 14,
        marginTop: -3,
        ...style,
      }}
    />
  );
};

export { IconFont, IconFontType };
