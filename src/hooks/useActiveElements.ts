import { useContext } from 'react';
import { ActiveElementsContext } from '../contexts';

/**
 * React Hook for getting the active elements from registered elements in ObserverProvider.
 * @returns {string[]} Array containing active elements.
 */
function useActiveElements(): string[] {
  const activeElementsContext = useContext(ActiveElementsContext);

  if (!activeElementsContext) {
    throw new Error('ObserverProvider needs to be parent for components which uses useActiveElements');
  }
  return activeElementsContext;
}

export default useActiveElements;
