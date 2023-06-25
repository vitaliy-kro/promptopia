import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    const { page = 1, limit = 10 } = Object.fromEntries(
      req.nextUrl.searchParams
    );
    const skip = (page - 1) * limit;

    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id })
      .populate('creator')
      .skip(skip)
      .limit(limit);

    const countPages = await Prompt.countDocuments({ creator: params.id });

    return new Response(
      JSON.stringify({ prompts, totalPages: Math.ceil(countPages / limit) }),
      { status: 200 }
    );
  } catch (e) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
