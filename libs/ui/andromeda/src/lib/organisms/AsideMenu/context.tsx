import React, { createContext, useState, useContext, useCallback } from 'react';

interface AppDrawerContextData {
  readonly open: boolean;
  toggleAsideMenu(): void;
}

const AsideMenuContext = createContext<AppDrawerContextData>(
  {} as AppDrawerContextData
);

const AsideMenuProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleAsideMenu = useCallback(() => {
    setOpen((old) => !old);
  }, []);

  return (
    <AsideMenuContext.Provider value={{ toggleAsideMenu, open }}>
      {children}
    </AsideMenuContext.Provider>
  );
};

function useAsideMenu(): AppDrawerContextData {
  const context = useContext(AsideMenuContext);

  if (!context) {
    throw new Error('useAppDrawer must be used within AppDrawerProvider');
  }

  return context;
}

export { useAsideMenu, AsideMenuProvider };
