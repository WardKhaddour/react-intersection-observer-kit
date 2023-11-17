import {
  Route,
  BrowserRouter,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import LazyFetchingData from './LazyFetchingData';
import LazyLoadComponent from './LazyLoadingComponent';
import AnimateElements from './AnimateElements';

const router = createBrowserRouter([
  { path: '/react-intersection-observer-kit/', element: <AnimateElements /> },
  {
    path: '/react-intersection-observer-kit/lazy-fetch',
    element: <LazyFetchingData />,
  },
  {
    path: '/react-intersection-observer-kit/lazy-load',
    element: <LazyLoadComponent />,
  },
]);

function App() {
  return (
    <>
      Hello
      <RouterProvider router={router} />
    </>
  );
}

export default App;
