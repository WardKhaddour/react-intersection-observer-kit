import { createHashRouter, RouterProvider } from 'react-router-dom';
import LazyFetchingData from './LazyFetchingData';
import LazyLoadComponent from './LazyLoadingComponent';
import AnimateElements from './AnimateElements';

const router = createHashRouter([
  { path: '/', element: <AnimateElements /> },
  {
    path: '/lazy-fetch',
    element: <LazyFetchingData />,
  },
  {
    path: '/lazy-load',
    element: <LazyLoadComponent />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
