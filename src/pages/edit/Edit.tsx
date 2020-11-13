/**
 * 如何form表单编写优化
 * 试验：
 *  form表单 label名和name名字统一
 *  form表单内容修改以及提交优化理解方式
 *  form表单数据暂存思路。
 *  from表单的数据类型验证书写优化。
 */

import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';
import Styles from './Edit.scss';
import AceEditor from 'react-ace';
// import "ace-builds/src-noconflict/mode-java";
import 'ace-builds/src-noconflict/mode-markdown';
// import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/theme-xcode';
import { useForm } from 'antd/lib/form/Form';
import { Form, Input } from 'antd';
import { IAceEditor } from 'react-ace/lib/types';
import { useStores } from '@/hooks/user-stores';
const Edit = observer(() => {
  const [form] = useForm();
  const editor = useRef<any>(null);
  const { userStore } = useStores();
  const { editStore } = useStore();
  useEffect(() => {
    console.log('editor', editor);
    if (editor && editor.current) {
      const ace: IAceEditor = editor.current.editor;
      const session = ace.getSession();
      // session.setMode("ace/mode/markdown")
      // 自动换行
      session.setUseWrapMode(true);
      // 打印线
      ace.setShowPrintMargin(false);
    }
  }, [editor]);

  const onAceLoad = () => {
    console.log('ace is lodding');
    console.log(userStore, editStore);
  };
  const onAceValueChange = (value: string) => {
    // console.log(value, this.state.value);
    // if (value !== this.state.value) {
    //   localStorage.setItem('content', value);
    // }
    // this.setState({
    //   value: value,
    // });
    console.groupCollapsed('new value');
    console.log(value);
    console.groupEnd();
  };
  const EditorContent = (
    <AceEditor
      ref={editor}
      placeholder='Your Markdown'
      mode='markdown'
      theme='xcode'
      name='ace-edit-content'
      onLoad={onAceLoad}
      onChange={onAceValueChange}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      // value={this.state.value}
      style={{
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        // minHeight: 500,
      }}
      setOptions={{
        minLines: 10,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        highlightActiveLine: true,
        tabSize: 4,
      }}
    />
  );
  const onValuesChange = (v: any) => {
    console.groupCollapsed('value change');
    console.log(v);
    console.groupEnd();
  };
  const onFinish = (v: any) => {
    console.groupCollapsed('value finish');
    console.log(v);
    console.groupEnd();
  };
  const FormContent = (
    <Form
      className={Styles.Form}
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
    >
      <Form.Item label='标题' name='title'>
        <Input />
      </Form.Item>
      <Form.Item>{EditorContent}</Form.Item>
    </Form>
  );
  return <div className={Styles.Edit}>{FormContent}</div>;
});
export default Edit;
