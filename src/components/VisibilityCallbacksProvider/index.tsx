import { useReducer, ReactNode, useCallback } from 'react';
import { VisibilityCallbacksContext } from '../../contexts';
import { visibilityCallbacksType } from '../../types/visibilityCallbacksType';

type StateType = Map<string, { onVisible?: visibilityCallbacksType; onInvisible?: visibilityCallbacksType }>;

type ActionType = {
  type: 'add' | 'remove';
  payload: {
    id: string;
    handlers?: { onVisible?: visibilityCallbacksType; onInvisible?: visibilityCallbacksType };
  };
};

const initialState: StateType = new Map<
  string,
  { onVisible?: visibilityCallbacksType; onInvisible?: visibilityCallbacksType }
>();

const handlersReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'add':
      state.set(action.payload.id, action.payload.handlers ?? {});
      return state;
    case 'remove':
      state.delete(action.payload.id);
      return state;
    default:
      return state;
  }
};

/**
 * Provider to get access to change handlers related to visibility of some entry.
 * @param {ReactNode | ReactNode []} [props.children]  Components which needs access to the useHandlers Hook.
 * @returns [ReactNode] Visibility Callbacks Provider
 */
function VisibilityCallbacksProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [state, dispatch] = useReducer(handlersReducer, initialState);

  const handleAddHandlers = useCallback(
    (id: string, handlers: { onVisible?: visibilityCallbacksType; onInvisible?: visibilityCallbacksType }) => {
      dispatch({
        type: 'add',
        payload: {
          id,
          handlers,
        },
      });
    },
    [],
  );

  const handleRemoveHandlers = useCallback((id: string) => {
    dispatch({
      type: 'remove',
      payload: {
        id,
      },
    });
  }, []);

  const handleGetHandlers = useCallback(
    (id: string) => {
      return state.get(id);
    },
    [state],
  );

  return (
    <VisibilityCallbacksContext.Provider
      value={{
        getHandlers: handleGetHandlers,
        addHandlers: handleAddHandlers,
        removeHandlers: handleRemoveHandlers,
      }}
    >
      {children}
    </VisibilityCallbacksContext.Provider>
  );
}

export default VisibilityCallbacksProvider;
