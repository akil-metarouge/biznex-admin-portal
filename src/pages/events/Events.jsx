import { useState } from "react";

import Sidebar1 from "../../partials/Sidebar1";
import Header1 from "../../partials/Header1";
import EventsTable from "../../partials/events/EventsTable";

function Events() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectedItems = (selectedItems) => {};

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar1 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header1
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title={"Event"}
          count={32}
          actionButton={true}
          actionButtonText={"Create Event"}
          dropdown1={true}
          dropdown1Label="Status"
          dropdown1Options={[
            { id: 0, label: "All" },
            { id: 1, label: "Pending" },
            { id: 2, label: "Resolved" },
            { id: 3, label: "Rejected" },
          ]}
          searchField={true}
          placeholder="Search Event"
        />

        <main className="grow">
          <div className="pr-5 w-full max-w-[96rem] mx-auto mb-5">
            <EventsTable selectedItems={handleSelectedItems} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Events;
