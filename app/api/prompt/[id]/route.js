import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag, likedUserId } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 });

    if (prompt) {
      existingPrompt.prompt = prompt;
    }

    if (tag) {
      existingPrompt.tag = tag;
    }

    if (likedUserId) {
      console.log({ existingPrompt: existingPrompt.likes });
      likeStatusChange(likedUserId, existingPrompt.likes);
    }

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response('Failed to update prompt', { status: 500 });
  }
};

function likeStatusChange(likedUserId, likesArray) {
  if (likesArray.includes(likedUserId)) {
    likesArray.splice(likesArray.indexOf(likedUserId), 1);
    return likesArray;
  }
  likesArray.push(likedUserId);
  return likesArray;
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (e) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
