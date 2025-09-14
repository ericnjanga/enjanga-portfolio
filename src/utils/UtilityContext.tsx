/**
 * Utility Context:
 * ---------------
 * Provides global application values and utilities to avoid prop drilling.
 *
 * Available values:
 * - brand: Contains brand information (name, logo, etc.)
 *
 * Usage:
 * const { brand } = AppUseUtility();
 *
 * Provider should wrap the application root (see client-layout.tsx)
 *
 * Best Practices:
 * > Type Safety - Excellent TypeScript usage with proper interfaces
 * > Error Handling - Good custom hook with error checking
 * > Separation of Concerns - Clear division between client and server components
 * > Scalability - Context structure allows for easy future expansion
 */
import { createContext, useContext, ReactNode, useMemo } from 'react';

interface UtilityContextType {
  brand: {
    name: string;
    logo?: React.ReactNode; // Optional logo component
    slogan?: string;
  };

  features?: {
    darkMode: boolean;
    maintenance: boolean;
  };

  config?: {
    apiBaseUrl: string;
    env: 'development' | 'production';
  };
}

const defaultUtilityContext: UtilityContextType = {
  brand: {
    name: 'Eric Njanga',
    slogan: 'Software engineer & Design technologist',
  },
};

const UtilityContext = createContext<UtilityContextType | undefined>(undefined);

export const AppUtilityProvider = ({ children }: { children: ReactNode }) => {
  // Context values ...
  // Can be fetched from an external API ...
  const contextValues = useMemo(
    () => ({
      brand: { ...defaultUtilityContext.brand },
    }),
    []
  ); // Will only conpute once

  return (
    <UtilityContext.Provider value={contextValues}>
      {children}
    </UtilityContext.Provider>
  );
};

export const AppUseUtility = () => {
  const context = useContext(UtilityContext);
  if (!context) {
    throw new Error('AppUseUtility must be used within a AppUtilityProvider');
  }

  return context;
};
