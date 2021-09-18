import React, { createContext, useState, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
}

export interface ToastMessage {
  id: number;
  type?: 'info' | 'success' | 'error';
  message: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const addToast = useCallback(
    ({ type, message }) => {
      const toast = {
        id: Date.now(),
        type,
        message,
      };
      enqueueSnackbar(toast.message, {
        variant: toast.type,
        autoHideDuration: 5000,
      });
      // setToasts((state) => [...state, toast]);
    },
    [enqueueSnackbar]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

export { useToast, ToastProvider };
