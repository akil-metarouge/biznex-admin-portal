import { useState, useEffect } from "react";
import ReportedUsersTableItem from "./ReportedUsersTableItem";
import Pagination from "../users/pagination";
import ReportedContentsTableItem from "./ReportedContentsTableItem";

function ReportedContentsTable() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportedusers, setReportedusers] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userReportData = [
    {
      id: 1,
      user: "Keenan Peterson",
      contentType: ["Post"],
      reports: 4,
      lastReported: "26 Nov 2024",
      status: "Pending",
    },
    {
      id: 2,
      user: "Amanda Chambers",
      contentType: ["Post"],
      reports: 5,
      lastReported: "22 Nov 2024",
      status: "Suspended",
    },
    {
      id: 3,
      user: "Andre Barlow",
      contentType: ["Comment"],
      reports: 2,
      lastReported: "18 Nov 2024",
      status: "Suspended",
    },
    {
      id: 4,
      user: "Tristan Moreno",
      contentType: ["Chat", "Comment"],
      reports: 1,
      lastReported: "16 Nov 2024",
      status: "Pending",
    },
    {
      id: 5,
      user: "Kian Chavez",
      contentType: ["Post", "Chat", "Comment"],
      reports: 6,
      lastReported: "16 Nov 2024",
      status: "Pending",
    },
    {
      id: 6,
      user: "Jimena Douglas",
      contentType: ["Post", "Comment"],
      reports: 2,
      lastReported: "15 Nov 2024",
      status: "Pending",
    },
    {
      id: 7,
      user: "Derek Park",
      contentType: ["Chat", "Comment"],
      reports: 3,
      lastReported: "29 Oct 2024",
      status: "Pending",
    },
    {
      id: 8,
      user: "Logan Nguyen",
      contentType: ["Post", "Chat", "Comment"],
      reports: 4,
      lastReported: "20 Oct 2024",
      status: "Pending",
    },
    {
      id: 9,
      user: "Maeve Pugh",
      contentType: ["Post"],
      reports: 2,
      lastReported: "10 Oct 2024",
      status: "Suspended",
    },
    {
      id: 10,
      user: "Kenia Meyer",
      contentType: ["Chat", "Comment"],
      reports: 8,
      lastReported: "02 Oct 2024",
      status: "Pending",
    },
    {
      id: 11,
      user: "Maxwell Bradshaw",
      contentType: ["Comment"],
      reports: 10,
      lastReported: "06 Sep 2024",
      status: "Suspended",
    },
  ];

  //   const fetchUsers = async (limit = rowsPerPage, currentPage = page) => {
  //     setIsLoading(true);
  //     const apiURL = import.meta.env.VITE_BASE_URL;
  //     try {
  //       const response = await fetch(
  //         `${apiURL}/api/admin/users/invited?limit=${limit}&page=${currentPage}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       if (data?.status === 1) {
  //         setInvitedUsers(data || {});
  //       } else {
  //         console.error("Failed to fetch invited users:", data);
  //         setError("Failed to fetch invited users");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching invited users:", error);
  //       setError("An error occurred while fetching invited users");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  useEffect(() => {
    // fetchUsers();
  }, [page, rowsPerPage]); // Refetch when page or rowsPerPage changes

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="w-8 h-8 border-4 border-violet-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl relative shadow-none">
          <div>
            {/* Table */}
            <div className="overflow-x-auto rounded-2xl px-7">
              <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60 -11">
                {/* Table header */}
                <thead className="text-[16px] font-semibold  text-[#545454] dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20   border-[#dfdfdf]">
                  <tr>
                    <th className="px-2 first:pl-0 last:pr-5 py-6 whitespace-nowrap">
                      {" "}
                      <div className="font-semibold text-left">User</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap flex justify-center mr-8">
                      <div className="font-semibold text-left">Reports</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Last Reported
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap"></th>
                  </tr>
                </thead>
                {/* Table body */}
                {userReportData?.length === 0 && (
                  <tbody className="text-sm border-[#dfdfdf]">
                    <tr>
                      <td colSpan="4" className="px-2 py-6 text-center">
                        No Reports found.
                      </td>
                    </tr>
                  </tbody>
                )}
                {userReportData?.map((content) => {
                  return (
                    <ReportedContentsTableItem
                      key={content.id}
                      id={content.id}
                      user={content.user}
                      reports={content.reports}
                      status={content.status}
                      contentType={content.contentType}
                      lastReported={content.lastReported}
                    />
                  );
                })}
              </table>
            </div>
            {userReportData?.length > 0 && (
              <div>
                <Pagination
                  totalItems={reportedusers?.meta?.total || 0}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  // @ts-ignore
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

export default ReportedContentsTable;
