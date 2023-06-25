'use client';

import { useState, useEffect } from 'react';
import PromptCardList from '@components/PromptCardList';

function Feed() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchText) {
        return setSearchTimeout(
          setTimeout(async () => {
            const res = await fetch(
              `/api/prompt?page=${page}&searchText=${searchText}`
            );
            const data = await res.json();
            setSearchedResults(data);
          }, 500)
        );
      }

      const res = await fetch(`/api/prompt?page=${page}`);
      const data = await res.json();

      setPosts(prevState => {
        return {
          prompts: [...(prevState?.prompts ?? []), ...data.prompts],
          totalPages: data.totalPages,
        };
      });
    };

    fetchPosts();
  }, [page, searchText]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setPage(1);
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <>
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        </>
      ) : (
        <>
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
            page={page}
          />
          {posts.prompts && page !== posts.totalPages && (
            <button className="outline_btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Feed;
