import React, { createContext, useState, useContext, useCallback } from 'react';

interface AppDrawerContextData {
  readonly open: boolean;
  toggleAppMenu(): void;
}

const AppMenuContext = createContext<AppDrawerContextData>(
  {} as AppDrawerContextData
);

const AppMenuProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleAppMenu = useCallback(() => {
    setOpen((old) => !old);
  }, []);

  return (
    <AppMenuContext.Provider value={{ toggleAppMenu, open }}>
      {children}
    </AppMenuContext.Provider>
  );
};

function useAppMenu(): AppDrawerContextData {
  const context = useContext(AppMenuContext);

  if (!context) {
    throw new Error('useAppDrawer must be used within AppDrawerProvider');
  }

  return context;
}

export { useAppMenu, AppMenuProvider };
