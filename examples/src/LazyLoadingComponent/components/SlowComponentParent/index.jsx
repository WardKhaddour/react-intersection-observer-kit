import { Suspense, lazy } from 'react';
import { useInViewport } from 'react-intersection-observer-kit';

const VerySlowComponent = lazy(() => import('../VerySlowComponent'));

function SlowComponentParent() {
  const [ref, inViewport] = useInViewport();

  return (
    <div
      ref={ref}
      className={`h-56 transition-opacity ${inViewport ? 'opacity-100' : 'opacity-0'} ease-in-out duration-500`}
    >
      {inViewport ? (
        <Suspense fallback={<div className='text-gray-600'>Loading...</div>}>
          <VerySlowComponent />
        </Suspense>
      ) : null}
    </div>
  );
}

export default SlowComponentParent;
