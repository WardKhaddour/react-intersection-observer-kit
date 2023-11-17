import { useRegister } from 'react-intersection-observer-kit';

function Welcome({ isActive }) {
  const ref = useRegister('introduction');
  return (
    <section
      ref={ref}
      className={`min-h-[70vh] text-center ${
        isActive ? 'bg-teal-500' : 'bg-gray-200'
      } m-10 rounded-md flex items-center justify-center flex-col gap-5 transition-colors duration-300 shadow-lg`}
    >
      <h1 className='font-bold text-3xl'>Welcome to React Intersection Observer Kit</h1>
      <p>React library for using Intersection Observer API in React-friendly way</p>
    </section>
  );
}

export default Welcome;
