import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Sidebar1({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const sidebarData = [
    {
      name: "Dashboard",
      icon: "/src/assets/icons/dashboard.svg",
      path: "/",
    },
    {
      name: "Metadata",
      icon: "/src/assets/icons/metadata.svg",
      path: "/metadata",
    },
    {
      name: "Users",
      icon: "/src/assets/icons/users.svg",
      path: "/users",
    },
    {
      name: "Communities",
      icon: "/src/assets/icons/communities.svg",
      path: "/communities",
    },
    {
      name: "Events",
      icon: "/src/assets/icons/events.svg",
      path: "/events",
    },
    {
      name: "Reports Management",
      icon: "/src/assets/icons/reports.svg",
      path: "/reports",
    },
  ];

  return (
    <div className="min-w-fit h-[100dvh] lg:p-5">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100%] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 
            bg-black-800  dark:bg-gray-800  transition-all duration-200 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-64"
            } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "lg:rounded-2xl rounded-r-2xl shadow-xs"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between lg:justify-center  py-7  px-7 border-b border-white/10 ">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400 "
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img
              src="/src/images/biznet-logo.png"
              className="h-[30px]"
              alt="biznet-logo"
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8  p-4">
          <ul className="mt-3">
            {sidebarData.map((item, index) => (
              <li
                key={index}
                className={`py-1 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes(item.path) &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to={item.path}
                  className={({ isActive }) => {
                    return `group block py-3 px-3.5 rounded-lg truncate transition duration-300 hover:bg-violet-800 hover:text-white  ${
                      isActive ? "bg-violet-800 text-white" : "text-gray-500"
                    }`;
                  }}
                >
                  {({ isActive }) => (
                    <div className="flex items-center">
                      <img
                        className={`h-6 w-6 ${
                          isActive
                            ? "filter brightness-0  invert"
                            : "group-hover:brightness-0 group-hover:invert"
                        }`}
                        src={item.icon}
                        alt=""
                      />
                      <span className="text-[16px] font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {item.name}
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}

            {/* Logout */}
            <li
              className={` py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                pathname.includes("/") &&
                "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
              }`}
            >
              <button
                className="group block py-3 px-3.5 rounded-lg truncate transition duration-300 hover:bg-violet-800 text-gray-500 hover:text-white w-full cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <img
                    className={`h-6 w-6 
                     filter group-hover:brightness-0 group-hover:invert`}
                    src="/src/assets/icons/logout.svg"
                    alt=""
                  />
                  <span className="text-[16px]  font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Logout
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar1;
