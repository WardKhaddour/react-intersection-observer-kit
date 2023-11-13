import { useContext } from 'react';
import { VisibleElementsContext } from '../contexts';

/**
 * React Hook for getting the visible elements from registered elements in ObserverProvider.
 * @returns {string[]} Array containing visible elements.
 */
function useVisibleElements(): string[] {
  const visibleElementsContext = useContext(VisibleElementsContext);

  if (!visibleElementsContext) {
    throw new Error('ObserverProvider needs to be parent for components which uses useVisibleElements');
  }
  return visibleElementsContext;
}

export default useVisibleElements;
