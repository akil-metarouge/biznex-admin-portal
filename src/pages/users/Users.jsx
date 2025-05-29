import { useState } from "react";
import Sidebar1 from "../../partials/Sidebar1";
import Header1 from "../../partials/Header1";
import ActiveUsersTable from "../../partials/users/ActiveusersTable";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectedItems = (selectedItems) => {};

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar1 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-5 lg:pl-0">
        {/*  Site header */}
        <Header1
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title={"Users"}
          count={3257}
          actionButton={true}
          actionButtonText={"Invite User"}
          searchField={true}
          placeholder="Search Event"
        />

        <main className="grow">
          <div className="pr-5  w-full max-w-[96rem] mx-auto mb-5">
            <ActiveUsersTable selectedItems={handleSelectedItems} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
