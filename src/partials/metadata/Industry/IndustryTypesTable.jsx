import { useState } from "react";
import IndustryTypesTableItem from "./IndustryTypesTableItem";
import Pagination from "../../users/pagination";
import ModalBasic from "../../../components/ModalBasic";

function IndustryTypesTable({
  isLoading,
  data,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedIndustryType, setEditedIndustryType] = useState("");
  const [editedStatus, setEditedStatus] = useState("active");

  const handleEditClick = (item) => {
    console.log("Editing item:", item);
    setSelectedItem(item);
    setEditedIndustryType(item.industryType);
    setEditedStatus(item.active ? "active" : "inactive");
    setEditModalOpen(true);
  };

  const handleSave = () => {
    const payload = {
      id: selectedItem.id,
      industryType: editedIndustryType,
      status: editedStatus === "active",
    };

    // API call or state update here
    setEditModalOpen(false);
  };

  console.log("editModalOpen:", editModalOpen);
  // console.log("Rendering IndustryTypesTable with data:", data);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-violet-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-2xl relative">
          <div className="overflow-x-auto rounded-2xl px-7">
            <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
              <thead className="text-[16px] font-semibold text-[#545454] dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-[#dfdfdf]">
                <tr>
                  <th className="px-2 first:pl-0 last:pr-5 py-6 whitespace-nowrap text-left">
                    Industry Type
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap text-left">
                    Status
                  </th>
                  <th className="px-2 first:pl-5 last:pr-0 py-6 whitespace-nowrap text-left"></th>
                </tr>
              </thead>

              {data?.data?.length === 0 && (
                <tbody className="text-sm border-[#dfdfdf]">
                  <tr>
                    <td colSpan="4" className="px-2 py-6 text-center">
                      No industry types found.
                    </td>
                  </tr>
                </tbody>
              )}

              {data?.data?.map((dt) => (
                <IndustryTypesTableItem
                  key={dt.id}
                  id={dt.id}
                  industryType={dt.industryType}
                  status={dt.active}
                  onEditClick={() =>
                    handleEditClick({
                      id: dt.id,
                      industryType: dt.industryType,
                      active: dt.active,
                    })
                  }
                />
              ))}
            </table>
          </div>

          {data?.data?.length > 0 && (
            <Pagination
              totalItems={data?.pagination?.total || 0}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(newPage) => setPage(newPage)}
              onRowsPerPageChange={(newRowsPerPage) => {
                setRowsPerPage(newRowsPerPage);
                setPage(1);
              }}
            />
          )}

          <ModalBasic
            id="edit-industry-type-modal"
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
            title="Edit Industry Type"
          >
            <div className="py-9 px-10 text-sm">
              <h2 className="text-[20px] font-bold text-center text-black mb-6">
                Edit Industry Type
              </h2>

              <div className="space-y-3 mb-6">
                <label className="block">
                  <span className="text-[16px] font-semibold mb-1 block">
                    Industry Type
                  </span>
                  <input
                    type="text"
                    value={editedIndustryType}
                    onChange={(e) => setEditedIndustryType(e.target.value)}
                    className="block w-full h-[50px] border border-[#B5B5B5] px-4 py-3 rounded-md text-black focus:outline-none"
                  />
                </label>
              </div>

              <div className="flex items-center gap-8">
                {["active", "inactive"].map((val) => (
                  <label
                    key={val}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={val}
                      checked={editedStatus === val}
                      onChange={() => setEditedStatus(val)}
                      className="peer hidden"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                      <div className="w-4 h-4 rounded-full border-2 border-white peer-checked:bg-violet-800" />
                    </div>
                    <span className="text-[16px] font-semibold capitalize">
                      {val}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSave}
                  className="w-full py-3.5 text-[16px] font-semibold bg-violet-800 text-white hover:bg-violet-800/90 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>
      )}
    </div>
  );
}

export default IndustryTypesTable;
