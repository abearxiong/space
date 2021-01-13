import { toGithubIssues } from '@/api';
import { UserRepository } from '@/stores';
import { Card, List, Tag } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Styles from './SpaceList.scss';
// import GEmojiElement from '@github/g-emoji-element';
type Props = {
  issues?: any;
  repository: UserRepository;
};
export const SpaceList = ({ issues, repository: { owner, name } }: Props) => {
  const history = useHistory();
  console.groupCollapsed('spaceList');
  console.log('issues', issues);
  console.groupEnd();
  const SpaceListItem = (item: any, index: number) => {
    const v = item.node;
    const toGithubComment = (v?: any) => {
      const url = `https://github.com/${owner}/${name}/issues/${v}`;
      window.open(url);
    };
    const Footer = () => {
      // 若刚建立，则不处理
      const love = (
        <div onClick={() => toGithubComment(item.node.number)}>
          <g-emoji
            alias='heart'
            fallback-src='https://github.githubassets.com/images/icons/emoji/unicode/2764.png'
            class='emoji mr-1'
          >
            ❤️
          </g-emoji>
          {item.node?.reactions?.totalCount}
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
          {item.node?.comments?.totalCount}
        </div>
      );
      return (
        <div className={Styles.Footer} title='默认转到gituhub issues'>
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
    const More = (
      <div className={Styles.CardMore} style={{ display: 'flex' }}>
        <a
          onClick={() => {
            const url = toGithubIssues({
              owner,
              name,
              index: item.node.number,
            });
            window.open(url);
          }}
        >
          More
        </a>
        <a
          onClick={() => history.push(`/edit/new`, { index: item.node.number })}
        >
          Edit
        </a>
      </div>
    );
    return (
      <List.Item>
        <Card
          className={Styles.SpaceCard}
          style={{ width: '100%' }}
          bordered={true}
          title={v.title}
          extra={More}
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
