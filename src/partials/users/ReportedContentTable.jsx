import { useState, useEffect } from "react";
import Pagination from "./pagination";
import ReportedContentTableItem from "./ReportedContentTableItem";

function ReportedContentTable() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportedContents, setReportedContents] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const staticData = [
    {
      id: 1,
      "No. of Users": 5,
      "Report Category": "Post",
      Status: "Open",
      "Last Reported": "26 Nov 2024",
    },
    {
      id: 2,
      "No. of Users": 5,
      "Report Category": "Post",
      Status: "Removed",
      "Last Reported": "23 Nov 2024",
    },
    {
      id: 3,
      "No. of Users": 7,
      "Report Category": "Comment",
      Status: "Open",
      "Last Reported": "20 Nov 2024",
    },
    {
      id: 4,
      "No. of Users": 4,
      "Report Category": "Comment",
      Status: "Open",
      "Last Reported": "16 Nov 2024",
    },
    {
      id: 5,
      "No. of Users": 3,
      "Report Category": "Post",
      Status: "Removed",
      "Last Reported": "30 Oct 2024",
    },
    {
      id: 6,
      "No. of Users": 4,
      "Report Category": "Comment",
      Status: "Removed",
      "Last Reported": "19 Oct 2024",
    },
    {
      id: 7,
      "No. of Users": 3,
      "Report Category": "Chat",
      Status: "Removed",
      "Last Reported": "01 Oct 2024",
    },
    {
      id: 8,
      "No. of Users": 4,
      "Report Category": "Chat",
      Status: "Removed",
      "Last Reported": "28 Sep 2024",
    },
    {
      id: 9,
      "No. of Users": 8,
      "Report Category": "Comment",
      Status: "Open",
      "Last Reported": "20 Sep 2024",
    },
    {
      id: 10,
      "No. of Users": 4,
      "Report Category": "Post",
      Status: "Open",
      "Last Reported": "12 Sep 2024",
    },
    {
      id: 11,
      "No. of Users": 2,
      "Report Category": "Post",
      Status: "Removed",
      "Last Reported": "04 Sep 2024",
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
                      <div className="font-semibold text-left">No.of Users</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Report Category
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Last Reported
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap"></th>
                  </tr>
                </thead>
                {/* Table body */}
                {staticData?.length === 0 && (
                  <tbody className="text-sm border-[#dfdfdf]">
                    <tr>
                      <td colSpan="4" className="px-2 py-6 text-center">
                        No Reports found.
                      </td>
                    </tr>
                  </tbody>
                )}
                {staticData?.map((content) => {
                  return (
                    <ReportedContentTableItem
                      key={content.id}
                      id={content.id}
                      noOfUsers={content["No. of Users"]}
                      reportCategory={content["Report Category"]}
                      status={content.Status}
                      lastReported={content["Last Reported"]}
                    />
                  );
                })}
              </table>
            </div>
            {staticData?.length > 0 && (
              <div>
                <Pagination
                  totalItems={reportedContents?.meta?.total || 0}
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

export default ReportedContentTable;
