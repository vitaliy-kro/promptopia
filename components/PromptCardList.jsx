import PromptCard from '@components/PromptCard';
import Loader from '@components/Loader';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length ? (
        data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PromptCardList;
