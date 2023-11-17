import { useRegister } from 'react-intersection-observer-kit';

function GetStarted({ isActive }) {
  const ref = useRegister('get-started');
  return (
    <section
      ref={ref}
      className={`min-h-[70vh]  ${
        isActive ? 'bg-teal-300' : 'bg-gray-100'
      } m-10 rounded-md flex items-center justify-center flex-col gap-5 transition-colors duration-300 py-5 shadow-lg `}
    >
      <h2 className='font-bold text-3xl'>Getting Started</h2>
      <p>Wrap your components with ObserverProvider and get access to our amazing hooks!</p>
      <pre className='bg-gray-200 p-4 rounded-md mt-4 w-fit shadow-lg'>
        <code>{`
          import { ObserverProvider, useRegister,useActiveElements } from 'react-intersection-observer-kit';
  
          function MyComponent() {
            const ref = useRegister('my-element-id');
            const activeElements = useActiveElements();
            return <div ref={ref}>Hello, World!</div>;
          }
  
          function App() {
            return (
              <ObserverProvider>
                <MyComponent />
              </ObserverProvider>
            );
          }
  `}</code>
      </pre>

      <a
        className='py-6 hover:text-gray-900 font-bold relative after:w-0 after:absolute after:h-0.5 after:bottom-5 after:left-0 hover:after:w-full after:bg-gray-900 after:transition-all'
        href='https://www.npmjs.com/package/react-intersection-observer-kit'
        target='_blank'
        rel='noreferrer'
      >
        Go to docs
      </a>
    </section>
  );
}

export default GetStarted;
