import React from 'react';
import { observer } from 'mobx-react';
import Styles from './Repository.scss';
import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input, message } from 'antd';
import { useStores } from '@/hooks/user-stores';
import { gql } from '@apollo/client';

const Repository = observer(() => {
  const { userStore } = useStores();
  const [form] = useForm();

  const onFormChange = (e: any) => {
    // console.log('fomChange', e);
  };
  const onFormFinish = async (e: any) => {
    const owner = e.owner;
    const name = e.name;
    console.log(e);
    const client = userStore.client;
    if (client) {
      const { data } = await client.query({
        query: gql`
          query repositoryInfo($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              name
              id
            }
          }
        `,
        variables: {
          owner,
          name,
        },
      });
      if (data) {
        message.success('获取成功');
        form.setFieldsValue({
          repositoryId: data.repository.id,
        });
      }
    }
  };
  const RepositoryForm = (
    <Form
      className={Styles.Form}
      form={form}
      onFinish={onFormFinish}
      onValuesChange={onFormChange}
    >
      <Form.Item label='用户名' required name='owner' labelCol={{ span: 4 }}>
        <Input />
      </Form.Item>
      <Form.Item label='仓库名' required name='name' labelCol={{ span: 4 }}>
        <Input />
      </Form.Item>
      <Form.Item label='仓库id' name='repositoryId' labelCol={{ span: 4 }}>
        <Input />
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
  return (
    <main className={Styles.Repository}>
      <div style={{ padding: '20px', textAlign: 'center', fontSize: 20 }}>
        输入用户名和仓库名，点击确定,获取仓库id
      </div>
      {RepositoryForm}
    </main>
  );
});
export default Repository;
