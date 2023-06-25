'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import Loader from '@components/Loader';
import { ROUTER_KEYS } from '@consts';

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);

        const data = await response.json();
        console.log(data);
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (e) {
        router.push(ROUTER_KEYS.HOME);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async e => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId) alert('Prompt id not found');
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push(ROUTER_KEYS.HOME);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return post.prompt && post.tag ? (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  ) : (
    <Loader />
  );
}

export default EditPrompt;
