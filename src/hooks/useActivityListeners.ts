import { useContext } from 'react';
import { ActivityListenersContext } from '../contexts';

const useActivityListeners = () => {
  const context = useContext(ActivityListenersContext);
  if (!context) {
    throw new Error('useActivityListeners must be used within a ActivityListenersProvider');
  }
  return context;
};

export default useActivityListeners;
