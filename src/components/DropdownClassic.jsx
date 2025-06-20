import { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";

function DropdownClassic({
  width = "w-44",
  label = "Status",
  options = [],
  selected,
  onChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        dropdown.current &&
        dropdownOpen &&
        !dropdown.current.contains(target) &&
        !trigger.current.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close on Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (dropdownOpen && keyCode === 27) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex h-12">
      <label
        htmlFor="dropdown-classic"
        className="absolute -top-3 left-[13px] text-sm bg-white px-1.5 rounded-xl font-medium cursor-pointer"
      >
        {label}
      </label>
      <button
        ref={trigger}
        className={`btn justify-between min-w-44 ${width} bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900/80 dark:text-gray-300 dark:hover:text-gray-100 px-[18px] shadow-none text-[16px] font-semibold cursor-pointer`}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        id="dropdown-classic"
      >
        <span>{options.find((o) => o.id === selected)?.label || "Select"}</span>
        <svg
          className="shrink-0 ml-1 fill-current text-gray-900/80 dark:text-gray-500"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>

      <Transition
        show={dropdownOpen}
        tag="div"
        className="z-10 absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-sm text-gray-600 dark:text-gray-300"
        >
          {options.map((option) => (
            <button
              key={option.id}
              tabIndex="0"
              className={`flex items-center w-full hover:bg-gray-50 dark:hover:bg-gray-700/20 py-1 px-3 cursor-pointer hover:text-violet-800/80 transition duration-300 text-[15px] ${
                selected === option.id ? "text-violet-800" : ""
              }`}
              onClick={() => {
                onChange(option.id);
                setDropdownOpen(false);
              }}
            >
              <svg
                className={`shrink-0 mr-2 fill-current text-violet-800 ${
                  selected === option.id ? "" : "invisible"
                }`}
                width="12"
                height="9"
                viewBox="0 0 12 9"
              >
                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
              </svg>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </Transition>
    </div>
  );
}

export default DropdownClassic;
