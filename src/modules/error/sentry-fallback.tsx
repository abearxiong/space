import React from 'react';
import { Result, Button, Typography } from 'antd';
// import Sentry from './sentry';

const { Paragraph, Text } = Typography;

type Props = {
  error: Error | null;
  componentStack: string | null;
  resetError(): void;
  eventId: string | null;
};

const Fallback: React.FC<Props> = ({ error, componentStack, resetError }) => (
  <React.Fragment>
    <Result
      status='error'
      title='意外错误'
      subTitle='非常抱歉，您遇到了一些在我们意料之外的错误。'
      extra={[
        <Button
          type='primary'
          key='console'
          onClick={() => {
            resetError();
          }}
        >
          点击重置页面
        </Button>,
      ]}
    >
      <div>
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            您可以尝试点击重置按钮或刷新您的页面。
          </Text>
        </Paragraph>
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            如果还是出现该问题，请向我们反馈。
          </Text>
        </Paragraph>
      </div>
    </Result>
  </React.Fragment>
);

export default Fallback;
