import { Card, List, Tag } from 'antd';
import React from 'react';
import Styles from './SpaceList.scss';
// import GEmojiElement from '@github/g-emoji-element';
type Props = {
  issues?: any;
};
export const SpaceList = ({ issues }: Props) => {
  console.groupCollapsed('spaceList');
  console.log('issues', issues);
  console.groupEnd();
  const SpaceListItem = (item: any, index: number) => {
    const v = item.node;
    const toGithubComment = (v?: any) => {
      //
    };
    const Footer = () => {
      const love = (
        <div onClick={() => toGithubComment(item.node.number)}>
          <g-emoji
            alias='heart'
            fallback-src='https://github.githubassets.com/images/icons/emoji/unicode/2764.png'
            class='emoji mr-1'
          >
            ❤️
          </g-emoji>
          {item.node.reactions.totalCount}
        </div>
      );
      const reviews = (
        <div onClick={(e) => toGithubComment(item.node.number)}>
          <g-emoji
            class='g-emoji'
            alias='speech_balloon'
            fallback-src='https://github.githubassets.com/images/icons/emoji/unicode/1f4ac.png'
          >
            💬
          </g-emoji>
          {item.node.comments.totalCount}
        </div>
      );
      return (
        <div className={Styles.Footer}>
          {love} {reviews}
        </div>
      );
    };
    const labels = v.labels.edges ?? [];
    const labelTags = labels.map((item: any, index: number) => {
      const v = item.node;
      return (
        <Tag key={v.id} color={`#${v.color}`} title={v.description}>
          {v.name}
        </Tag>
      );
    });
    return (
      <List.Item>
        <Card
          className={Styles.SpaceCard}
          style={{ width: '100%' }}
          bordered={true}
          title={v.title}
          extra={<a href='#'>More</a>}
          actions={[<Footer key={v.id} />]}
        >
          <div>{labelTags}</div>
          <div dangerouslySetInnerHTML={{ __html: v.bodyHTML }}></div>
        </Card>
      </List.Item>
    );
  };
  return (
    <List
      className={Styles.SpaceList}
      itemLayout='horizontal'
      dataSource={issues}
      split={false}
      renderItem={SpaceListItem}
    ></List>
  );
};
