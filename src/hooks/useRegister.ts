import { useContext, useEffect, useRef } from 'react';
import { RegisterContext } from '../contexts';
import { useActivityListeners } from './';
import { activityListenerType } from '../types/activityListenerType';

/**
 * React Hook for registering and un-registering a DOM element to track it with ObserverProvider.
 * @template T - The type of the HTML element to be registered.
 * @param {string} [id] - Optional ID to assign to the registered element, Must be specified if the element do not have an ID in order to work properly.
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryActive] optional callback, will be invoked when activeCondition became true.
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryInactive] optional callback, will be invoked when activeCondition became false.
 * @returns {React.RefObject<T>} A ref object representing the registered HTML element.
 */
function useRegister<T extends HTMLElement>(
  id?: string,
  options?: { onEntryActive?: activityListenerType; onEntryInactive?: activityListenerType },
): React.RefObject<T> {
  const ref = useRef<T>(null);
  const registerContext = useContext(RegisterContext);
  const { onEntryActive, onEntryInactive } = options ?? {};

  if (!registerContext) {
    throw new Error('ObserverProvider needs to be parent for components which uses useRegister');
  }

  const { register, unregister } = registerContext;
  const { addHandlers, removeHandlers } = useActivityListeners();

  useEffect(() => {
    if (id && ref.current) {
      ref.current.id = id;
    }

    if (!ref.current?.id) {
      throw new Error('Element must have an ID property');
    }

    register(ref);

    return () => {
      unregister(ref);
    };
  }, [id, register, unregister]);

  useEffect(() => {
    const currentId = id || ref.current?.id;

    if (currentId)
      addHandlers(currentId, {
        onActive: onEntryActive,
        onInactive: onEntryInactive,
      });

    return () => {
      if (currentId) removeHandlers(currentId);
    };
  }, [id, addHandlers, removeHandlers, onEntryActive, onEntryInactive]);

  return ref;
}

export default useRegister;
