import { ro } from "date-fns/locale";
import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { useState, useRef, useEffect } from "react";

const Pagination = ({
  totalItems = 30,
  options = [10, 20, 50],
  page,
  rowsPerPage: controlledRowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    controlledRowsPerPage || options[0]
  );
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const from = (currentPage - 1) * rowsPerPage + 1;
  const to = Math.min(currentPage * rowsPerPage, totalItems);

  // Handle dropdown toggle
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRowsChange = (option) => {
    const newRowsPerPage = option;
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    setIsDropdownOpen(false);
    onRowsPerPageChange?.(newRowsPerPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-end space-x-2 p-7  text-base bg-white rounded-md shadow-sm w-full text-black">
      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center">
          <span>Rows per page:</span>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer bg-white px-3 py-1.5 shadow-none  rounded-md  flex items-center justify-between min-w-[60px]"
          >
            <span>{rowsPerPage}</span>
            <ArrowDown2
              color="#B9B4B4"
              variant="Bold"
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleRowsChange(option)}
                className={`px-3 py-1.5 cursor-pointer hover:bg-gray-100 ${
                  option === rowsPerPage ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination info */}
      <span>
        {from} - {to} of {totalItems}
      </span>

      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`rounded-md ${
          currentPage === 1
            ? "text-[#D1D1D1] cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
      >
        <ArrowLeft2 className="h-[18px] w-[18px]" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`rounded-md  ${
          currentPage === totalPages
            ? "text-[#D1D1D1] cursor-not-allowed"
            : "text-black  cursor-pointer"
        }`}
      >
        <ArrowRight2 className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
};

export default Pagination;
