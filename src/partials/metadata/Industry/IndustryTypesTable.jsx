import React, { useState, useEffect } from "react";
import IndustryTypesTableItem from "./IndustryTypesTableItem";
import Pagination from "../../users/pagination";

function IndustryTypesTable() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async (limit = rowsPerPage, currentPage = page) => {
    setIsLoading(true);
    const apiURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/admin/users/active?limit=${limit}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data?.status === 1) {
        setActiveUsers(data || {});
      } else {
        console.error("Failed to fetch invited users:", data);
        setError("Failed to fetch invited users");
      }
    } catch (error) {
      console.error("Error fetching invited users:", error);
      setError("An error occurred while fetching invited users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]); // Refetch when page or rowsPerPage changes
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-violet-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-xs rounded-2xl relative ">
          <div>
            {/* Table */}
            <div className="overflow-x-auto rounded-2xl px-7">
              <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60 -11">
                {/* Table header */}
                <thead className="text-[16px] font-semibold  text-[#545454] dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-[#dfdfdf]">
                  <tr>
                    <th className="px-2 first:pl-0 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Industry Type
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">Joined On</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-0 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left"></div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {activeUsers?.data?.length === 0 && (
                  <tbody className="text-sm border-[#dfdfdf]">
                    <tr>
                      <td colSpan="4" className="px-2 py-6 text-center">
                        No active users found.
                      </td>
                    </tr>
                  </tbody>
                )}
                {activeUsers?.data?.map((user) => {
                  return (
                    <IndustryTypesTableItem
                      key={user.reference}
                      id={user.reference}
                      firstName={user.first_name}
                      lastName={user.last_name}
                      email={user.email}
                      joinedOn={user.date_invited}
                    />
                  );
                })}
              </table>
            </div>
            {activeUsers?.data?.length > 0 && (
              <div>
                <Pagination
                  totalItems={activeUsers?.meta?.total || 0}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  onRowsPerPageChange={(newRowsPerPage) => {
                    setRowsPerPage(newRowsPerPage);
                    setPage(1); // Reset to first page when changing rows per page
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustryTypesTable;
