import { ReactNode, RefObject, useCallback, useReducer } from 'react';
import ActiveElementsProvider from '../ActiveElementsProvider';
import RegisterProvider from '../RegisterProvider';
import ActivityListenersProvider from '../ActivityListenersProvider';

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
 * Default condition for updating active elements, updates elements when the entry is intersecting
 * @param {IntersectionObserverEntry} [entry] Intersection observer entry
 * @returns {boolean} if the condition is set or not
 */
const defaultActiveCondition = (entry: IntersectionObserverEntry): boolean => entry.isIntersecting;

type Props = {
  children: ReactNode[] | ReactNode;
  options?: IntersectionObserverInit;
  activeCondition?: (entry: IntersectionObserverEntry) => boolean;
};

/**
 * Wrapper for using Intersection Observer in React, providing access to useRegister and useActiveElements hooks.
 * @param {ReactNode[] | ReactNode} [props.children] - Components which needs access to the useRegister and useActiveElements Hooks.
 * @param {IntersectionObserverInit} [props.options] - Options for overriding the default options for Intersection Observer.
 * @param {(entry: IntersectionObserverEntry) => boolean} [props.activeCondition] - Callback to determine whether to update the active elements array or not.
 * @returns {ReactNode}.
 */
function ObserverProvider({ children, options, activeCondition = defaultActiveCondition }: Props): ReactNode {
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
    <ActivityListenersProvider>
      <ActiveElementsProvider
        activeCondition={activeCondition}
        elements={state.elements}
        options={{ ...observerOptions, ...options }}
      >
        <RegisterProvider registerElement={registerElement} unregisterElement={unregisterElement}>
          {children}
        </RegisterProvider>
      </ActiveElementsProvider>
    </ActivityListenersProvider>
  );
}

export default ObserverProvider;
