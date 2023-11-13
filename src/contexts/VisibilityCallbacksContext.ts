import { createContext } from 'react';
import { visibilityCallbacksType } from '../types/visibilityCallbacksType';

type VisibilityCallbacksContextType = {
  addHandlers: (
    id: string,
    handlers: { onVisible?: visibilityCallbacksType; onInvisible?: visibilityCallbacksType },
  ) => void;

  removeHandlers: (id: string) => void;

  getHandlers: (id: string) =>
    | {
        onVisible?: visibilityCallbacksType | undefined;
        onInvisible?: visibilityCallbacksType | undefined;
      }
    | undefined;
};

const VisibilityCallbacksContext = createContext<VisibilityCallbacksContextType | undefined>(undefined);

export default VisibilityCallbacksContext;
