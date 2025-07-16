import { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ReportedUsersTable from "../partials/reports/ReportedUsersTable";
import ReportedContentsTable from "../partials/reports/ReportedContentsTable";
import { useSearchParams } from "react-router-dom";

function ReportManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [statusFilter, setStatusFilter] = useState(0);
  // ✅ Read from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialRowsPerPage = parseInt(searchParams.get("perPage")) || 10;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  // ✅ Update URL when page or perPage changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("perPage", rowsPerPage.toString());
    setSearchParams(params);
  }, [page, rowsPerPage]);

  const fetchMetaData = async (
    limit = rowsPerPage,
    currentPage = page,
    keyword = searchValue,
    status = statusFilter
  ) => {
    setIsLoading(true);
    const apiURL = import.meta.env.VITE_BASE_URL;
    const menuItem = tabs.find((item) => item.id === activeTab);
    const statusParam =
      status === 1 ? "active" : status === 2 ? "inactive" : "";

    try {
      const response = await fetch(
        `${apiURL}/api${menuItem?.endpoint}?limit=${limit}&page=${currentPage}&search=${keyword}&status=${statusParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data?.status === 1) {
        setData(data || {});
      } else {
        console.error("Failed to fetch meta-data:", data);
        setError("Failed to fetch meta-data");
      }
    } catch (error) {
      console.error("Error fetching meta-data:", error);
      setError("An error occurred while fetching meta-data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetaData(rowsPerPage, page, searchValue, statusFilter);
  }, [page, rowsPerPage, activeTab, statusFilter]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMetaData(rowsPerPage, page, searchValue);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const tabs = [
    {
      id: "users",
      label: "Reported Users",
      endpoint: "/admin/report/users",
      count: 34,
      placeholder: "Search Report",
    },
    {
      id: "contents",
      label: "Reported Contents",
      endpoint: "/admin/report/content",
      count: 66,
      placeholder: "Search User",
    },
  ];

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);

  console.log("statusFilter", statusFilter);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-5 lg:pl-0">
        {/*  Site header */}
        <Header
          title={"Reports Management"}
          count={60}
          dropdown1={true}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          dropdown1Label="Status"
          dropdown1Options={[
            { id: 0, label: "All" },
            { id: 1, label: "Active" },
            { id: 2, label: "InActive" },
          ]}
          dropdown1Selected={statusFilter}
          dropdown1OnChange={(id) => {
            setStatusFilter(id);
            setPage(1); // Optional: reset to first page on filter change
            fetchMetaData(rowsPerPage, 1, searchValue, id);
          }}
          searchField={true}
          placeholder={activeTabConfig?.placeholder}
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
        />

        <main className="grow">
          <div className="pr-5 w-full mx-auto mb-5">
            <div className="bg-white p-4 rounded-2xl mb-4">
              <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2 md:py-4 rounded-lg transition font-bold cursor-pointer ${
                        isActive
                          ? "bg-[#E7DEF3] text-violet-800"
                          : "text-[#1F1F1F] hover:bg-[#E7DEF3] hover:text-violet-800"
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pr-5  w-full max-w-[96rem] mx-auto mb-5">
            <div>
              {activeTab === "users" && (
                <ReportedUsersTable
                  data={data}
                  isLoading={isLoading}
                  setPage={setPage}
                  page={page}
                  setRowsPerPage={setRowsPerPage}
                  rowsPerPage={rowsPerPage}
                />
              )}
              {activeTab === "contents" && (
                <ReportedContentsTable
                  data={data}
                  isLoading={isLoading}
                  setPage={setPage}
                  page={page}
                  setRowsPerPage={setRowsPerPage}
                  rowsPerPage={rowsPerPage}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReportManagement;
