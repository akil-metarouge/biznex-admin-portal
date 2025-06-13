import { useState } from "react";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import IndustryTypesTable from "../../partials/metadata/Industry/IndustryTypesTable";
import InterestsTable from "../../partials/metadata/Interests/InterestsTable";
import ServiceTable from "../../partials/metadata/Service/ServiceTypesTable";
import ReportContentReasonsTable from "../../partials/metadata/ReportContentReasons/ReportContentReasonsTypesTable";
import ReportUserReasonsTable from "../../partials/metadata/ReportUserReasons/ReportUserReasonsTypesTable";

function MetaData() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("industry-types");

  const tabs = [
    { id: "industry-types", label: "Industry Types", count: 34 },
    { id: "interests", label: "Interests", count: 66 },
    { id: "services", label: "Services", count: 38 },
    { id: "report-user-reasons", label: "Report User Reasons", count: 10 },
    {
      id: "report-content-Reasons",
      label: "Report Content Reasons",
      count: 16,
    },
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
          title={"Metadata"}
          count={148}
          actionButton={true}
          actionButtonText={"Add Industry Types "}
          searchField={true}
          placeholder="Search Industry Types "
        />

        <main className="grow mb-10">
          <div className="pr-5  w-full mx-auto mb-5">
            <div className="bg-white p-4 rounded-2xl mb-4">
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

          <div className="pr-5 w-full mx-auto mb-5">
            <div>
              {activeTab === "industry-types" && <IndustryTypesTable />}
              {activeTab === "interests" && <InterestsTable />}
              {activeTab === "services" && <ServiceTable />}
              {activeTab === "report-user-reasons" && (
                <ReportUserReasonsTable />
              )}
              {activeTab === "report-content-Reasons" && (
                <ReportContentReasonsTable />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MetaData;
