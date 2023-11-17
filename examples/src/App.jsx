import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LazyFetchingData from './LazyFetchingData';
import LazyLoadComponent from './LazyLoadingComponent';
import AnimateElements from './AnimateElements';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AnimateElements />} path='/' index />
        <Route element={<LazyFetchingData />} path='/lazy-fetch' />
        <Route element={<LazyLoadComponent />} path='/lazy-load' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
