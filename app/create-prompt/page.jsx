'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';
import Image from '@node_modules/next/image';
import { toastError, toastSuccess } from '@helpers/notifications';
import { ROUTER_KEYS } from '@consts';

function CreatePrompt() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const createPrompt = async e => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (res.ok) {
        toastSuccess('Successfully added! Redirected to main page');
        router.push(ROUTER_KEYS.HOME);
      }
    } catch (e) {
      toastError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return status !== 'loading' && status === 'authenticated' ? (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  ) : (
    <div className="w-full flex-center">
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
}

export default CreatePrompt;
