import { Lock } from "iconsax-reactjs";
import EditMenu from "../../components/DropdownEditMenu";
import { Link } from "react-router-dom";

function CommunityDescription(props) {
  return (
    <div className="bg-white rounded-2xl w-full h-full relative max-h-[620px]">
      <img
        className="w-full h-80 object-cover rounded-t-2xl"
        src={props.bgImage}
        alt="card-bg-image"
      />
      <img
        className="w-30 h-30 rounded-full absolute top-65 left-6"
        src={props.image}
        alt={props.name}
      />
      <div className="relative w-full">
        {/* Menu button */}
        <EditMenu
          align="right"
          className="absolute top-4 right-4 inline-flex"
          btnStyles="text-gray-800 hover:text-gray-500 bg-violet-100"
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
      <div className="pt-20 pb-6 px-6 space-y-2">
        <h2 className="text-2xl font-semibold text-black">{props.name}</h2>
        <div className="flex items-center space-x-2.5">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Lock size="16" className="inline mr-1" />
            {props.accessibility} group
          </div>
          <div>
            {/* elipse */}
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {props.members} members
          </div>
        </div>
        <p className="mt-4 text-gray-900">{props.description}</p>
      </div>
    </div>
  );
}

export default CommunityDescription;
