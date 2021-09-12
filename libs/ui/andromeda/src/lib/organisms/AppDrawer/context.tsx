import React, { createContext, useState, useContext, useCallback } from 'react';

interface AppDrawerContextData {
  readonly open: boolean;
  toggleAppDrawer(): void;
}

const AppDrawerContext = createContext<AppDrawerContextData>(
  {} as AppDrawerContextData
);

const AppDrawerProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleAppDrawer = useCallback(() => {
    setOpen((old) => !old);
  }, []);

  return (
    <AppDrawerContext.Provider value={{ toggleAppDrawer, open }}>
      {children}
    </AppDrawerContext.Provider>
  );
};

function useAppDrawer(): AppDrawerContextData {
  const context = useContext(AppDrawerContext);

  if (!context) {
    throw new Error('useAppDrawer must be used within AppDrawerProvider');
  }

  return context;
}

export { useAppDrawer, AppDrawerProvider };
