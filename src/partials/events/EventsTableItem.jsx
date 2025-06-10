import { useNavigate } from "react-router-dom";
import DropdownSortSelected from "../../components/DropdownSortSelected";
import { LoginCurve } from "iconsax-react";

function EventsTableItem(props) {
  const navigate = useNavigate();

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td
          onClick={() => navigate(`/events-details/${props.id}`)}
          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        >
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
        <td className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3">
          <DropdownSortSelected
            align="right"
            label=""
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
              {
                label: "Update Events",
                value: "update-events",
                icon: (
                  <LoginCurve
                    className="w-5 h-5 text-blue-600"
                    size="32"
                    color="#885cc1"
                  />
                ),
                onClick: () => navigate(`/update-events/${props.id}/edit`),
              },
            ]}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default EventsTableItem;
