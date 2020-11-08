// 这里是存放别人引入的包的types类型；自己写的类型放在models当中
interface Window {
  [key: string]: any;
}

/**
 * 部分引入的对象可能不存在的属性，进行自己设定
 */
interface KeyValueObject {
  [key: string]: any;
  [key: number]: any;
}
interface SimpleObject {
  [key: string]: any;
  [key: number]: any;
}

declare module '*.css';
declare module '*.less';
declare module '*.sass';
declare module '*.scss';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

// interface HTMLElementTagNameMap {
//   'g-emoji': any;
// }

interface IntrinsicElements {
  'g-emoji': any;
}

declare namespace JSX {
  interface IntrinsicElements {
    'g-emoji': any;
  }
}
