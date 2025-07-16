import LikeIcon from "../assets/icons/like.svg";
import CommentIcon from "../assets/icons/comment.svg";
import { More } from "iconsax-reactjs";

const Comment = ({ name, title, comment, avatar }) => (
  <div className="bg-[#F7F6FC] p-4 rounded-xl mt-4">
    <div className="flex justify-between items-start">
      <div className="flex gap-3 items-start">
        <img
          src={avatar}
          alt={name}
          className="w-[42px] h-[42px] rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm text-[#272838]">{name}</div>
          <div className="text-xs text-[#707070] mb-2">{title}</div>
          <p className="text-sm text-[#272838]">{comment}</p>
          <hr className="my-3 border-[#EAEAEA]" />
          <div className="flex gap-3 text-xs text-[#363636] ">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={LikeIcon} className="h-5 w-5" alt="" />
              <span>10 Likes</span>
            </div>
            <div className="w-px h-5 bg-[#EAEAEA] self-center" />
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={CommentIcon} className="h-5 w-5" alt="" />
              <span>Reply</span>{" "}
              <div className="h-1 w-1 rounded-full bg-[#B9B8B8]"></div>{" "}
              <span>2 Replies</span>
            </div>
          </div>
        </div>
      </div>
      <More
        className="text-gray-400 cursor-pointer rotate-90"
        size={24}
        variant="Outline"
      />
    </div>
  </div>
);

export default Comment;
