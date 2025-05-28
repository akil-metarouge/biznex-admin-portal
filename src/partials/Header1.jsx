import SearchForm from "./actions/SearchForm";

function Header1({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  return (
    <header
      className={`m-5 ml-0 rounded-2xl sticky top-5 inset-0 backdrop-blur-md bg-white/70  z-30 max-lg:shadow-xs `}
    >
      <div className="px-4 sm:px-6 lg:px-8">
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
              <h2 className="text-2xl font-bold text-black">Metadata (148)</h2>
              <button className="ml-4.5 p-4 py-3.5 text-[16px] font-semibold btn bg-violet-800 text-white hover:bg-violet-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                Add Report Reason
              </button>
            </div>
            <div>
              <SearchForm placeholder="Search Content Reasons" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header1;
