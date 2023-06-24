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
  }, [page]);

  const filterPrompts = searchtext => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleLoadMore = e => {
    setPage(prevState => prevState + 1);
  };
  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
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
