// src/hooks/use-stores.tsx
import React from 'react';
import { StoresContext } from '@/modules/contexts';

export const useStores = () => React.useContext(StoresContext);
