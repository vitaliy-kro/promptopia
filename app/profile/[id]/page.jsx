'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const [userPosts, setUserPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${params?.id}/posts?page=${page}`
      );
      const data = await response.json();

      setUserPosts(prevState => {
        return {
          prompts: [...(prevState?.prompts ?? []), ...data.prompts],
          totalPages: data.totalPages,
        };
      });
    };

    if (params?.id) fetchPosts();
  }, [params.id, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
      {userPosts.prompts && page !== userPosts.totalPages && (
        <button className="outline_btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </>
  );
};

export default UserProfile;
