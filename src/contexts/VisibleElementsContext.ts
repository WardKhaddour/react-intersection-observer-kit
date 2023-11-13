import { createContext } from 'react';

type VisibleElementsContextValue = string[];

const VisibleElementsContext = createContext<VisibleElementsContextValue | undefined>(undefined);

export default VisibleElementsContext;
