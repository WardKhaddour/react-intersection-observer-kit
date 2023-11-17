import { useRegister } from 'react-intersection-observer-kit';

const featuresList = [
  '👀 Detect if an element has entered or left the viewport.',
  '🔭 Track which elements are currently in the viewport in realtime.',
  '🤙 Execute customizable callbacks when an element enters or exits the viewport.',
  '⚙️ Customize the Intersection Observer API options.',
  '🛃 Implement your custom conditions to determine element visibility.',
  '⚡️ Optimized performance with minimal rerenders, components render only when necessary.',
  '🛠️ Crafted with TypeScript, ensuring type safety.',
  '🤏 Small size, does not need any extra dependencies.',
];

function Features({ isActive }) {
  const ref = useRegister('features');

  return (
    <section
      ref={ref}
      className={`min-h-[60vh]  ${
        isActive ? 'bg-cyan-600' : 'bg-gray-700'
      } m-20 rounded-md flex items-start justify-start pt-5 flex-col gap-5 transition-colors duration-300 px-8 shadow-lg`}
    >
      <div
        className={`px-6 absolute ${
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        } transition-all duration-200`}
      >
        <h2 className='text-4xl font-bold'>Features</h2>
        <ul className='flex flex-col gap-4 text-lg mt-5'>
          {featuresList.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
