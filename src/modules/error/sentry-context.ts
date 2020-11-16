import Sentry from './sentry';
import { getUserinfo } from '@/stores';

const SentryContext = () => {
  const { email } = getUserinfo() ?? {};
  Sentry.setUser({ email });
};

export default SentryContext;
