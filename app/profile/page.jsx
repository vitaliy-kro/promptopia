'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import Loader from '@components/Loader';
import { ROUTER_KEYS } from '@consts';

function MyProfile() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `/api/users/${session.user.id}/posts?page=${page}`
      );
      const data = await res.json();

      setPosts(prevState => {
        return {
          prompts: [...(prevState?.prompts ?? []), ...data.prompts],
          totalPages: data.totalPages,
        };
      });
    };

    if (status === 'authenticated') {
      fetchPosts();
    }

    if (status === 'unauthenticated') {
      router.push(ROUTER_KEYS.HOME);
    }
  }, [status, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const handleEdit = post => {
    router.push(`${ROUTER_KEYS.UPDATE_PROMPT}?id=${post._id}`);
  };

  const handleDelete = async post => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter(p => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return status !== 'loading' && status === 'authenticated' ? (
    <>
      <Profile
        name="My"
        description="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {posts.prompts && page !== posts.totalPages && (
        <button className="outline_btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      ;
    </>
  ) : (
    <Loader />
  );
}

export default MyProfile;
