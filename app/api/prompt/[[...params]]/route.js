import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async req => {
  try {
    const {
      page = 1,
      limit = 10,
      searchText,
    } = Object.fromEntries(req.nextUrl.searchParams);
    const skip = (page - 1) * limit;

    await connectToDB();

    const regex = new RegExp(searchText, 'i');
    const prompts = await Prompt.find({
      $or: [{ tag: { $regex: regex } }, { prompt: { $regex: regex } }],
    })
      .populate('creator')
      .skip(skip)
      .limit(limit);
    const countPages = await Prompt.countDocuments({
      $or: [{ tag: { $regex: regex } }, { prompt: { $regex: regex } }],
    });

    return new Response(
      JSON.stringify({ prompts, totalPages: Math.ceil(countPages / limit) }),
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
