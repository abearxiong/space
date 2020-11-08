/**
 * 如何form表单编写优化
 * 试验：
 *  form表单 label名和name名字统一
 *  form表单内容修改以及提交优化理解方式
 *  form表单数据暂存思路。
 *  from表单的数据类型验证书写优化。
 */

import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';
import Styles from './dev.scss';

const Dev = observer(() => {
  // 推荐按照顺序放置内容
  // 1. 变量
  //    1. 固有变量，例如store，useForm
  //    2. 获取变量 useHistory, useLocation, useParams useScroll
  //    3. 自定变量 useState等
  //    Tips:其他变量
  //       比如文案,获取某些固定变量（常量），可以按照位置分块放，比如文案中表单文案，
  //       在具体当表单组件当中解构获取。比如表格的行首数据显示等
  // 2. 程序周期内容 useMount，useUnMount卸载和更新等等周期
  // 3. 基本hook更新，useEffect
  // 4. 程序api接口hook，uesRequests
  // 5. 函数，以及其他事件。事件命名以on开头，其他某些内容知意开头。如果有可能，函数顺序以首字母排序
  //    1. 普通函数
  //    2. 事件函数
  //    3. 表单rule函数
  // 6. 内部组件，当组件嵌套div过多，提取出来（推荐，文案提取出来，使用组件化）
  //    Tips: 外部组件
  //        当这个函数当行数过多，推荐把一些内容提出这个函数，当成外部组件，有必要的情况可以提取到
  //        componets目录，没有必要，则放在当前文件到其他函数组件当中（新开函数）
  // 7. 合并组件模块，小组件小模块合并。
  // 8. 渲染结果return，render中不要包含太多内容
  const { devPageStore, devStore } = useStore();
  console.log(devPageStore, devStore);
  return <div className={Styles.Dev}>功能开发中</div>;
});
export default Dev;
