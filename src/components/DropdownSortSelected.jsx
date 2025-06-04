import { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import { Check } from "lucide-react";

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent * 100),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function DropdownSortSelected({
  align = "left",
  label = "Filter",
  selectedValue,
  menuIcon,
  items,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Close on outside click
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !dropdownOpen) return;
      if (
        dropdown.current.contains(target) ||
        trigger.current?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close on Escape key
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`inline-flex items-center text-sm text-[#545454] dark:text-gray-400 font-semibold cursor-pointer ${
          menuIcon ? "cursor-pointer" : ""
        }`}
      >
        {label}
        {menuIcon ? (
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 ml-1 fill-current text-gray-800 dark:text-gray-500 shrink-0"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        )}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-md overflow-hidden mt-1 min-w-[140px] ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <ul className="py-1">
            {items.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    item.onClick?.();
                  }}
                  className={`w-full px-4 py-2 text-sm flex items-center justify-between ${
                    selectedValue === item.value
                      ? "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 font-semibold"
                      : "text-gray-400"
                  } hover:text-black dark:hover:text-gray-300 cursor-pointer text-nowrap`}
                  style={{
                    color: item?.textColor || undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (item?.textColor)
                      e.currentTarget.style.color = darkenColor(
                        item.textColor,
                        0.1
                      );
                  }}
                  onMouseLeave={(e) => {
                    if (item?.textColor)
                      e.currentTarget.style.color = item.textColor;
                  }}
                >
                  {item.label}
                  {item.icon ? (
                    <span className="ml-4">{item.icon}</span>
                  ) : (
                    <Check className="w-4 h-4 text-violet-600 ml-2" />
                  )}
                </button>
                {idx < items.length - 1 && (
                  <div className="border-t border-gray-100 mx-4 my-1" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownSortSelected;
