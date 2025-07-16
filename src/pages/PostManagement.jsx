import React, { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Comment from "../components/Comment";
import PeopleIcon from "../assets/icons/people.svg";
import LikeIcon from "../assets/icons/like.svg";
import CommentIcon from "../assets/icons/comment.svg";
import Image01 from "../images/user-64-01.jpg";
import bgImage from "./../images/bg-image.png";
import User from "../images/user.svg";
import Report from "../images/report.svg";
import CommentImage from "../images/comment.svg";
import SearchForm from "../partials/actions/SearchForm";
import { Link } from "react-router-dom";
import EditMenu from "../components/DropdownEditMenu";

function PostManagement() {
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

  const [communityDetails, setCommunityDetails] = useState({
    id: 1,
    name: "Entrepreneurship Nexus",
    image: Image01,
    bgImage: bgImage,
    location: "USA",
    accessibility: "Private",

    status: "Active",
    members: {
      meta: {
        total: 20,
      },
      data: [
        {
          id: 1,
          name: "John Doe",
          image: Image01,
          position: "Founder",
        },
        {
          id: 2,
          name: "Jane Smith",
          image: Image01,
          position: "Co-Founder",
        },
        {
          id: 3,
          name: "Alice Johnson",
          image: Image01,
          position: "Marketing Manager",
        },
        {
          id: 4,
          name: "Bob Brown",
          image: Image01,
          position: "CTO",
        },
        {
          id: 5,
          name: "Charlie Davis",
          image: Image01,
          position: "Product Manager",
        },
        {
          id: 6,
          name: "Diana Evans",
          image: Image01,
          position: "UX Designer",
        },
        {
          id: 7,
          name: "Ethan Green",
          image: Image01,
          position: "Data Analyst",
        },
        {
          id: 8,
          name: "Fiona Harris",
          image: Image01,
          position: "Sales Executive",
        },
        {
          id: 9,
          name: "George King",
          image: Image01,
          position: "Customer Support",
        },
        {
          id: 10,
          name: "Hannah Lee",
          image: Image01,
          position: "Content Writer",
        },
        {
          id: 11,
          name: "Ian White",
          image: Image01,
          position: "Business Analyst",
        },
        {
          id: 12,
          name: "Julia Black",
          image: Image01,
          position: "HR Manager",
        },
        {
          id: 13,
          name: "Kevin Brown",
          image: Image01,
          position: "Software Engineer",
        },
        {
          id: 14,
          name: "Laura Green",
          image: Image01,
          position: "Graphic Designer",
        },
        {
          id: 15,
          name: "Mike Blue",
          image: Image01,
          position: "SEO Specialist",
        },
        {
          id: 16,
          name: "Nina Red",
          image: Image01,
          position: "Social Media Manager",
        },
        {
          id: 17,
          name: "Oscar Yellow",
          image: Image01,
          position: "Financial Analyst",
        },
        {
          id: 18,
          name: "Paula Purple",
          image: Image01,
          position: "Operations Manager",
        },
        {
          id: 19,
          name: "Quentin Orange",
          image: Image01,
          position: "Legal Advisor",
        },
        {
          id: 20,
          name: "Rachel Pink",
          image: Image01,
          position: "Customer Success Manager",
        },
      ],
    },
    reportedUsers: 12,
    reportedPosts: 19,
    reportedComments: 21,
  });

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
          title="Post Management"
          actionButton={true}
          actionButtonText="Create Post"
          searchField={true}
          placeholder={"Search in Entrepreneur Nexus "}
        />

        <main className="grow">
          <div className="pr-6 space-y-6 flex gap-6 min-h-screen">
            {/* Stats */}
            <div className="w-[67%]">
              <div className="md:col-span-3  bg-white rounded-2xl ">
                <div className="flex items-center gap-4  px-7 pt-7">
                  <img
                    src="https://randomuser.me/api/portraits/women/75.jpg"
                    alt="Nylah Whitehead"
                    className="w-[70px] h-[70px] rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Nylah Whitehead
                    </div>
                    <div className="text-sm text-[#282626]">
                      CEO at Nebula Network Services
                    </div>
                    <div className="text-xs text-[#848484] mt-1 flex items-center gap-2">
                      <span>12 hr ago</span> <img src={PeopleIcon} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="mb-[18px] mt-6 border-[#DDDDDD]" />
                <p className="text-[#0A0A0A] mb-[18px] px-7 ">
                  App development is a dynamic and rapidly evolving field,
                  requiring developers to stay updated with the latest trends.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
                  alt="Post"
                  className="w-full h-[400px] object-cover "
                />
                <div className="flex gap-3.5 text-sm text-[#272838] font-medium py-6 px-7">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img src={LikeIcon} className="h-5 w-5" alt="" />
                    <span>865 Likes</span>
                  </div>
                  <div className="w-px h-5 bg-[#A4A4A4] self-center" />
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img src={CommentIcon} className="h-5 w-5" alt="" />
                    <span>29 Comments</span>
                  </div>
                </div>
                <hr className="mb-5 border-[#DDDDDD]" />

                {/* Comments */}
                <div className="px-7 pb-7">
                  <h4 className="font-semibold text-black">Comments</h4>
                  <Comment
                    name="Liam Anderson"
                    title="CEO at Vertex IT Systems"
                    comment="Absolutely! Staying current with the latest trends in app development is essential for creating innovative and competitive applications."
                    avatar="https://randomuser.me/api/portraits/men/76.jpg"
                  />

                  <button className="text-violet-800 mt-5 cursor-pointer font-semibold  transition text-sm">
                    Show More Comments
                  </button>
                </div>
              </div>
              <div className="md:col-span-3  bg-white rounded-2xl mt-4">
                <div className="flex items-center gap-4  px-7 pt-7">
                  <img
                    src="https://randomuser.me/api/portraits/women/75.jpg"
                    alt="Nylah Whitehead"
                    className="w-[70px] h-[70px] rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Nylah Whitehead
                    </div>
                    <div className="text-sm text-[#282626]">
                      CEO at Nebula Network Services
                    </div>
                    <div className="text-xs text-[#848484] mt-1 flex items-center gap-2">
                      <span>12 hr ago</span> <img src={PeopleIcon} alt="" />
                    </div>
                  </div>
                </div>
                <hr className="mb-[18px] mt-6 border-[#DDDDDD]" />
                <p className="text-[#0A0A0A] mb-[18px] px-7 ">
                  App development is a dynamic and rapidly evolving field,
                  requiring developers to stay updated with the latest trends.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
                  alt="Post"
                  className="w-full h-[400px] object-cover "
                />
                <div className="flex gap-3.5 text-sm text-[#272838] font-medium py-6 px-7">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img src={LikeIcon} className="h-5 w-5" alt="" />
                    <span>865 Likes</span>
                  </div>
                  <div className="w-px h-5 bg-[#A4A4A4] self-center" />
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img src={CommentIcon} className="h-5 w-5" alt="" />
                    <span>29 Comments</span>
                  </div>
                </div>
                <hr className="mb-5 border-[#DDDDDD]" />

                {/* Comments */}
                <div className="px-7 pb-7">
                  <h4 className="font-semibold text-black">Comments</h4>
                  <Comment
                    name="Liam Anderson"
                    title="CEO at Vertex IT Systems"
                    comment="Absolutely! Staying current with the latest trends in app development is essential for creating innovative and competitive applications."
                    avatar="https://randomuser.me/api/portraits/men/76.jpg"
                  />

                  <button className="text-violet-800 mt-5 cursor-pointer font-semibold  transition text-sm">
                    Show More Comments
                  </button>
                </div>
              </div>
            </div>

            {/* Side Section */}
            <div className="w-[33%] ">
              {/* Reported Count */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between pb-5 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                      <img className="w-5" src={User} alt="Reported Users" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-lg">
                        {communityDetails?.reportedUsers || 0}
                      </h3>
                      <p>Reported Users</p>
                    </div>
                  </div>
                  <button className="border border-violet-800 w-20 h-8 rounded-lg text-sm text-violet-800 hover:bg-violet-800 hover:text-white cursor-pointer">
                    View
                  </button>
                </div>
                <div className="flex items-center justify-between py-5 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                      <img className="w-6" src={Report} alt="Reported Posts" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-lg">
                        {communityDetails?.reportedPosts || 0}
                      </h3>
                      <p>Reported Posts</p>
                    </div>
                  </div>
                  <button className="border border-violet-800 w-20 h-8 rounded-lg text-sm text-violet-800 hover:bg-violet-800 hover:text-white cursor-pointer">
                    View
                  </button>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                      <img
                        className="w-5"
                        src={CommentImage}
                        alt="Reported Comments"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-lg">
                        {communityDetails?.reportedComments || 0}
                      </h3>
                      <p>Reported Comments</p>
                    </div>
                  </div>
                  <button className="border border-violet-800 w-20 h-8 rounded-lg text-sm text-violet-800 hover:bg-violet-800 hover:text-white cursor-pointer">
                    View
                  </button>
                </div>
              </div>

              {/* Join Requests */}
              <div className="bg-[#f6f4f9] flex items-center justify-center">
                <div className="bg-white rounded-2xl  p-5 w-full max-w-md">
                  <h2 className="text-lg text-[#212121] font-semibold mb-4">
                    Join Requests ({requests.length})
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

              {/* Members */}
              <div className="bg-white rounded-2xl py-6 pl-6 pr-2 mt-4">
                <h3 className="text-md font-bold text-black mb-4">
                  Members ({communityDetails.members?.meta?.total})
                </h3>
                <div className="my-4">
                  <SearchForm placeholder="Search Member" fullWidth={true} />
                </div>
                <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {communityDetails.members?.data?.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between mb-5 last:mb-0"
                    >
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full border border-white mr-3"
                          src={member.image}
                          alt={member.name}
                        />
                        <div>
                          <p className="text-base font-medium text-black">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.position}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <EditMenu
                          align="right"
                          btnStyles="text-gray-800 hover:text-gray-500"
                        >
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                              // to="#0"
                            >
                              Option 1
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3"
                              // to="#0"
                            >
                              Option 2
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                              // to="#0"
                            >
                              Remove
                            </Link>
                          </li>
                        </EditMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PostManagement;
