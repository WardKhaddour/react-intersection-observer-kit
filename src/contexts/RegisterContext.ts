import { RefObject, createContext } from 'react';
import { visibilityCallbacksType } from '../types/visibilityCallbacksType';

type RegisterContextValue = {
  register: (
    element: RefObject<HTMLElement>,
    callbacks?: {
      onVisible?: visibilityCallbacksType;
      onInvisible?: visibilityCallbacksType;
    },
  ) => void;
  unregister: (element: RefObject<HTMLElement>) => void;
};

const RegisterContext = createContext<RegisterContextValue | undefined>(undefined);

export default RegisterContext;
