import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;

    //find user in db
    const user = await User.findOne({ _id: userId });

    //check if property is bookmarked
    let isBookMarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookMarked) {
      //if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookMarked = false;
    } else {
      //if not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bokmark added successfully";
      isBookMarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookMarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
