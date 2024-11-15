import React, { createContext, useContext, useState } from 'react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within a Dialog component');

  const { setIsOpen } = context;

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setIsOpen(true),
    });
  }

  return (
    <button onClick={() => setIsOpen(true)}>
      {children}
    </button>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogContent must be used within a Dialog component');

  const { isOpen, setIsOpen } = context;

  if (!isOpen) return null;

  return (
    <div className="fixed px-1 inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60">
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
        <button
          className="absolute text-3xl top-0 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = '' }: DialogContentProps) {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left p-4 pt-2 ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '' }: DialogContentProps) {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function DialogDescription({ children, className = '' }: DialogContentProps) {
  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
}