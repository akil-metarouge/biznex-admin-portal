import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EventsTableItem from "./EventsTableItem";
import DropdownSortSelected from "../../components/DropdownSortSelected";
import Pagination from "../users/pagination";
import moment from "moment";

function EventsTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Read from URL
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialRowsPerPage = parseInt(searchParams.get("perPage")) || 10;

  const [selected, setSelected] = useState("all");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState({});
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  // ✅ Update URL when page or perPage changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("perPage", rowsPerPage.toString());
    setSearchParams(params);
  }, [page, rowsPerPage]);

  const fetchUsers = async (limit = rowsPerPage, currentPage = page) => {
    setIsLoading(true);
    const apiURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/admin/list-event?limit=${limit}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data?.status === 1) {
        setEvents(data || {});
      } else {
        console.error("Failed to fetch events data:", data);
        setError("Failed to fetch events data");
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
      setError("An error occurred while fetching events data");
    } finally {
      setIsLoading(false);
    }
  };

  const sortItems = [
    {
      label: "All",
      value: "all",
      onClick: () => setSelected("all"),
    },
    {
      label: "Online",
      value: "online",
      onClick: () => setSelected("online"),
    },
    {
      label: "Offline",
      value: "offline",
      onClick: () => setSelected("offline"),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]); // Refetch when page or rowsPerPage changes

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xs rounded-2xl relative ">
      <div>
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl">
          <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
            {/* Table header */}
            <thead className="text-[16px] font-semibold  text-[#545454] dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  {" "}
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">Scheduled On</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">Attendees</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold flex items-center">
                    <DropdownSortSelected
                      align="right"
                      label="Type"
                      items={sortItems}
                      selectedValue={selected}
                    />
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {events?.data?.map((event) => {
              return (
                <EventsTableItem
                  key={event.id}
                  id={event.id}
                  name={event.event_name}
                  category={"data missing"}
                  scheduledOn={`${moment(event?.event_date).format(
                    "DD MMM YYYY"
                  )}, ${(
                    moment(event?.end_date).diff(
                      moment(event?.event_date),
                      "minutes"
                    ) / 60
                  ).toFixed(2)}hrs`}
                  customer={event.customer}
                  attendees={event.attendees_count}
                  type={event.is_online ? "Online" : "Offline"}
                  status={"data missing"}
                />
              );
            })}
          </table>
        </div>
        {events?.data?.length > 0 && (
          <div>
            <Pagination
              totalItems={events?.pagination?.totalItems || 0}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(newPage) => {
                setPage(newPage);
              }}
              onRowsPerPageChange={(newRowsPerPage) => {
                setRowsPerPage(newRowsPerPage);
                setPage(1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsTable;
