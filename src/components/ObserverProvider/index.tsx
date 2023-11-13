import { ReactNode, RefObject, useCallback, useReducer } from 'react';
import VisibleElementsProvider from '../VisibleElementsProvider';
import RegisterProvider from '../RegisterProvider';
import { visibilityCallbacksType } from '../../types/visibilityCallbacksType';

type Action =
  | { type: 'register'; payload: RefObject<HTMLElement> }
  | { type: 'unregister'; payload: RefObject<HTMLElement> };

type State = {
  elements: RefObject<HTMLElement>[];
};

const initialState: State = {
  elements: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };

    case 'unregister':
      return {
        ...state,
        elements: state.elements.filter((element) => element !== action.payload),
      };

    default:
      return state;
  }
};
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

/**
 * Default condition for updating visible elements, updates elements when the entry is intersecting
 * @param {IntersectionObserverEntry} [entry] Intersection observer entry
 * @returns {boolean} if the condition is set or not
 */
const updateOn = (entry: IntersectionObserverEntry): boolean => entry.isIntersecting;

type Props = {
  children: ReactNode[] | ReactNode;
  options?: IntersectionObserverInit;
  updateCondition?: (entry: IntersectionObserverEntry) => boolean;
  onEntryVisible?: visibilityCallbacksType;
  onEntryInvisible?: visibilityCallbacksType;
};

/**
 * Wrapper for using Intersection Observer in React, providing access to useRegister and useVisibleElements hooks.
 * @param {ReactNode[] | ReactNode} [props.children] - Components which needs access to the useRegister and useVisibleElements Hooks.
 * @param {ObserverProviderOptions} [props.options] - Options for overriding the default options for Intersection Observer.
 * @param {(entry: IntersectionObserverEntry) => boolean} [props.updateCondition] - Callback to determine whether to update the visible elements array or not.
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryVisible] - An optional callback, will be invoked when updateCondition became true..
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryInvisible] - An optional callback, will be invoked when updateCondition became false..
 * @returns {ReactNode}.
 */
function ObserverProvider({
  children,
  options,
  updateCondition = updateOn,
  onEntryInvisible,
  onEntryVisible,
}: Props): ReactNode {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerElement = useCallback((ref: RefObject<HTMLElement>) => {
    dispatch({
      type: 'register',
      payload: ref,
    });
  }, []);

  const unregisterElement = useCallback((ref: RefObject<HTMLElement>) => {
    dispatch({
      type: 'unregister',
      payload: ref,
    });
  }, []);

  return (
    <VisibleElementsProvider
      updateCondition={updateCondition}
      onEntryInvisible={onEntryInvisible}
      onEntryVisible={onEntryVisible}
      elements={state.elements}
      options={{ ...observerOptions, ...options }}
    >
      <RegisterProvider registerElement={registerElement} unregisterElement={unregisterElement}>
        {children}
      </RegisterProvider>
    </VisibleElementsProvider>
  );
}

export default ObserverProvider;
