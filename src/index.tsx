import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.scss';
import '@github/g-emoji-element';
import App from './App';
// for observer batching
// import 'mobx-react-lite/batchingForReactDom';
import SentryContext from '@/modules/error/sentry-context';
import Fallback from '@/modules/error/sentry-fallback';
import Sentry from '@/modules/error/sentry';
import * as serviceWorker from './serviceWorker';

const _env = process.env.ENV;

_env !== 'development' &&
  Sentry.init({
    dsn:
      'https://24f9861a9726431c8a151477aed6d0fe@o447167.ingest.sentry.io/5426800',
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
    environment: _env,
  });

SentryContext();
// <React.StrictMode>
//   <App />
// </React.StrictMode>
ReactDOM.render(
  <Sentry.ErrorBoundary fallback={Fallback} showDialog>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
