// src/contexts/index.tsx
import React from 'react';
import { UserStore } from '@/stores';
import { IssuesStore } from '@/stores/issues';
import { GET_ISSUES } from '@/graphql';
import GET_ISSUE from '@/graphql/repository/issues/GET_ISSUE';
import { LabelsStore } from '@/stores/issues/label';
import GET_LABELS from '@/graphql/repository/issues/labels/GET_LABELS';

const userStore = new UserStore();
const issuesStore = new IssuesStore(userStore, GET_ISSUES);
window.userStore = userStore;

const editStore = new IssuesStore(userStore, GET_ISSUE);
const labelsStore = new LabelsStore(userStore, GET_LABELS);

export const StoresContext = React.createContext({
  // 登录
  userStore,
  issuesStore,
  editStore,
  labelsStore,
});
