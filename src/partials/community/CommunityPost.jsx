import moment from "moment";
import Public from "../../images/public.svg";
import Like from "../../images/like.svg";
import Comment from "../../images/comment-dark.svg";
import { Lock } from "iconsax-reactjs";
import EditMenu from "../../components/DropdownEditMenu";
import { Link } from "react-router-dom";

function CommunityPost(props) {
  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="flex justify-between p-4 border-b-2">
        <div className="flex gap-4">
          <img
            className="w-16 rounded-full"
            src={props.image}
            alt={props.name}
          />
          <div className="flex flex-col justify-center">
            <h2 className="font-bold">{props.name}</h2>
            <div className="flex gap-2 items-center">
              <p className="text-sm">{moment(props.time).fromNow()}</p>
              {props.accessibility === "Public" ? (
                <img src={Public} alt="Public" />
              ) : (
                <Lock size="12" />
              )}
            </div>
          </div>
        </div>
        <div className="relative flex items-center">
          <EditMenu
            align="right"
            btnStyles="text-gray-800 hover:text-gray-500 rotate-90 top-0"
          >
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                // to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                // to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                // to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </div>
      </div>
      <div className="border-b-2">
        <p className="p-4 font-bold">{props.description}</p>
        <img src={props.postImage} alt="Post-Image" className="w-full" />
        <div className="flex p-6 text-black">
          <div className="flex gap-2 pr-4">
            <button className="cursor-pointer">
              <img src={Like} alt="Like" className="hover:scale-110" />
            </button>
            <span>{props.postLikes} Likes</span>
          </div>
          <div className="border-r border-gray-400" />
          <div className="flex gap-2 pr-4">
            <button className="pl-4">
              <img src={Comment} alt="Comment" />
            </button>
            <span>{props.comments?.meta?.total || 0} Comments</span>
          </div>
        </div>
      </div>
      {props?.comments?.data?.length > 0 && (
        <div className="p-6">
          <h2 className="font-bold text-lg">Comments</h2>
          <div className="bg-gray-200 rounded-xl mt-6">
            {props.comments.data.map((comment) => (
              <div key={comment.id} className="p-4">
                <div className="flex gap-4">
                  <div>
                    <img
                      className="w-24 rounded-full"
                      src={comment.image}
                      alt={comment.user}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center">
                        <div className="flex gap-2 items-center">
                          <h2 className="font-bold">{comment.user}</h2>
                          {/* elipse */}
                          <div className="flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                          <p className="text-xs">
                            {moment(comment.time).fromNow()}
                          </p>
                        </div>
                        <p className="text-sm">{comment.position}</p>
                      </div>
                      <div className="relative">
                        <EditMenu
                          align="right"
                          btnStyles="text-gray-800 hover:text-gray-500 rotate-90 top-0"
                        >
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                              // to="#0"
                            >
                              Option 1
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                              // to="#0"
                            >
                              Option 2
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                              // to="#0"
                            >
                              Remove
                            </Link>
                          </li>
                        </EditMenu>
                      </div>
                    </div>
                    <p className="mt-2 text-black font-semibold pb-4 border-b border-gray-300">
                      {comment.comment}
                    </p>
                    <div className="flex py-4 text-black text-sm">
                      <div className="flex gap-2 pr-4">
                        <button className="cursor-pointer">
                          <img
                            src={Like}
                            alt="Like"
                            className="w-5 hover:scale-110"
                          />
                        </button>
                        <span>{comment.commentLikes || 0} Likes</span>
                      </div>
                      <div className="border-r border-gray-400" />
                      <div className="flex gap-2 pr-4">
                        <button className="pl-4">
                          <img src={Comment} alt="Reply" className="w-5" />
                        </button>
                        <span>Reply</span>
                        {/* elipse */}
                        <div className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <span>{comment.repliesCount || 0} Replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="text-violet-800 font-bold mt-4 p-2 hover:bg-violet-50 h-10 cursor-pointer">
            Show More Comments
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunityPost;
