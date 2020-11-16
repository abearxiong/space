import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@/hooks/user-stores';
import { Checkbox, List } from 'antd';
import Styles from './LabelList.scss';
import { IssueLabel } from '@/stores/issues/label';

export const LabelList = observer(() => {
  const { labelsStore } = useStores();
  const LabelListItem = (item: any, index: number) => {
    const v: IssueLabel = item.node;
    // const isCheck = labelsStore.labelCheck.includes(v.id);
    return (
      <List.Item title={v.description}>
        <Checkbox name='issue-label' value={v.id} />
        {v.name}
      </List.Item>
    );
  };
  const onLabelChange = (e: any[]) => {
    // console.log('onLabelChange', e);
    labelsStore.setLabelCheck(e);
    // console.log('label', labelsStore);
  };
  return (
    <Checkbox.Group
      name='issue-label'
      onChange={onLabelChange}
      value={labelsStore.labelCheck}
    >
      <List
        className={Styles.SpaceList}
        itemLayout='horizontal'
        dataSource={labelsStore.pageData}
        split={false}
        renderItem={LabelListItem}
      ></List>
    </Checkbox.Group>
  );
});
