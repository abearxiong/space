import Sentry from './sentry';
import { getUserinfo } from '@/stores';

const SentryContext = () => {
  const { username } = getUserinfo() ?? {};
  Sentry.setUser({ username });
};

export default SentryContext;
