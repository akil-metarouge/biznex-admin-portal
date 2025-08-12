import { useNavigate } from "react-router-dom";
import DropdownClassic from "../components/DropdownClassic";
import SearchForm from "./actions/SearchForm";

function Header({
  sidebarOpen,
  setSidebarOpen,
  title = "Metadata",
  count,
  actionButton = true,
  actionButtonText = "Add Report Reason",
  actionButtonOnClick,
  backButton = false,
  searchField = false,
  placeholder = "Search Content Reasons",
  dropdown1 = false,
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
  removePostAction,
  removePostAndSuspendUserAction,
}) {
  const navigate = useNavigate();

  return (
    <header className="m-5 ml-0 rounded-2xl sticky top-5 inset-0 backdrop-blur-md bg-white/70 z-30 ">
      <div className="px-4 py-4 md:py-0 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 h-auto md:h-[90px]">
          {/* Right side: Content */}
          <div className="flex flex-col md:flex-row md:flex-grow md:items-center md:justify-between md:gap-4">
            {/* Title and Buttons */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3">
              {/* Back Button for large screen */}
              {backButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-3 text-sm font-semibold bg-violet-50 hover:bg-gray-100 text-violet-800 rounded-lg transition duration-300 lg:flex items-center justify-center hidden"
                >
                  <svg
                    className="shrink-0 mr-2 fill-current scale-110 text-violet-800 rotate-90"
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                  >
                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                  </svg>
                  <span>Back</span>
                </button>
              )}
              <div className="flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden mr-2"
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
                {title && (
                  <h2 className="text-xl md:text-2xl font-bold text-black">
                    {title} {count ? `(${count})` : ""}
                  </h2>
                )}
              </div>

              {/* Back Button for large screen */}
              {backButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-3 text-sm font-semibold bg-violet-50 hover:bg-gray-100 text-violet-800 rounded-lg transition duration-300 flex items-center justify-center lg:hidden"
                >
                  <svg
                    className="shrink-0 mr-2 fill-current scale-110 text-violet-800 rotate-90"
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                  >
                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                  </svg>
                  <span>Back</span>
                </button>
              )}

              {actionButton && actionButtonText && (
                <button
                  onClick={actionButtonOnClick}
                  className="p-3 text-sm md:text-base font-semibold bg-violet-800 text-white hover:bg-violet-800/90 rounded-lg w-full sm:w-auto"
                >
                  {actionButtonText}
                </button>
              )}
            </div>

            {/* Filters & Search */}
            {(dropdown1 || dropdown2 || searchField || removeButtons) && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap pt-4`}
              >
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
                {searchField && <SearchForm placeholder={placeholder} />}
                {removeButtons && (
                  <>
                    <button
                      onClick={removePostAction}
                      className="p-3 border-2 border-orange-800 text-orange-800 rounded-lg w-full sm:w-auto"
                    >
                      Remove Post
                    </button>
                    <button
                      onClick={removePostAndSuspendUserAction}
                      className="p-3 bg-orange-800 text-white hover:bg-orange-800/90 rounded-lg w-full sm:w-auto"
                    >
                      Remove Post & Suspend User
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
