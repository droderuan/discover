import React, { createContext, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import RootStore from '../stores/Root';
import AuthStore from '../stores/Auth';
import UserStore from '../stores/User';

interface IStoreContextData {
  authStore: AuthStore;
  userStore: UserStore;
}

const StoreContext = createContext<IStoreContextData>({} as IStoreContextData);

export const StoreProvider: React.FC = observer(({ children }) => {
  const { authStore, userStore } = new RootStore();

  return (
    <StoreContext.Provider value={{ authStore, userStore }}>
      {children}
    </StoreContext.Provider>
  );
});

export function useStore(): IStoreContextData {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('Store context must be used within StoreProvider');
  }

  return context;
}
