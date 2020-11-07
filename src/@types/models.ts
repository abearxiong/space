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
type Callback = (r?: any) => void;
