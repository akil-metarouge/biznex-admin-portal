import React, { useState, useEffect } from "react";
import Image01 from "../../images/icon-01.svg";
import Image02 from "../../images/icon-02.svg";
import Image03 from "../../images/icon-03.svg";
import ActiveUsersTableItem from "./ActiveUsersTableItem";

function ActiveUsersTable({ selectedItems }) {
  const orders = [
    {
      id: "0",
      image: Image01,
      order: "#123567",
      date: "22/01/2024",
      customer: "Patricia Semklo",
      total: "$129.00",
      status: "Refunded",
      items: "1",
      location: "🇨🇳 Shanghai, CN",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "1",
      image: Image01,
      order: "#779912",
      date: "22/01/2024",
      customer: "Dominik Lamakani",
      total: "$89.00",
      status: "Approved",
      items: "2",
      location: "🇲🇽 Mexico City, MX",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "2",
      image: Image02,
      order: "#889924",
      date: "22/01/2024",
      customer: "Ivan Mesaros",
      total: "$89.00",
      status: "Approved",
      items: "2",
      location: "🇮🇹 Milan, IT",
      type: "One-time",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "3",
      image: Image01,
      order: "#897726",
      date: "22/01/2024",
      customer: "Maria Martinez",
      total: "$59.00",
      status: "Pending",
      items: "1",
      location: "🇮🇹 Bologna, IT",
      type: "One-time",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "4",
      image: Image03,
      order: "#123567",
      date: "22/01/2024",
      customer: "Vicky Jung",
      total: "$39.00",
      status: "Refunded",
      items: "1",
      location: "🇬🇧 London, UK",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "5",
      image: Image01,
      order: "#896644",
      date: "21/01/2024",
      customer: "Tisho Yanchev",
      total: "$59.00",
      status: "Approved",
      items: "1",
      location: "🇫🇷 Paris, FR",
      type: "One-time",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "6",
      image: Image03,
      order: "#136988",
      date: "21/01/2024",
      customer: "James Cameron",
      total: "$89.00",
      status: "Approved",
      items: "1",
      location: "🇫🇷 Marseille, FR",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "7",
      image: Image03,
      order: "#442206",
      date: "21/01/2024",
      customer: "Haruki Masuno",
      total: "$129.00",
      status: "Approved",
      items: "2",
      location: "🇺🇸 New York, USA",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "8",
      image: Image02,
      order: "#764321",
      date: "21/01/2024",
      customer: "Joe Huang",
      total: "$89.00",
      status: "Pending",
      items: "2",
      location: "🇨🇳 Shanghai, CN",
      type: "One-time",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "9",
      image: Image01,
      order: "#908764",
      date: "21/01/2024",
      customer: "Carolyn McNeail",
      total: "$59.00",
      status: "Refunded",
      items: "1",
      location: "🇬🇧 Sheffield, UK",
      type: "Subscription",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Nylah Whitehead",
      email: "nylahwhitehead@gmail.com",
      joinedOn: "18 Nov 2024",
    },
    {
      id: 2,
      name: "Alec Hess",
      email: "alechess@526gmail.com",
      joinedOn: "15 Nov 2024",
    },
    {
      id: 3,
      name: "Sarah Nieves",
      email: "sarahnieves@gmail.com",
      joinedOn: "15 Nov 2024",
    },
    {
      id: 4,
      name: "Hayes Mckenzie",
      email: "hayesmckenzie@gmail.com",
      joinedOn: "14 Nov 2024",
    },
    {
      id: 5,
      name: "Kane Raymond",
      email: "kaneraymond19@gmail.com",
      joinedOn: "10 Nov 2024",
    },
    {
      id: 6,
      name: "Luke Curtis",
      email: "lukeurtis2255@gmail.com",
      joinedOn: "10 Nov 2024",
    },
    {
      id: 7,
      name: "Zayden Orr",
      email: "orrzayden627@gmail.com",
      joinedOn: "09 Nov 2024",
    },
    {
      id: 8,
      name: "Coleman Levine",
      email: "colemanlevine@gmail.com",
      joinedOn: "02 Nov 2024",
    },
    {
      id: 9,
      name: "Gerardo Tillman",
      email: "gerardotillman@gmail.com",
      joinedOn: "30 Oct 2024",
    },
    {
      id: 10,
      name: "Jaime Mejia",
      email: "jaimemejia1132@gmail.com",
      joinedOn: "26 Oct 2024",
    },
    {
      id: 11,
      name: "Makenna Howe",
      email: "makennahowe525@gmail.com",
      joinedOn: "19 Oct 2024",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xs rounded-2xl relative ">
      <div>
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl px-7">
          <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60 -11">
            {/* Table header */}
            <thead className="text-[16px] font-semibold  text-[#545454] dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20   border-[#dfdfdf]">
              <tr>
                <th className="px-2 first:pl-0 last:pr-5 py-6 whitespace-nowrap">
                  {" "}
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">Email ID</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left">Joined On</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-0 py-6 whitespace-nowrap">
                  <div className="font-semibold text-left"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {users.map((order) => {
              return (
                <ActiveUsersTableItem
                  key={order.id}
                  id={order.id}
                  name={order.name}
                  email={order.email}
                  joinedOn={order.joinedOn}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActiveUsersTable;
