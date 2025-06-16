import DropdownCard from "../../../components/DropdownCard";
import { Edit2 } from "iconsax-react";
import { Trash2 } from "lucide-react";

function IndustryTypesTableItem(props) {
  return (
    <tbody className="text-sm border-[#dfdfdf] border-b">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-0 last:pr-5 py-3.5 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="font-semibold text-[16px] text-black">
              {props?.industryType}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-semibold text-[16px] text-black">
            {props.status ? "Active" : "Inactive"}
          </div>
        </td>

        <td className="px-2 first:pl-5 last:pr-0 py-3.5 whitespace-nowrap flex items-center place-content-end">
          <span className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3">
            <DropdownCard
              align="right"
              label=""
              menuIcon={true}
              items={[
                {
                  label: "Edit",
                  value: "edit",
                  cursor: true,
                  icon: (
                    <Edit2
                      className="w-5 h-5 text-black"
                      size="32"
                      color="#000"
                    />
                  ),
                  onClick: (e) => {
                    e.stopPropagation();
                    props.onEditClick();
                  },
                },
                {
                  label: "Delete",
                  value: "delete",
                  isDelete: true,
                  cursor: true,
                  icon: (
                    <Trash2 className="w-5 h-5 " size="32" color="#FF6D5D" />
                  ),
                  onClick: () => console.log("Delete clicked"),
                },
              ]}
            />
          </span>
        </td>
      </tr>
    </tbody>
  );
}

export default IndustryTypesTableItem;
