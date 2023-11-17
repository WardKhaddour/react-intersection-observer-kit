import { ObserverProvider } from 'react-intersection-observer-kit';
import SlowComponent from './components/SlowComponentParent';

function LazyImportComponent() {
  return (
    <ObserverProvider>
      <main>
        <section className='h-screen bg-red-100 flex items-center justify-center'>
          <p className='text-3xl font-bold text-cyan-950'>Hello</p>
        </section>
        <SlowComponent />
      </main>
    </ObserverProvider>
  );
}

export default LazyImportComponent;
