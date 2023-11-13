import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';

import { VisibleElementsContext } from '../../contexts';
import { useVisibilityCallbacks } from '../../hooks';

type Props = {
  children: ReactNode[] | ReactNode;
  elements: RefObject<HTMLElement>[];
  options: IntersectionObserverInit;
  updateCondition: (entry: IntersectionObserverEntry) => boolean;
};

/**
 * Provider to get access to currently visible elements.
 * @param { ReactNode[] | ReactNode} [props.children] Components which needs access to the visible element.
 * @param {RefObject<HTMLElement>[]} [props.elements] Elements that will be observed.
 * @param {IntersectionObserverInit} [props.options] Intersection Observer options.
 * @param {(entry: IntersectionObserverEntry) => boolean} [props.updateCondition] Callback to determine whether to update the visible elements array or not.
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryVisible] optional callback, will be invoked when updateCondition became true.
 * @param {(entry: IntersectionObserverEntry) => void} [props.onEntryInvisible] optional callback, will be invoked when updateCondition became false.
 * @returns {ReactNode} the Visible Elements Context Provider
 */

function VisibleElementsProvider({ children, elements, options, updateCondition }: Props): ReactNode {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const { getHandlers } = useVisibilityCallbacks();

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const { onVisible, onInvisible } = getHandlers(entry.target.id) ?? {};

        if (updateCondition(entry)) {
          onVisible?.(entry);
          setVisibleElements((prev) => [...prev, entry.target.id]);
        } else {
          onInvisible?.(entry);
          setVisibleElements((prev) => prev.filter((el) => el !== entry.target.id));
        }
      });
    },
    [updateCondition, getHandlers],
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

  return <VisibleElementsContext.Provider value={visibleElements}>{children}</VisibleElementsContext.Provider>;
}
export default VisibleElementsProvider;
