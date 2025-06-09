import moment from "moment";
import Public from "../../images/public.svg";
import Like from "../../images/like.svg";
import Comment from "../../images/comment-dark.svg";
import { ArrowRight2, Lock } from "iconsax-reactjs";
import EditMenu from "../../components/DropdownEditMenu";
import { Link } from "react-router-dom";

function CommunityEvent(props) {
  return (
    <div className="bg-white rounded-2xl w-full p-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <img src={props.image} alt={props.name} className="w-36 rounded-lg" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p className="text-xs">
              {moment(props.time).format("DD MMM YYYY, h:mm A")}
            </p>
            {/* elipse */}
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-xs">{props.location}</p>
          </div>
          <h2 className="font-bold">{props.name}</h2>
          <p className="text-xs">{props.attendees} Attendees</p>
          {/* Status tag */}
          <div>
            <span
              className={`${
                props?.status === "Upcoming"
                  ? "bg-green-500"
                  : props?.status === "Completed"
                  ? "bg-black"
                  : "bg-red-400"
              } text-white px-3 py-1 rounded-full text-xs font-semibold`}
            >
              {props.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button className="cursor-pointer hover:bg-violet-50 p-2">
          <ArrowRight2 className="hover:text-violet-800" />
        </button>
      </div>
    </div>
  );
}

export default CommunityEvent;
