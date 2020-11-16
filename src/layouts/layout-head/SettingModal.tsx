import React, { useEffect } from 'react';
import { useStores } from '@/hooks/user-stores';

import { ModalWrapper } from '@/components';
import { observer } from 'mobx-react';
import { Button, Checkbox, Form, Input, message, Tabs, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

enum TabPaneKey {
  TabSetting = 'TabSetting',
  TabUser = 'TabUser',
}
export const SettingModal = observer(() => {
  const { userStore, issuesStore } = useStores();
  const [formUser] = useForm();
  const [formSetting] = useForm();
  const history = useHistory();
  window.formUser = formUser;
  window.formSetting = formSetting;

  const onUserChange = (v: any) => {
    console.log('change', v);
    console.log(formUser.getFieldsValue());
  };
  const onUserFinish = (v: any) => {
    console.log(v);
  };
  const onSettingChange = (v: any) => {
    console.log('change', v);
  };
  const onSettingFinish = (v: any) => {
    userStore.setUserRepository({ ...v.userRepository });
    message.success('更新仓库地址成功');
    issuesStore.clearPage();
    issuesStore.getPageData();
    userStore.setIsShowSetting(false);
  };
  const isGuest = userStore.userData.name === 'abearxiong';
  const toGetRepositoryIdTitle = '获取仓库id方式';
  const toGetRepositoryId = () => {
    window.open('/repository');
  };
  useEffect(() => {
    if (formUser && userStore.userData) {
      formUser.setFieldsValue({ user: userStore.userData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userData]);
  const TabUser = (
    <TabPane tab='用户信息' key='TabUser'>
      <Form
        form={formUser}
        onFinish={onUserFinish}
        onValuesChange={onUserChange}
        // initialValues={{ user: userStore.userData }}
      >
        <Form.Item
          name={['user', 'name']}
          label='用户名'
          labelCol={{ span: 4 }}
        >
          <Input disabled value={userStore.userData.name} />
        </Form.Item>
        <Form.Item name={['user', 'email']} label='邮箱' labelCol={{ span: 4 }}>
          <Input disabled value={userStore.userData.email} />
        </Form.Item>
        <Form.Item
          name={['user', 'location']}
          label='地址'
          labelCol={{ span: 4 }}
        >
          <Input disabled value={userStore.userData.location} />
        </Form.Item>
        <Form.Item
          name={['user', 'websiteUrl']}
          label='网址'
          labelCol={{ span: 4 }}
        >
          <Input disabled value={userStore.userData.websiteUrl} />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {isGuest && (
              <div>
                当前用户为游客，请登录自己账号
                <Button
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  登录
                </Button>
              </div>
            )}
            {!isGuest && (
              <>
                <Button
                  type='primary'
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  切换用户
                </Button>
                <Button
                  type='primary'
                  onClick={() => {
                    userStore.clearUserinfo();
                  }}
                  style={{ marginLeft: 20 }}
                >
                  退出登录
                </Button>
              </>
            )}
          </div>
        </Form.Item>
      </Form>
    </TabPane>
  );
  // useEffect(() => {
  //   if (formSetting && userStore.userRepository) {
  //     formSetting.setFieldsValue(userStore.userRepository);
  //   }
  // }, [formSetting, userStore.userRepository]);
  const TabSetting = (
    <TabPane tab='空间设置' key='TabSetting'>
      <Form
        form={formSetting}
        initialValues={{ userRepository: userStore.userRepository }}
        onFinish={onSettingFinish}
        onValuesChange={onSettingChange}
      >
        <Form.Item
          name={['userRepository', 'owner']}
          label='用户名'
          labelCol={{ span: 4 }}
          tooltip={'对有写入权限的仓库才具有创建标签的权限'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['userRepository', 'name']}
          label='仓库名'
          labelCol={{ span: 4 }}
          tooltip={'用户所拥有的仓库的名'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['userRepository', 'canWrite']}
          label='拥有者'
          tooltip={'用户具有写入权限'}
          labelCol={{ span: 4 }}
          valuePropName='checked'
        >
          <Checkbox>
            <Tooltip
              placement='topLeft'
              title='因为label只能拥有者可以写入, 不勾选后添加label，会报错，没有权限。否则不予修改label'
              arrowPointAtCenter
            >
              能够写入
            </Tooltip>
          </Checkbox>
        </Form.Item>
        <Form.Item
          name={['userRepository', 'repositoryId']}
          label={
            <a onClick={toGetRepositoryId} title={toGetRepositoryIdTitle}>
              仓库id
            </a>
          }
          tooltip={toGetRepositoryIdTitle}
          labelCol={{ span: 4 }}
        >
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
    </TabPane>
  );
  return (
    <ModalWrapper
      visible={userStore.isShowSetting}
      // visible={true}
      setVisible={() => userStore.setIsShowSetting(false)}
      footer={false}
    >
      <Tabs type='card' defaultActiveKey={TabPaneKey.TabSetting}>
        {TabUser}
        {TabSetting}
      </Tabs>
    </ModalWrapper>
  );
});
