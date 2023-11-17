import useFetchPosts from './useFetchPosts';

function Posts() {
  const { posts, loading, ref } = useFetchPosts();

  return (
    <section className='min-h-[70vh] my-10 rounded-md bg-white shadow-md'>
      <ul className='list-none p-0 m-0 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((item) => (
          <li key={item.id} className='bg-gray-200 p-4 rounded-md'>
            <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
        <div ref={ref} className='h-32'></div>
      </ul>

      {loading && (
        <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-slate-200 opacity-50'>
          <div className='border-8 border-solid border-teal-900 rounded-full animate-spin w-10 h-10'></div>
        </div>
      )}
    </section>
  );
}

export default Posts;
