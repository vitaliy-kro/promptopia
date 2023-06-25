import PromptCard from '@components/PromptCard';
import Loader from '@components/Loader';

function Profile({ data, description, name, handleDelete, handleEdit }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {data.length ? (
          data?.prompts?.map(post => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}

export default Profile;
