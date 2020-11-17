/**
 * 如何form表单编写优化
 * 试验：
 *  form表单 label名和name名字统一
 *  form表单内容修改以及提交优化理解方式
 *  form表单数据暂存思路。
 *  from表单的数据类型验证书写优化。
 */

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import Styles from './Edit.scss';
import AceEditor from 'react-ace';
// import "ace-builds/src-noconflict/mode-java";
import 'ace-builds/src-noconflict/mode-markdown';
// import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/theme-xcode';
import { useForm } from 'antd/lib/form/Form';
import { Button, Drawer, Form, Input, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { IAceEditor } from 'react-ace/lib/types';
import { useStores } from '@/hooks/user-stores';
import { useMount } from 'ahooks';
import { useHistory, useLocation } from 'react-router-dom';
import GET_ISSUE from '@/graphql/repository/issues/GET_ISSUE';
import { LabelList } from './components/label-list/LabelList';
import UPDATE_ISSUE from '@/graphql/repository/issues/UPDATE_ISSUE';

import { toJS } from 'mobx';
import ADD_ISSUE from '@/graphql/repository/issues/ADD_ISSUE';
import { newXionTitle } from '@/modules/title';

const Edit = observer(() => {
  const [form] = useForm();
  const location = useLocation();
  const history = useHistory();
  const editor = useRef<any>(null);
  const { userStore, editStore, labelsStore } = useStores();
  const [issue, setIssue] = useState<any>();
  const [isShowDrrawer, setIsShowDrrawer] = useState(false);
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
      if (issue) {
        ace.setValue(issue.body);
        form.setFieldsValue({ title: issue.title });
      } else {
        if (
          userStore.userData.name === 'abearxiong' ||
          userStore.userData.name === '熊潇'
        ) {
          const title = newXionTitle();
          form.setFieldsValue({ title });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, issue]);
  useMount(() => {
    const state: any = location.state;
    if (state) {
      queryIssue(state.index);
    }
    labelsStore.getPageData();
  });
  const queryIssue = async (index: number) => {
    console.log('queryIssue', index);
    const client = userStore.client;
    if (client) {
      const { data, loading } = await client.query({
        query: GET_ISSUE,
        variables: {
          ...userStore.variables,
          number: index,
          first: 100,
          after: null,
        },
      });
      const issue = data.repository.issue;
      setIssue(issue);
      if (issue.labels) {
        const labelsId = issue.labels.edges.map((item: any) => {
          return item.node.id;
        });
        labelsStore.setLabelCheck(labelsId);
      }
      if (loading) {
        message.loading('加载中');
      }
    }
  };
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
        // enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
        // enableSnippets: true,
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
  const onFinish = async (v: any) => {
    console.groupCollapsed('value finish');
    console.log(v);
    const id = issue?.id;
    const state = issue?.state ?? 'OPEN';
    console.log('id', id);
    console.log('state', state);
    let labelIds: any = toJS(labelsStore.labelCheck);
    if (!userStore.userRepository.canWrite) {
      labelIds = null;
    }
    if (labelIds && labelIds.length === 0) {
      labelIds = null;
    }
    const body = v.body;
    const title = v.title;
    console.log('labelIds', labelIds);
    console.log('body', body);
    console.log('title', title);

    console.groupEnd();
    const client = userStore.client;
    const mutation = id ? UPDATE_ISSUE : ADD_ISSUE;
    const variables = {
      ...userStore.variables,
      id,
      title,
      body,
      labelIds,
    };
    console.log('mutation', mutation, variables);

    if (client) {
      const c = await client.mutate({
        mutation,
        variables,
      });
      if (c.data) {
        message.success('提交成功');
        setTimeout(() => {
          history.push('/');
        }, 1000);
      }
    }
  };
  const onPost = () => {
    form.submit();
  };
  const FormContent = (
    <Form
      className={Styles.Form}
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      requiredMark={false}
    >
      <div style={{ display: 'flex' }}>
        <Form.Item
          label='标题'
          name='title'
          style={{ flexGrow: 1 }}
          rules={[{ required: true }]}
        >
          <Input placeholder='请填写标题' />
        </Form.Item>
        <Button
          type='primary'
          onClick={() => {
            onPost();
          }}
          style={{ marginRight: 10 }}
        >
          提交
        </Button>
        <Button
          type='text'
          icon={<SettingOutlined />}
          style={{ marginRight: 10 }}
          onClick={() => setIsShowDrrawer(true)}
        />
        <Drawer
          title='其他设置'
          placement='right'
          closable={false}
          onClose={() => setIsShowDrrawer(false)}
          visible={isShowDrrawer}
          getContainer={false}
          width={500}
          style={{ position: 'absolute' }}
        >
          <LabelList />
        </Drawer>
      </div>
      <Form.Item name='body' rules={[{ required: true }]}>
        {EditorContent}
      </Form.Item>
    </Form>
  );
  return <div className={Styles.Edit}>{FormContent}</div>;
});
export default Edit;
