import { RefObject, createContext } from 'react';
import { activityListenerType } from '../types/activityListenerType';

type RegisterContextValue = {
  register: (
    element: RefObject<HTMLElement>,
    callbacks?: {
      onActive?: activityListenerType;
      onInactive?: activityListenerType;
    },
  ) => void;
  unregister: (element: RefObject<HTMLElement>) => void;
};

const RegisterContext = createContext<RegisterContextValue | undefined>(undefined);

export default RegisterContext;
