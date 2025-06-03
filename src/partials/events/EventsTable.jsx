import { useState, useEffect } from "react";
import EventsTableItem from "./EventsTableItem";
import DropdownSortSelected from "../../components/DropdownSortSelected";

function EventsTable({ selectedItems }) {
  const orders = [
    {
      id: "1",
      name: "Visionary Talks",
      category: "public",
      scheduledOn: "12 Jun 2025, 5.00hrs",
      customer: "Alice Johnson",
      attendees: "45",
      type: "online",
      status: "upcoming",
    },
    {
      id: "2",
      name: "Leadership Bootcamp",
      category: "NextGen Leaders",
      scheduledOn: "20 Jul 2025, 3.30hrs",
      customer: "Brian Adams",
      attendees: "78",
      type: "offline",
      status: "live",
    },
    {
      id: "3",
      name: "Innovation Summit",
      category: "Crucible of Creativity",
      scheduledOn: "05 Aug 2025, 1.00hrs",
      customer: "Catherine West",
      attendees: "102",
      type: "online",
      status: "completed",
    },
    {
      id: "4",
      name: "Growth Hacking 101",
      category: "public",
      scheduledOn: "15 Sep 2025, 4.00hrs",
      customer: "David Moore",
      attendees: "36",
      type: "offline",
      status: "upcoming",
    },
    {
      id: "5",
      name: "Creative Strategy Lab",
      category: "Crucible of Creativity",
      scheduledOn: "01 Oct 2025, 6.00hrs",
      customer: "Emily Stone",
      attendees: "67",
      type: "online",
      status: "live",
    },
    {
      id: "6",
      name: "Future Leaders Meetup",
      category: "NextGen Leaders",
      scheduledOn: "22 Oct 2025, 2.30hrs",
      customer: "Franklin Reeves",
      attendees: "51",
      type: "offline",
      status: "completed",
    },
    {
      id: "7",
      name: "Marketing Minds",
      category: "public",
      scheduledOn: "10 Nov 2025, 5.30hrs",
      customer: "Grace Lee",
      attendees: "88",
      type: "online",
      status: "upcoming",
    },
    {
      id: "8",
      name: "Design Thinking Jam",
      category: "Crucible of Creativity",
      scheduledOn: "18 Nov 2025, 3.00hrs",
      customer: "Henry Black",
      attendees: "74",
      type: "offline",
      status: "live",
    },
    {
      id: "9",
      name: "Strategic Insight Forum",
      category: "NextGen Leaders",
      scheduledOn: "25 Nov 2025, 4.30hrs",
      customer: "Isabelle Grant",
      attendees: "59",
      type: "online",
      status: "completed",
    },
    {
      id: "10",
      name: "Startup Kickoff",
      category: "public",
      scheduledOn: "30 Nov 2025, 1.30hrs",
      customer: "Jack Nolan",
      attendees: "40",
      type: "offline",
      status: "upcoming",
    },
  ];

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("all");

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
    setList(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {list.map((order) => {
              return (
                <EventsTableItem
                  key={order.id}
                  id={order.id}
                  name={order.name}
                  category={order.category}
                  scheduledOn={order.scheduledOn}
                  customer={order.customer}
                  attendees={order.attendees}
                  type={order.type}
                  status={order.status}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default EventsTable;
