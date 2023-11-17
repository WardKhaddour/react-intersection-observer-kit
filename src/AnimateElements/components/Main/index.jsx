import { useActiveElements } from 'react-intersection-observer-kit';
import Welcome from '../Welcome';
import GetStarted from '../GetStarted';
import Features from '../Features';
import Examples from '../Examples';

function Main() {
  const activeElements = useActiveElements();
  return (
    <main className='mt-24'>
      <Welcome isActive={activeElements.includes('introduction')} />
      <Features isActive={activeElements.includes('features')} />
      <GetStarted isActive={activeElements.includes('get-started')} />
      <Examples isActive={activeElements.includes('examples')} />
    </main>
  );
}

export default Main;
