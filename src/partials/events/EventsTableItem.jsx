import { useNavigate } from "react-router-dom";
import DropdownSortSelected from "../../components/DropdownSortSelected";
import { Eye } from "lucide-react";
import { LoginCurve } from "iconsax-react";

function EventsTableItem(props) {
  const navigate = useNavigate();

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-gray-800 dark:text-gray-100 font-semibold">
            {props.name}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-gray-800 dark:text-gray-100">
            {props.category}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-gray-800 dark:text-gray-100">
            {props.scheduledOn}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-gray-800 dark:text-gray-100">
            {props.attendees}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap capitalize">
          <div className="text-left font-semibold">{props.type}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap capitalize">
          <div className="text-left font-semibold">{props.status}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap capitalize">
          <DropdownSortSelected
            align="right"
            label=""
            selectedValue={"view-details"}
            menuIcon={true}
            items={[
              {
                label: "View Details",
                value: "view-details",
                icon: (
                  <LoginCurve
                    className="w-5 h-5 text-blue-600"
                    size="32"
                    color="#885cc1"
                  />
                ),
                onClick: () => navigate(`/events-details/${props.id}`),
              },
            ]}
          />
        </td>
        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer">
          <div className="flex items-center">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="2" />
              <circle cx="10" cy="16" r="2" />
              <circle cx="22" cy="16" r="2" />
            </svg>
          </div>
        </td> */}
      </tr>
    </tbody>
  );
}

export default EventsTableItem;
