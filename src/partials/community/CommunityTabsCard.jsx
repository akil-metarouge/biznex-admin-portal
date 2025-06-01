import React from "react";
import { Link } from "react-router-dom";
import EditMenu from "../../components/DropdownEditMenu";
import bgImage from "./../../images/bg-image.png";

function CommunityTabsCard(props) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-xs rounded-xl">
      <div className="flex flex-col h-80">
        {/* Card top */}
        <div className="grow rounded-t-lg relative overflow-hidden">
          <img
            className="absolute inset-0 w-full h-30 object-cover rounded-t-lg"
            src={bgImage}
            alt="card-bg-image"
          />
          {/* Status tag */}
          <div className="absolute top-3 left-3 h-7">
            <span
              className={`${
                props?.status === "Active" ? "bg-green-500" : "bg-red-400"
              } text-white px-3 py-1 rounded-full text-xs font-semibold`}
            >
              {props?.status}
            </span>
          </div>
          {/* Menu button */}
          <EditMenu
            align="right"
            className="absolute top-2 right-2 inline-flex"
          >
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
          <div className="absolute w-full h-full top-16">
            <img
              className="rounded-full mx-auto border-2 border-white"
              src={props.image}
              width="90"
              height="90"
              alt={props.name}
            />
            {/* Request tag */}
            {props?.requests > 0 && (
              <div className="absolute top-16 right-3 h-5">
                <span
                  className={`bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {props?.requests} <span className="ml-1">Requests</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Bio */}
        <div className="text-center mt-2">
          <h2 className="text-xl leading-snug justify-center font-semibold text-black-800">
            {props.name}
          </h2>
          <div className="text-sm">{props.content}</div>
        </div>
        {/* Card footer */}
        <div className="border-t-2 border-gray-100 dark:border-gray-700/60 m-5 flex items-center justify-between">
          <div className="w-full border-r-2 border-gray-100 pt-3 pb-2 text-center">
            <p className="text-black-800">{480}</p>
            <p>Members</p>
          </div>
          <div className="w-full pt-3 pb-2 text-center">
            <p className="text-black-800">{56}</p>
            <p>Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityTabsCard;
