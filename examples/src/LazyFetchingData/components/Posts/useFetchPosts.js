import { useEffect, useState } from 'react';
import { useInViewport } from 'react-intersection-observer-kit';

function useFetchPosts() {
  // Observe last post for detecting when to fetch new posts
  const [ref, isVisible] = useInViewport({
    observerOptions: { threshold: 1 },
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // apply pagination for fetch posts lazily
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Fetch posts from jsonplaceholder and set loading state
    const fetchPosts = async (page) => {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        const newPosts = await res.json();
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible && !loading) {
      // fetch posts when last post is visible and update the current page
      fetchPosts(page + 1);
      setPage((page) => page + 1);

      // scroll a bit to the top to prevent new fetch
      window.scrollBy({ top: -100 });
    }
  }, [isVisible, posts, page, loading]);

  return {
    posts,
    loading,
    ref,
  };
}

export default useFetchPosts;
