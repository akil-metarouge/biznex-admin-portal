import { useState, useEffect } from "react";
import Pagination from "../../users/pagination";
import ReportUserReasonsTableItem from "./ReportUserReasonsTableItem";

function ReportUserReasonsTable({
  isLoading,
  data,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  console.log("data", data);

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
                      <div className="font-semibold text-left">Reason</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-0 py-6 whitespace-nowrap">
                      <div className="font-semibold text-left"></div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {data?.data?.length === 0 && (
                  <tbody className="text-sm border-[#dfdfdf]">
                    <tr>
                      <td colSpan="4" className="px-2 py-6 text-center">
                        No Reason found.
                      </td>
                    </tr>
                  </tbody>
                )}
                {data?.data?.map((dt) => {
                  return (
                    <ReportUserReasonsTableItem
                      key={dt?.id}
                      id={dt?.id}
                      reason={dt?.reason}
                      status={dt?.active}
                    />
                  );
                })}
              </table>
            </div>
            {data?.data?.length > 0 && (
              <div>
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportUserReasonsTable;
