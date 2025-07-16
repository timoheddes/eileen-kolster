import { useCallback } from 'react';

// Cache for preloaded components
const preloadedComponents = new Map<
  string,
  Promise<{ default: React.ComponentType }>
>();

export const usePreload = () => {
  const preloadComponent = useCallback((componentPath: string) => {
    if (!preloadedComponents.has(componentPath)) {
      // Start loading the component
      const loadPromise = import(componentPath);
      preloadedComponents.set(componentPath, loadPromise);
    }
  }, []);

  return { preloadComponent };
};
