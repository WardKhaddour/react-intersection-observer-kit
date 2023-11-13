import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

/**
 * @note This Hook is independent from Observer Provider, It can be used outside ObserverProvider or without using it at all.
 * React Hook for detecting if an element is in viewport or not
 * @template T - The type of the HTML element which will gets the ref.
 * @param {IntersectionObserverInit} [observerOptions] - Options for overriding the default options for Intersection Observer
 * @returns {[RefObject<T>, boolean]} A tuple containing the element ref and a boolean indicating if the element is in the viewport.
 * Use the returned ref to start observing an element.
 */
function useInViewport<T extends HTMLElement>(observerOptions?: IntersectionObserverInit): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [inViewport, setInViewport] = useState<boolean>(false);

  const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setInViewport(entry.isIntersecting);
  }, []);

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
