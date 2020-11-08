// src/contexts/index.tsx
import React from 'react';
import { UserStore } from '@/stores';

const userStore = new UserStore();

window.userStore = userStore;
export const StoresContext = React.createContext({
  // 登录
  userStore,
});
