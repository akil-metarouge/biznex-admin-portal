import Avatar04 from "../../../images/avatar-04.jpg";
import dayjs from "dayjs";

function ReportUserReasonsTableItem(props) {
  return (
    <tbody className="text-sm border-[#dfdfdf] border-b">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-0 last:pr-5 py-3.5 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-2 sm:mr-3">
              <img
                className="rounded-full"
                src={Avatar04}
                width="40"
                height="40"
                alt="Avatar"
              />
            </div>
            <div className="font-semibold text-[16px] text-black">
              {props.firstName} {props.lastName}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-[16px] text-black">
            {props.email}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-[16px] text-black">
            {dayjs(props.joinedOn).format("D MMM YYYY")}
          </div>
        </td>

        <td className="px-2 first:pl-5 last:pr-0 py-3.5 whitespace-nowrap flex items-center place-content-end">
          <button className="btn h-10 rounded-lg bg-white dark:bg-gray-800 border-violet-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-violet-800 hover:text-gray-600 cursor-pointer font-semibold">
            View Profile
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default ReportUserReasonsTableItem;
