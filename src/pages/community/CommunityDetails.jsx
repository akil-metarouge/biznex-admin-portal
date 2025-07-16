import React, { useState } from "react";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import Image01 from "../../images/user-64-01.jpg";
import bgImage from "./../../images/bg-image.png";
import User from "../../images/user.svg";
import Report from "../../images/report.svg";
import Comment from "../../images/comment.svg";
import CommunityDescription from "../../partials/community/CommunityDescription";
import EditMenu from "../../components/DropdownEditMenu";
import SearchForm from "../../partials/actions/SearchForm";
import { Link } from "react-router-dom";

function CommunityDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [communityDetails, setCommunityDetails] = useState({
    id: 1,
    name: "Entrepreneurship Nexus",
    image: Image01,
    bgImage: bgImage,
    location: "USA",
    accessibility: "Private",
    description:
      "Welcome to Entrepreneur Nexus, a dynamic community where visionary entrepreneurs come together a dynamic community where visionary entrepreneurs come together to connect, collaborate, and grow. Join us to share ideas, seek advice, and build lasting relationships. Whether you're a seasoned entrepreneur or just starting out, you'll find a supportive community to help you succeed.",
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
    requests: {
      meta: {
        total: 10,
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
      ],
    },
  });

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
          searchField={true}
          placeholder="Search Community"
          backButton={true}
        />

        <main className="grow">
          <div className="w-full px-5 lg:pl-0 pr-5 mx-auto mb-5">
            {/* Feed */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7">
                <CommunityDescription
                  name={communityDetails?.name}
                  image={communityDetails?.image}
                  bgImage={communityDetails?.bgImage}
                  members={communityDetails?.members?.meta?.total}
                  accessibility={communityDetails?.accessibility}
                  description={communityDetails?.description}
                />
              </div>

              {/* Right Section */}
              <div className="col-span-12 lg:col-span-5">
                {/* Reported Count */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
                        <img
                          className="w-6"
                          src={Report}
                          alt="Reported Posts"
                        />
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
                          src={Comment}
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
                <div className="bg-white rounded-lg shadow-sm py-6 pl-6 pr-2 mb-6">
                  <h3 className="text-md font-bold text-black mb-4">
                    Join Requests ({communityDetails.requests?.meta?.total})
                  </h3>
                  <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {communityDetails.requests?.data?.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between mb-5 last:mb-0"
                      >
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full border border-white mr-3"
                            src={request.image}
                            alt={request.name}
                          />
                          <div>
                            <p className="text-sm font-medium text-black">
                              {request.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {request.position}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="border border-gray-800 w-24 h-10 rounded-lg text-sm text-gray-800 hover:bg-gray-800 hover:text-white cursor-pointer">
                            Decline
                          </button>
                          <button className="border border-violet-800 w-24 h-10 rounded-lg text-sm text-white bg-violet-800 hover:bg-violet-50 hover:text-violet-800 cursor-pointer ml-2">
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Members */}
                <div className="bg-white rounded-lg shadow-sm py-6 pl-6 pr-2">
                  <h3 className="text-md font-bold text-black mb-4">
                    Members ({communityDetails.members?.meta?.total})
                  </h3>
                  <div className="my-4">
                    <SearchForm placeholder="Search Member" />
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
                            <p className="text-sm font-medium text-black">
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default CommunityDetails;
