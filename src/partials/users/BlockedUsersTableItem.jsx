import Avatar04 from "../../images/avatar-04.jpg";
import dayjs from "dayjs";

function BlockedUsersTableItem(props) {
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
      </tr>
    </tbody>
  );
}

export default BlockedUsersTableItem;
