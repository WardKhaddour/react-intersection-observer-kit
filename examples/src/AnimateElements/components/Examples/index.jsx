import { useRegister } from 'react-intersection-observer-kit';
import { Link } from 'react-router-dom';

function Examples({ isActive }) {
  const ref = useRegister('examples');

  return (
    <section
      ref={ref}
      className={`min-h-[70vh] ${
        isActive ? 'bg-teal-600' : 'bg-gray-500'
      } m-20 rounded-md flex items-center justify-center flex-col gap-5 transition-colors duration-300 text-gray-950 shadow-lg`}
    >
      <div className={`px-6 text-center ${isActive ? 'opacity-100' : 'opacity-0 '} transition-all duration-200`}>
        <h2 className='text-4xl font-bold  mb-4'>Explore Examples</h2>
        <p className=' mb-8'>Check out more examples to see the React Intersection Observer Kit in action:</p>

        <ul className='flex flex-col items-center gap-4'>
          <li>
            <Link to='lazy-fetch' className='text-teal-300 hover:text-teal-100 transition-colors duration-300'>
              Lazy Fetching Data
            </Link>
          </li>
          <li>
            <Link to='lazy-load' className='text-teal-300 hover:text-teal-100 transition-colors duration-300'>
              Lazy Load Component
            </Link>
          </li>
          <li>
            <Link to='lazy-import' className='text-teal-300 hover:text-teal-100 transition-colors duration-300'>
              Lazy Import Component
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Examples;
