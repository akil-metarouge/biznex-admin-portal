import { useState, useEffect } from "react";
import ReportedUsersTableItem from "./ReportedUsersTableItem";
import Pagination from "../users/pagination";

function ReportedUsersTable({
  isLoading,
  data,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
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
                {data?.data?.length === 0 && (
                  <tbody className="text-sm border-[#dfdfdf]">
                    <tr>
                      <td colSpan="4" className="px-2 py-6 text-center">
                        No Reports found.
                      </td>
                    </tr>
                  </tbody>
                )}
                {data?.data?.map((content) => {
                  return (
                    <ReportedUsersTableItem
                      key={content.id}
                      id={content.id}
                      user={content.user}
                      reports={content.reports}
                      status={content.status}
                      lastReported={content.lastReported}
                    />
                  );
                })}
              </table>
            </div>
            {data?.data?.length > 0 && (
              <Pagination
                totalItems={data?.pagination?.total || 0}
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportedUsersTable;
