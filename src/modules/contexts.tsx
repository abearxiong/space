// src/contexts/index.tsx
import React from 'react';
import { UserStore } from '@/stores';
import { IssuesStore } from '@/stores/issues';
import { GET_ISSUES } from '@/graphql';

const userStore = new UserStore();
const issuesStore = new IssuesStore(userStore, GET_ISSUES);
window.userStore = userStore;
export const StoresContext = React.createContext({
  // 登录
  userStore,
  issuesStore,
});
