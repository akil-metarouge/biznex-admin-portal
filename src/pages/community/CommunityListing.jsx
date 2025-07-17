import React, { useState } from "react";
import ImagePlaceholder from "../../assets/images/image-placeholder.png";

import SearchForm from "../../partials/actions/SearchForm";
import CommunityCard from "../../partials/community/CommunityCard";
import PaginationNumeric from "../../components/PaginationNumeric";

import Image01 from "../../images/user-64-01.jpg";
import Image02 from "../../images/user-64-02.jpg";
import Image03 from "../../images/user-64-03.jpg";
import Image04 from "../../images/user-64-04.jpg";
import Image05 from "../../images/user-64-05.jpg";
import Image06 from "../../images/user-64-06.jpg";
import Image07 from "../../images/user-64-07.jpg";
import Image08 from "../../images/user-64-08.jpg";
import Image09 from "../../images/user-64-09.jpg";
import Image10 from "../../images/user-64-10.jpg";
import Image11 from "../../images/user-64-11.jpg";
import Image12 from "../../images/user-64-12.jpg";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import ModalBlank from "../../components/ModalBlank";
import { Add } from "iconsax-react";

function CommunityListing() {
  const [createPostModal, setCreatePostModal] = useState(false);
  const openCreatePostModal = (e) => {
    console.log("hitted lasdlkfj");
    e.stopPropagation();
    setCreatePostModal(true);
  };
  const [communityOption, setCommunityOption] = useState("public");
  const items = [
    {
      id: 0,
      name: "Dominik McNeail",
      image: Image01,
      link: "#0",
      location: "🇮🇹",
      content: "Public",
      status: "Active",
      requests: 18,
    },
    {
      id: 1,
      name: "Ivan Mesaros",
      image: Image02,
      link: "#0",
      location: "🇫🇷",
      content: "Public",
      status: "Active",
    },
    {
      id: 2,
      name: "Tisha Yanchev",
      image: Image03,
      link: "#0",
      location: "🇩🇪",
      content: "Public",
      status: "Inactive",
      requests: 23,
    },
    {
      id: 3,
      name: "Sergio Gonnelli",
      image: Image04,
      link: "#0",
      location: "🇮🇹",
      content: "Public",
      status: "Active",
    },
    {
      id: 4,
      name: "Jerzy Wierzy",
      image: Image05,
      link: "#0",
      location: "🇪🇸",
      content: "Public",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Mirko Grubisic",
      image: Image06,
      link: "#0",
      location: "🇩🇪",
      content: "Public",
      status: "Inactive",
      requests: 5,
    },
    {
      id: 6,
      name: "Alisha Acharya",
      image: Image07,
      link: "#0",
      location: "🇬🇧",
      content: "Public",
      status: "Active",
    },
    {
      id: 7,
      name: "Brian Halligan",
      image: Image08,
      link: "#0",
      location: "🇺🇸",
      content: "Public",
      status: "Active",
    },
    {
      id: 8,
      name: "Patricia Semklo",
      image: Image09,
      link: "#0",
      location: "🇮🇳",
      content: "Public",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Maria Martinez",
      image: Image10,
      link: "#0",
      location: "🇮🇹",
      content: "Public",
      status: "Active",
      requests: 12,
    },
    {
      id: 10,
      name: "Vedad Siljak",
      image: Image11,
      link: "#0",
      location: "🇨🇦",
      content: "Public",
      status: "Active",
    },
    {
      id: 11,
      name: "Dominik Lamakani",
      image: Image12,
      link: "#0",
      location: "🇧🇪",
      content: "Public",
      status: "Inactive",
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          title={"Communities"}
          count={42}
          actionButton={true}
          actionButtonText={"Create Community"}
          actionButtonOnClick={openCreatePostModal}
          dropdown1={true}
          dropdown1Label="Status"
          dropdown1Options={[
            { id: 0, label: "All" },
            { id: 1, label: "Pending" },
            { id: 2, label: "Resolved" },
            { id: 3, label: "Rejected" },
          ]}
          dropdown2={true}
          dropdown2Label="Community Type"
          dropdown2Options={[
            { id: 0, label: "All" },
            { id: 1, label: "Public" },
            { id: 2, label: "Private" },
            { id: 3, label: "Restricted" },
          ]}
          searchField={true}
          placeholder="Search Community"
        />

        <main className="grow">
          <div className="px-4 lg:pl-0 sm:pr-5 w-full max-w-[96rem] mx-auto mb-5">
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {items.map((item) => {
                return (
                  <CommunityCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    link={item.link}
                    location={item.location}
                    content={item.content}
                    status={item.status}
                    requests={item.requests}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            {/* <div className="mt-8">
              <PaginationNumeric />
            </div> */}
          </div>
        </main>
      </div>
      <div className="m-1.5">
        {/* Start */}
        {/* Create Post Modal */}
        <ModalBlank
          id="create-post-modal"
          modalOpen={createPostModal}
          setModalOpen={openCreatePostModal}
          modalWidth={"min-w-[618px]"}
        >
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-8 w-full max-w-[618px]">
              <h2 className="text-center text-2xl font-semibold mb-6">
                Create Community
              </h2>

              {/* Cover Image Upload */}
              <div className="relative bg-[#F5F5F5] rounded-xl h-[200px] mb-6 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center relative">
                    <img
                      src={ImagePlaceholder}
                      alt=""
                      className="w-[60px] opacity-70"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-800 rounded-full text-white text-xs flex items-center justify-center">
                      <Add size="16" color="#FFFFFF" />
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">Upload Image</p>
                </div>
              </div>

              {/* Profile Image Circle */}
              <div className="relative w-[130px] h-[130px] -mt-16 mb-4 ml-4">
                <div className="absolute w-full h-full rounded-full bg-[#EEEEEE] flex items-center justify-center ">
                  <img src={ImagePlaceholder} alt="" className="w-12 h-12 " />
                  <div className="absolute bottom-0 right-0 w-7 h-7 bg-violet-800 rounded-full text-white text-xs flex items-center justify-center">
                    <Add size="22" color="#FFFFFF" />
                  </div>
                </div>
              </div>

              {/* Community Name Input */}
              <input
                type="text"
                placeholder="Community Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* Public / Private Radio */}
              <div className="flex items-center gap-8 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="manual"
                    checked={communityOption === "public"}
                    onChange={() => {
                      setCommunityOption("public");
                      // setCsvFile(null);
                      // setUsers([]);
                    }}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                    <div className="w-4 h-4 rounded-full  border-[3px] peer-checked:border-[3px] border-white  peer-checked:bg-violet-800" />
                  </div>
                  <span className="text-[16px] font-semibold">Public</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="csv"
                    className="peer hidden"
                    checked={communityOption === "private"}
                    onChange={() => {
                      setCommunityOption("private");
                      // setCsvFile(null);
                      // setUsers([]);
                    }}
                  />
                  <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                    <div className="w-4 h-4 rounded-full  border-[3px] peer-checked:border-[3px] border-white  peer-checked:bg-violet-800" />
                  </div>
                  <span className="ext-[16px] font-semibold">Private</span>
                </label>
              </div>

              {/* About Community */}
              <textarea
                placeholder="About Community"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
              />

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setCreatePostModal(false)}
                  className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-200 transition"
                >
                  Cancel
                </button>
                <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* <div className="text-center flex flex-col items-center gap-2.5">
            <h3 className="text-[20px] font-bold text-[#0A0A0A]">
              Suspend User
            </h3>
            <p className="max-w-[240px] text-base font-medium text-[#0A0A0A]">
              Are you sure you want to suspend this user?
            </p>
            <div className="w-full flex justify-between gap-3">
              <button
                onClick={() => setCreatePostModal(false)}
                className="w-1/2 p-6 py-3.5 text-base font-semibold btn border border-violet-800 text-violet-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg"
              >
                Cancel
              </button>
              <button className="w-1/2 py-3.5 text-base font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                Suspend
              </button>
            </div>
          </div> */}
        </ModalBlank>
      </div>
    </div>
  );
}

export default CommunityListing;
