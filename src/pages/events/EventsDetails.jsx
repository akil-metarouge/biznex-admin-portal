import { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import EventDetailsPage from "./EventDetails";

function EventsDetails() {
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState({});

  const fetchUsers = async () => {
    setIsLoading(true);
    const apiURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/admin/admin-event-detail?event_id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data?.status === 1) {
        setEventDetails(data || {});
      } else {
        console.error("Failed to fetch invited users:", data);
        setError("Failed to fetch invited users");
      }
    } catch (error) {
      console.error("Error fetching invited users:", error);
      setError("An error occurred while fetching invited users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-4 mb-10">
          {/*  Site header */}
          <BackButton />
          <EventDetailsPage data={eventDetails?.data} />
        </div>
      </div>
    </div>
  );
}

export default EventsDetails;

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mt-10 mb-6">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="mr-4.5 p-4 py-3.5 text-sm font-semibold btn bg-white hover:bg-gray-100 text-violet-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg transition duration-300 flex items-center shadow-none"
      >
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
      <h2 className="text-2xl font-bold text-black">Beyond Boundaries</h2>
    </div>
  );
};
