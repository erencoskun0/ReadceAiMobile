import React, { createContext, useContext, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

// Tema renkleri
export const theme = {
  colors: {
    background: '#F8FAFF', // Search ve Dictionary ekranlarındaki arka plan rengi
    primary: '#000957',
    accent: '#98D8EF',
    text: {
      primary: '#000957',
      secondary: '#666666',
      light: '#9E9E9E',
    },
  },
};

// Tema için Context
interface ThemeContextType {
  theme: typeof theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider bileşeni
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

// Tema değerlerine erişmek için Hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Genel stil oluşturucu
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
});
