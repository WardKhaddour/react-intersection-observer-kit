import { useContext } from 'react';
import { VisibilityCallbacksContext } from '../contexts';

const useVisibilityCallbacks = () => {
  const context = useContext(VisibilityCallbacksContext);
  if (!context) {
    throw new Error('useVisibilityCallbacks must be used within a VisibilityCallbacksProvider');
  }
  return context;
};

export default useVisibilityCallbacks;
