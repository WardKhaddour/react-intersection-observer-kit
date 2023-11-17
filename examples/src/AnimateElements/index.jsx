import Main from './components/Main';
import Nav from './components/Nav';
import { ObserverProvider } from 'react-intersection-observer-kit';

function AnimateElements() {
  return (
    <>
      <ObserverProvider
        options={{
          threshold: 0.8,
        }}
      >
        <header className='w-full fixed top-0 left-0 bg-gray-800 '>
          <Nav />
        </header>
        <Main />
      </ObserverProvider>
      <footer className='block w-full h-fit p-5 text-center bg-gray-950 text-white rounded-t-md '>
        <p>&copy; 2023 React Intersection Observer Kit | Created by Ward Khaddour</p>
      </footer>
    </>
  );
}

export default AnimateElements;
