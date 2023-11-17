import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';

import { ActiveElementsContext } from '../../contexts';
import { useActivityListeners } from '../../hooks';

type Props = {
  children: ReactNode[] | ReactNode;
  elements: RefObject<HTMLElement>[];
  options: IntersectionObserverInit;
  activeCondition: (entry: IntersectionObserverEntry) => boolean;
};

/**
 * Provider to get access to currently active elements.
 * @param { ReactNode[] | ReactNode} [props.children] Components which needs access to the active element.
 * @param {RefObject<HTMLElement>[]} [props.elements] Elements that will be observed.
 * @param {IntersectionObserverInit} [props.options] Intersection Observer options.
 * @param {(entry: IntersectionObserverEntry) => boolean} [props.activeCondition] Callback to determine whether to update the active elements array or not.
 * @returns {ReactNode} the Active Elements Context Provider
 */

function ActiveElementsProvider({ children, elements, options, activeCondition }: Props): ReactNode {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const { getHandlers } = useActivityListeners();

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const { onActive, onInactive } = getHandlers(entry.target.id) ?? {};

        if (activeCondition(entry)) {
          onActive?.(entry);
          setActiveElements((prev) => [...prev, entry.target.id]);
        } else {
          onInactive?.(entry);
          setActiveElements((prev) => prev.filter((el) => el !== entry.target.id));
        }
      });
    },
    [activeCondition, getHandlers],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, options);

    elements.forEach((element) => {
      if (element.current) observer.observe(element.current);
    });

    return () => {
      elements.forEach((element) => {
        if (element.current) observer.unobserve(element.current);
      });
    };
  }, [elements, handleIntersect, options]);

  return <ActiveElementsContext.Provider value={activeElements}>{children}</ActiveElementsContext.Provider>;
}
export default ActiveElementsProvider;
