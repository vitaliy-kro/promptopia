'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTER_KEYS } from '@consts';
import { toastError } from '@helpers/notifications';

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');
  const [isLiked, setIsLiked] = useState(
    session?.user?.id && post.likes.some(likeId => likeId === session.user.id)
  );
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(''), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id)
      return router.push(ROUTER_KEYS.PROFILE);

    router.push(
      `${ROUTER_KEYS.PROFILE}/${post.creator._id}?name=${post.creator.username}`
    );
  };

  const handeLikeClick = async () => {
    try {
      if (!session?.user) {
        throw new Error('You need sign in for like posts!');
      }
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          likedUserId: session?.user.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Something get wrong, try again!');
      }
      const data = await res.json();
      setIsLiked(data.likes.some(likeId => likeId === session.user.id));
      setLikesCount(data.likes.length);
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="Copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex justify-between items-start">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        <div className="flex justify-center items-center">
          <p className="font-satoshi text-sm text-gray-700">{likesCount}</p>
          <div className="like_btn" onClick={handeLikeClick}>
            <Image
              src={
                isLiked
                  ? '/assets/icons/liked.svg'
                  : '/assets/icons/not-liked.svg'
              }
              alt="Like icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
