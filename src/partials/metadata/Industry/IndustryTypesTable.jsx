import { useState } from "react";
import IndustryTypesTableItem from "./IndustryTypesTableItem";
import Pagination from "../../users/pagination";
import ModalBasic from "../../../components/ModalBasic";
import IndustryTypesModal from "./IndustryTypesModal";

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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleDeleteClick = (item) => {
    console.log("Delete clicked for item:", item);
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Confirm delete called", itemToDelete);
    if (itemToDelete) {
      console.log(itemToDelete);
      // Call API

      // Close modal and reset itemToDelete
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

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
                  onDeleteClick={() =>
                    handleDeleteClick({
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

          {/* Edit Modal */}
          <IndustryTypesModal
            mode="edit"
            item={selectedItem}
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
          />

          {/* Delete Confirmation Modal */}
          <ModalBasic
            id="delete-confirmation-modal"
            modalOpen={deleteModalOpen}
            setModalOpen={setDeleteModalOpen}
            title="Confirm Delete"
          >
            <div className="py-6 px-8 text-center text-black text-[18px]">
              <div>Are you sure you want to delete the reason</div>
              <div>
                <strong>{itemToDelete?.services}</strong>
                {itemToDelete?.services ? "?" : ""}
              </div>
            </div>
            <div className="flex justify-center gap-6 pb-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="py-2 px-6 rounded-md border border-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="py-2 px-6 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </ModalBasic>
        </div>
      )}
    </div>
  );
}

export default IndustryTypesTable;
