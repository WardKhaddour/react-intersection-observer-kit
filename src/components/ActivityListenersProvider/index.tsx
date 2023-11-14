import { useReducer, ReactNode, useCallback } from 'react';
import { ActivityListenersContext } from '../../contexts';
import { activityListenerType } from '../../types/activityListenerType';

type StateType = Map<string, { onActive?: activityListenerType; onInactive?: activityListenerType }>;

type ActionType = {
  type: 'add' | 'remove';
  payload: {
    id: string;
    handlers?: { onActive?: activityListenerType; onInactive?: activityListenerType };
  };
};

const initialState: StateType = new Map<
  string,
  { onActive?: activityListenerType; onInactive?: activityListenerType }
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
 * Provider to get access to changes in active state of some entry.
 * @param {ReactNode | ReactNode []} [props.children]  Components which needs access to the useHandlers Hook.
 * @returns [ReactNode] Activity Listeners Provider
 */
function ActivityListenersProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [state, dispatch] = useReducer(handlersReducer, initialState);

  const handleAddHandlers = useCallback(
    (id: string, handlers: { onActive?: activityListenerType; onInactive?: activityListenerType }) => {
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
    <ActivityListenersContext.Provider
      value={{
        getHandlers: handleGetHandlers,
        addHandlers: handleAddHandlers,
        removeHandlers: handleRemoveHandlers,
      }}
    >
      {children}
    </ActivityListenersContext.Provider>
  );
}

export default ActivityListenersProvider;
