import Posts from './components/Posts';

function LazyFetchingData() {
  return (
    <>
      <header className='fixed top-0 left-0 w-full bg-teal-950 p-8 shadow-lg text-center text-white font-bold text-2xl'>
        <p>This example demonstrates Lazy Data Fetching using React Intersection Observer Kit</p>
      </header>
      <main className='mt-28 px-8'>
        <h2 className='font-bold text-3xl my-3'>Lazy Fetch Data</h2>
        <p>
          In this example, we are using{' '}
          <a className='text-teal-600' target='_blank' rel='noreferrer' href='https://jsonplaceholder.typicode.com'>
            jsonplaceholder
          </a>{' '}
          for fetching fake posts data.
        </p>
        <Posts />
      </main>
    </>
  );
}

export default LazyFetchingData;
