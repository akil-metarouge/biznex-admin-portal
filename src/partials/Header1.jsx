import DropdownClassic from "../components/DropdownClassic";
import SearchForm from "./actions/SearchForm";

function Header1({
  sidebarOpen,
  setSidebarOpen,
  title = "Metadata",
  count = 148,
  actionButton = true,
  actionButtonText = "Add Report Reason",
  backButton = false,
  searchField = true,
  placeholder = "Search Content Reasons",
  dropdown1 = true,
  dropdown2 = false,
  dropdown1Label = "Status",
  dropdown2Label = "Report Category",
  dropdown1Width = "w-44",
  dropdown2Width = "w-64",
  dropdown1Options = [
    { id: 0, label: "All" },
    { id: 1, label: "Pending" },
    { id: 2, label: "Resolved" },
    { id: 3, label: "Rejected" },
  ],
  dropdown2Options = [
    { id: 0, label: "All" },
    { id: 1, label: "Last 7 days" },
    { id: 2, label: "Last 30 days" },
    { id: 3, label: "Last 90 days" },
    { id: 4, label: "Last 180 days" },
    { id: 5, label: "Last 365 days" },
  ],
  dropdown1Selected = 0,
  dropdown2Selected = 0,
  removeButtons = false,
}) {
  return (
    <header
      className={`m-5 ml-0 rounded-2xl sticky top-5 inset-0 backdrop-blur-md bg-white/70  z-30 max-lg:shadow-xs `}
    >
      <div className="px-4  lg:px-6">
        <div className={`flex items-center justify-between h-[90px]`}>
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex flex-grow items-center justify-between space-x-3">
            <div className="flex items-center ">
              {/* **************** Back Button **************** */}
              {backButton && (
                <button className="mr-4.5 p-4 py-3.5 text-sm font-semibold btn bg-violet-50 hover:bg-gray-100 text-violet-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg transition duration-300 flex items-center shadow-none">
                  <svg
                    className="shrink-0 mr-2 fill-current scale-110 text-violet-800 dark:text-gray-500 rotate-90"
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                  >
                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                  </svg>
                  <span> Back</span>
                </button>
              )}

              {/* **************** Title without count **************** */}
              {title && !count && (
                <h2 className="text-2xl font-bold text-black">{title}</h2>
              )}

              {/* **************** Title with count **************** */}
              {title && count && (
                <h2 className="text-2xl font-bold text-black">
                  {title} ({count})
                </h2>
              )}

              {/* **************** Action Button **************** */}
              {actionButton && actionButtonText && (
                <button className="ml-4.5 p-4 py-3.5 text-[16px] font-semibold btn bg-violet-800 text-white hover:bg-violet-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                  Add Report Reason
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {/* **************** Dropdowns **************** */}
              {dropdown1 && (
                <DropdownClassic
                  width={dropdown1Width}
                  label={dropdown1Label}
                  options={dropdown1Options}
                  selected={dropdown1Selected}
                />
              )}
              {dropdown2 && (
                <DropdownClassic
                  width={dropdown2Width}
                  label={dropdown2Label}
                  options={dropdown2Options}
                  selected={dropdown2Selected}
                />
              )}

              {/* **************** Search Field **************** */}
              {searchField && <SearchForm placeholder={placeholder} />}

              {/* **************** Remove Buttons **************** */}
              {removeButtons && (
                <>
                  <button className="w-[266px] p-6 py-3.5 text-[16px] font-semibold btn border-2 border-orange-800 text-orange-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                    Remove Post
                  </button>
                  <button className="w-[266px] py-3.5 text-[16px] font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                    Remove Post & Suspend User
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header1;
