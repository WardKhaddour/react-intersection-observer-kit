import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LazyFetchingData from './LazyFetchingData';
import LazyLoadComponent from './LazyLoadingComponent';
import LazyImportComponent from './LazyImportComponent';
import HighlightNavLinks from './NavLinksHighlight';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to='lazy-fetch' />} path='/' index></Route>
        <Route element={<LazyFetchingData />} path='/lazy-fetch'></Route>
        <Route element={<LazyLoadComponent />} path='/lazy-load'></Route>
        <Route element={<LazyImportComponent />} path='/lazy-import'></Route>
        <Route element={<HighlightNavLinks />} path='/nav-links'></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
