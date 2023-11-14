import { createContext } from 'react';
import { activityListenerType } from '../types/activityListenerType';

type ActivityListenersContextType = {
  addHandlers: (id: string, handlers: { onActive?: activityListenerType; onInactive?: activityListenerType }) => void;

  removeHandlers: (id: string) => void;

  getHandlers: (id: string) =>
    | {
        onActive?: activityListenerType | undefined;
        onInactive?: activityListenerType | undefined;
      }
    | undefined;
};

const ActivityListenersContext = createContext<ActivityListenersContextType | undefined>(undefined);

export default ActivityListenersContext;
