import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ReportedUsersTable from "../partials/reports/ReportedUsersTable";
import ReportedContentsTable from "../partials/reports/ReportedContentsTable";

function ReportManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "Reported Users", count: 30 },
    { id: "contents", label: "Reported Contents", count: 30 },
  ];

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-5 lg:pl-0">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title={"Reports Management"}
          count={60}
          actionButton={false}
          searchField={true}
          placeholder="Search User"
          dropdown1={true}
        />

        <main className="grow">
          <div className="pr-5  w-full max-w-[96rem] mx-auto mb-5">
            <div className="bg-white p-4  rounded-2xl mb-4">
              <div className="flex space-x-4">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`p-4 rounded-lg transition font-bold cursor-pointer ${
                        isActive
                          ? "bg-[#E7DEF3] text-violet-800"
                          : "text-[#1F1F1F]  hover:bg-[#E7DEF3] hover:text-violet-800 "
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
              {activeTab === "users" && <ReportedUsersTable />}
              {activeTab === "contents" && <ReportedContentsTable />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReportManagement;
