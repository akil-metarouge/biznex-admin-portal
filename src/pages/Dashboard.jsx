import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import iconImg from "../assets/icons/user.svg";
import globeIcon from "../assets/icons/globe.svg";
import lockIcon from "../assets/icons/lock.svg";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const topContributors = [
    {
      name: "John Alexander",
      title: "Chairman at Clouds Technologies",
      connections: 728,
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Bobby Shields",
      title: "CEO at Smartcity Technologies",
      connections: 361,
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Cale Stafford",
      title: "CSO at Nova Nexus Communications",
      connections: 526,
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const recentUsers = [
    ["Beckham Mcdaniel", "beckhammcdaniel@gmail.com", "26 Nov 2024"],
    ["Audriana English", "audrianaenglish@gmail.com", "23 Nov 2024"],
    ["Drake Ashley", "drakeashley123@gmail.com", "20 Nov 2024"],
    ["Chana Herrera", "chanaherrera019@gmail.com", "16 Nov 2024"],
    ["Tori Skinner", "toriskinner077@gmail.com", "30 Oct 2024"],
    ["Aria Fisher", "iamariafisher@gmail.com", "19 Oct 2024"],
    ["Janiyah Dorsey", "janiyahdorseymaingmail.com", "01 Oct 2024"],
    ["Arnav Chase", "thisisarnavchase@gmail.com", "30 Oct 2024"],
    ["Christopher Morrow", "christophermorrow@gmail.com", "19 Oct 2024"],
    ["Maria Hancock", "mariahancock1010@gmail.com", "01 Oct 2024"],
  ];

  const joinRequests = [
    "Jerry Ayala",
    "Gideon Roberson",
    "Kailee Barrera",
    "Arjun Mccarty",
    "Raphael Savage",
    "Aileen Vega",
    "Vance Munoz",
    "Olive Trevino",
  ];

  const requests = [
    {
      name: "Jerry Ayala",
      community: "Entrepreneur Nexus",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Gideon Roberson",
      community: "Crucible of Creativity",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Kailee Barrera",
      community: "Collaborators' Corner",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Arjun Mccarty",
      community: "BizForward Community",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Raphael Savage",
      community: "The Business Brigade",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Aileen Vega",
      community: "Visionary Nexus",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      name: "Vance Munoz",
      community: "Enterprise Alliance",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      name: "Olive Trevino",
      community: "Global NexConnect",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ];

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title="Dashboard"
          actionButton={true}
          actionButtonText="Create Post"
        />

        <main className="grow">
          <div className="pr-6 space-y-6 flex gap-6 min-h-screen">
            {/* Stats */}
            <div className="w-[67%]">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-2xl flex items-center">
                  <div className="bg-violet-800 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <img src={iconImg} className="h-6 w-6" alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-black">14,738</p>
                    <p className="text-sm text-gray-500 mt-1">No. of Users</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex items-center">
                  <div className="bg-[#0098DC] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <img src={iconImg} className="h-6 w-6" alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-black">14,738</p>
                    <p className="text-sm text-gray-500 mt-1">No. of Users</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl flex items-center">
                  <div className="bg-[#FF6D5D] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <img src={iconImg} className="h-6 w-6" alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-black">14,738</p>
                    <p className="text-sm text-gray-500 mt-1">No. of Users</p>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="bg-white p-6 rounded-2xl my-6">
                <h2 className="text-lg text-[#212121] font-semibold mb-4">
                  Top Contributors
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {topContributors.map((user, idx) => (
                    <div
                      key={idx}
                      className="bg-violet-800/10 px-4 py-9 rounded-2xl text-center flex flex-col items-center"
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-[90px] h-[90px] rounded-full mb-4 border-2 border-white"
                      />
                      <p className="font-bold text-base text-black mb-1.5">
                        {user.name}
                      </p>
                      <p className="text-sm text-[#545454] max-w-[133px]">
                        {user.title}
                      </p>
                      <p className="text-sm text-violet-800 font-semibold mt-2.5">
                        {user.connections} Connections
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Joined */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Recently Joined</h2>
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                  <table className="table-auto w-full text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Joined On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(([name, email, date], idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-2">{name}</td>
                          <td className="px-4 py-2">{email}</td>
                          <td className="px-4 py-2">{date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Side Section */}
            <div className="w-[33%] ">
              <div className="bg-white p-6 rounded-2xl h-fit mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Communities (42)
                </h2>

                <div className="bg-white pb-4 px-0 rounded-lg flex items-center">
                  <div className="bg-[#4f5ef7] p-3 rounded-full mr-4">
                    <img src={globeIcon} className="h-6 w-6" alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-black">24</p>
                    <p className="text-[#3F3F3F]">
                      Public Community <span>(20 Active)</span>
                    </p>
                  </div>
                </div>
                <hr className="border-[#E3E3E3]" />

                <div className="bg-white pt-4 px-0 rounded-lg  flex items-center">
                  <div className="bg-[#9b6ef3] p-3  rounded-full mr-4">
                    <img src={lockIcon} className="h-6 w-6" alt="" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">18</p>
                    <p className="text-sm text-[#3F3F3F]">
                      Private Community <span>(14 Active)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f4f9] flex items-center justify-center">
                <div className="bg-white rounded-2xl  p-5 w-full max-w-md">
                  <h2 className="text-lg text-[#212121] font-semibold mb-4">
                    Community Join Requests ({requests.length})
                  </h2>
                  <ul className="space-y-4">
                    {requests.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between mb-5"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={req.avatar}
                            alt={req.name}
                            className="w-[42px] h-[42px] rounded-full object-cover"
                          />
                          <div>
                            <p className="text-base font-semibold text-[#111827]">
                              {req.name}
                            </p>
                            <p className="text-sm text-[#606060]">
                              {req.community}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-7 btn h-10 rounded-lg bg-white dark:bg-gray-800 border-[#1F1F1F] dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-[#1F1F1F] hover:text-gray-600 cursor-pointer text-sm font-semibold max-w-[85px]">
                            Decline
                          </button>
                          <button className="px-7 btn h-10 rounded-lg  btn bg-violet-800 text-white hover:bg-violet-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer text-sm font-semibold max-w-[85px]">
                            Accept
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
