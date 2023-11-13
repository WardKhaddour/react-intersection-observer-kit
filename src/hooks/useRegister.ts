import { useContext, useEffect, useRef } from 'react';
import { RegisterContext } from '../contexts';
import { useVisibilityCallbacks } from './';
import { visibilityCallbacksType } from '../types/visibilityCallbacksType';

/**
 * React Hook for registering and un-registering a DOM element with the ObserverProvider.
 * @template T - The type of the HTML element to be registered.
 * @param {string} [id] - Optional ID to assign to the registered element, Must be specified if the element do not have an ID in order to work properly.
 * @returns {React.RefObject<T>} A ref object representing the registered HTML element.
 */
function useRegister<T extends HTMLElement>(
  id?: string,
  options?: { onEntryVisible?: visibilityCallbacksType; onEntryInvisible?: visibilityCallbacksType },
): React.RefObject<T> {
  const ref = useRef<T>(null);
  const registerContext = useContext(RegisterContext);
  const { onEntryVisible, onEntryInvisible } = options ?? {};

  if (!registerContext) {
    throw new Error('ObserverProvider needs to be parent for components which uses useRegister');
  }

  const { register, unregister } = registerContext;
  const { addHandlers, removeHandlers } = useVisibilityCallbacks();

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
        onVisible: onEntryVisible,
        onInvisible: onEntryInvisible,
      });

    return () => {
      if (currentId) removeHandlers(currentId);
    };
  }, [id, addHandlers, removeHandlers, onEntryVisible, onEntryInvisible]);

  return ref;
}

export default useRegister;
