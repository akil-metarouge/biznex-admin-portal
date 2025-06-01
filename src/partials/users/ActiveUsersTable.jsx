import React, { useState, useEffect } from "react";
import Image01 from "../../images/icon-01.svg";
import Image02 from "../../images/icon-02.svg";
import Image03 from "../../images/icon-03.svg";
import ActiveUsersTableItem from "./ActiveUsersTableItem";

function ActiveUsersTable({ data, selectedItems }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(orders);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            {data.map((user) => {
              return (
                <ActiveUsersTableItem
                  key={user.reference}
                  id={user.reference}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  email={user.email}
                  joinedOn={user.date_invited}
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
