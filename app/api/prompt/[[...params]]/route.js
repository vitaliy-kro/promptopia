import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';

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

    const query = {
      $or: [
        { tag: { $regex: regex } },
        { prompt: { $regex: regex } },
        {
          creator: {
            $in: await User.find({ name: { $regex: regex } }).distinct('_id'),
          },
        },
      ],
    };
    const prompts = await Prompt.find(query)
      .populate('creator')
      .skip(skip)
      .limit(limit);
    const countPages = await Prompt.countDocuments(query);

    return new Response(
      JSON.stringify({ prompts, totalPages: Math.ceil(countPages / limit) }),
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
