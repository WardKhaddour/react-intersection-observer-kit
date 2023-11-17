function VerySlowComponent() {
  return (
    <div className='bg-gray-200 p-8 h-full flex justify-center items-center flex-col rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Slow Component</h2>
      <p>This is a very slow component that is loaded lazily.</p>
    </div>
  );
}

export default VerySlowComponent;
