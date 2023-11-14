import { createContext } from 'react';

type ActiveElementsContextValue = string[];

const ActiveElementsContext = createContext<ActiveElementsContextValue | undefined>(undefined);

export default ActiveElementsContext;
