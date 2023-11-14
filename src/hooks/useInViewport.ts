import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  observerOptions?: IntersectionObserverInit;
  inViewCondition?: (entry: IntersectionObserverEntry) => boolean;
};

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const defaultInViewCondition = (entry: IntersectionObserverEntry): boolean => entry.isIntersecting;

/**
 * @note This Hook is independent from Observer Provider, It can be used outside ObserverProvider or without using it at all.
 * React Hook for detecting if an element is in viewport or not
 * @template T - The type of the HTML element which will gets the ref.
 * @param {IntersectionObserverInit} [props.observerOptions] - Options for overriding the default options for Intersection Observer
 * @param {(entry: IntersectionObserverEntry) => boolean} [props.inViewCondition] - Callback to determine whether to update inViewPort state.
 * @returns {[RefObject<T>, boolean]} A tuple containing the element ref and a boolean indicating if the element is in the viewport.
 * Use the returned ref to start observing an element.
 */
function useInViewport<T extends HTMLElement>(props?: Props): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [inViewport, setInViewport] = useState<boolean>(false);
  const inViewCondition = props?.inViewCondition || defaultInViewCondition;

  const observerOptions = props?.observerOptions;

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setInViewport(inViewCondition(entry));
    },
    [inViewCondition],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      ...options,
      ...observerOptions,
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observerOptions, handleIntersect]);

  return [elementRef, inViewport];
}

export default useInViewport;
