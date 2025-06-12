import { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { ArrowRight2 } from "iconsax-reactjs";
import avatar from "../../images/avatar-04.jpg";
import ReportedUsersTable from "../../partials/users/ReportedUsersTable";
import ReportedContentTable from "../../partials/users/ReportedContentTable";
import BlockedUsersTable from "../../partials/users/BlockedUsersTable";

function UserDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal"); // Add state for active section

  const companies = [
    {
      name: "Nebula Network Services",
      image: avatar,
    },
    { name: "Onyx Core", image: avatar },
    { name: "Zen Sphere", image: avatar },
  ];

  const reportStats = [
    { label: "Reported User By", count: 32 },
    { label: "Reported Content By", count: 30 },
    { label: "Blocked By", count: 24 },
  ];

  const communities = [
    {
      name: "Global Entrepreneur Network",
      members: "1k Members",
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=64&q=80",
    },
    {
      name: "Global Entrepreneur Network",
      members: "738 Members",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=64&q=80",
    },
    {
      name: "BizBuilders Network",
      members: "2k Members",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=64&q=80",
    },
    {
      name: "The Business Brigade",
      members: "4k Members",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=64&q=80",
    },
  ];

  const events = [
    {
      title: "Business Awards 2024",
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=400&q=400",
    },
    {
      title: "Tech Transformation Expo",
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=64&q=80",
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
          title="Nylah Whitehead"
          backButton={true}
          actionButton={false}
        />

        <main className="grow">
          {" "}
          <div className="min-h-screen bg-[#f6f4fa] pr-5 flex gap-6">
            {/* Sidebar */}
            <div className="w-full h-fit max-w-80 bg-white rounded-2xl  p-6  text-gray-800">
              <div className="border-b border-[#D4D4D4] ">
                <h2
                  onClick={() => setActiveSection("personal")}
                  className={`${
                    activeSection === "personal"
                      ? "text-violet-800 font-bold"
                      : "text-gray-800"
                  } text-base cursor-pointer flex items-center justify-between pb-4 transition-all duration-200`}
                >
                  Personal Details
                  <span
                    className={`${
                      activeSection === "personal"
                        ? "text-violet-800"
                        : "text-gray-600"
                    }`}
                  >
                    <ArrowRight2
                      color={
                        activeSection === "personal" ? "#885cc1" : "#6A6A6A"
                      }
                      className="h-4.5 w-4.5 "
                    />
                  </span>
                </h2>
              </div>

              <div>
                <h3
                  className={`text-base  flex items-center justify-between py-4 border-b border-[#D4D4D4]`}
                >
                  Company Details
                </h3>

                <div className="">
                  {companies.map((company, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSection("company")}
                      className={`flex items-center justify-between cursor-pointer transition-all duration-200 py-4  border-b border-[#E1E1E1] last:border-[#D4D4D4] ${
                        activeSection === "company"
                          ? "text-violet-800 font-bold"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm ">
                        <img
                          src={company.image}
                          alt={company.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium">{company.name}</span>
                      </div>
                      <span>
                        <ArrowRight2
                          color={
                            activeSection === "company" ? "#885cc1" : "#6A6A6A"
                          }
                          className="h-4.5 w-4.5"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                {reportStats.map((item, idx) => {
                  const section =
                    item.label === "Reported User By"
                      ? "reportedUsers"
                      : item.label === "Reported Content By"
                      ? "reportedContent"
                      : "blockedUsers";
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveSection(section)}
                      className={`flex items-center text-base justify-between cursor-pointer py-4 transition-all duration-200 ${
                        idx !== reportStats.length - 1
                          ? "border-b border-[#D4D4D4]"
                          : "pb-0"
                      } ${
                        activeSection === section
                          ? "text-violet-800 font-bold"
                          : ""
                      }`}
                    >
                      <span>{`${item.label} (${item.count})`}</span>
                      <span>
                        <ArrowRight2
                          color={
                            activeSection === section ? "#885cc1" : "#6A6A6A"
                          }
                          className="h-4.5 w-4.5"
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Main Content */}
            {/* Personal Details Section */}
            {activeSection === "personal" && (
              <main className="flex-1 space-y-6 pb-5">
                {/* Card: User Info + Details */}
                <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
                  <div className="relative bg-[linear-gradient(108.61deg,_rgba(10,14,26,0.91)_-102.86%,_#885CC1_100%)] text-white py-11 md:w-1/3 flex flex-col items-center justify-center">
                    <img
                      src={avatar}
                      alt="User"
                      className="w-28 h-28 rounded-full border-2 border-white mb-5 object-cover"
                    />
                    <h2 className="text-lg font-bold mb-3">Nylah Whitehead</h2>
                    <p className="text-sm font-semibold mb-3.5">
                      356 Connections
                    </p>

                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-violet-800  px-4 py-1.5 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>

                    <button className=" bg-transparent border border-white text-white  font-semibold px-9 py-2 rounded-lg hover:bg-white/35 transition-all cursor-pointer">
                      Suspend User
                    </button>
                  </div>

                  {/* Details Grid */}
                  <div className=" bg-white rounded-2xl p-11 py-16  flex flex-col sm:flex-row">
                    {/* Left side */}
                    <div className="flex flex-col justify-between flex-1  pr-0 ">
                      <div>
                        <p className="text-[#626262] text-sm font-medium">
                          Email ID
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1">
                          nylahwhitehead@gmail.com
                        </p>
                      </div>
                      <div className="mb-6">
                        <p className="text-[#626262] text-sm font-medium">
                          Phone Number
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1">
                          +91 9946494599
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-[#E1E1E1] mx-11"></div>

                    {/* Right side */}
                    <div className="flex flex-col justify-between  pt-12 sm:pt-0 ">
                      <div>
                        <p className="text-[#626262] text-sm font-medium">
                          Location
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1">
                          Melbourne, Australia
                        </p>
                      </div>
                      <div className="mb-6">
                        <p className="text-[#626262] text-sm font-medium">
                          LinkedIn Profile
                        </p>
                        <a
                          href="https://www.linkedin.com/in/nylah"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#141414] text-base font-semibold mt-1 underline"
                        >
                          https://www.linkedin.com/in/nylah
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-sm font-medium mb-2">About</h3>
                  <p className="text-[#141414] text-base">
                    Hi, I'm Nylah Whitehead. I am deeply committed to fostering
                    innovation, driving sustainable growth, and nurturing a
                    culture of continuous improvement and excellence. With a
                    strategic mindset, I focus on delivering exceptional value
                    and empowering teams to excel in dynamic environments. My
                    leadership philosophy revolves around inspiring others to
                    achieve their best, fostering collaboration, and building
                    resilient, high-performing teams.
                  </p>
                </div>

                {/* Interests */}
                <div className="bg-white rounded-2xl  p-6">
                  <h3 className="text-sm font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Startups",
                      "E-commerce",
                      "Technology",
                      "Networking",
                      "Investments",
                      "Leadership",
                      "Productivity",
                      "Market Research",
                      "Optimisation",
                      "Collaboration",
                      "Disruption",
                      "Efficiency",
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="text-white bg-violet-800 text-sm px-2.5 py-[5px] rounded-full font-semibold"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Communities + Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 h-fit">
                    <h2 className="text-sm font-medium mb-3.5">
                      Communities Joined ({communities.length})
                    </h2>

                    <div className="space-y-4">
                      {communities.map((community, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-4">
                            <img
                              src={community.image}
                              alt={community.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-black font-semibold">
                                {community.name}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {community.members}
                              </p>
                            </div>
                          </div>

                          {index !== communities.length - 1 && (
                            <hr className="mt-4 border-t border-gray-200" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6  h-fit">
                    <h2 className="text-gray-600 text-sm font-medium mb-4">
                      Events RSVP ({events.length})
                    </h2>

                    <div className="space-y-4">
                      {events.map((event, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-4">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-11 h-[52px] rounded-xl object-cover"
                            />
                            <div>
                              <p className="text-black font-semibold">
                                {event.title}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {event.status}
                              </p>
                            </div>
                          </div>
                          {index !== events.length - 1 && (
                            <hr className="mt-4 border-t border-gray-200" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            )}
            {/* Company Details Section */}
            {activeSection === "company" && (
              <main className="flex-1 space-y-6 pb-5">
                {/* Card: User Info + Details */}
                <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
                  <div className="relative bg-[linear-gradient(108.61deg,_rgba(10,14,26,0.91)_-102.86%,_#885CC1_100%)] text-white py-11 md:w-1/3 min-h-[300px] flex flex-col items-center justify-center">
                    <img
                      src={avatar}
                      alt="User"
                      className="w-28 h-28 rounded-full border-2 border-white mb-5 object-cover"
                    />
                    <h2 className="text-lg font-bold mb-3">
                      Nebula Network Services
                    </h2>
                  </div>

                  {/* Details Grid */}
                  <div className=" bg-white rounded-2xl p-11 py-16  flex flex-col sm:flex-row">
                    {/* Left side */}
                    <div className="flex flex-col justify-between flex-1  pr-0 ">
                      <div>
                        <p className="text-[#626262] text-sm font-medium">
                          Job Title
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1">
                          Chief Executive Officer
                        </p>
                      </div>
                      <div className="mb-6">
                        <p className="text-[#626262] text-sm font-medium">
                          Website
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1 underline">
                          www.nebulanetworks.com
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px bg-[#E1E1E1] mx-11"></div>

                    {/* Right side */}
                    <div className="flex flex-col justify-between  pt-12 sm:pt-0 ">
                      <div>
                        <p className="text-[#626262] text-sm font-medium">
                          Industry
                        </p>
                        <p className="text-[#141414] text-base font-semibold mt-1">
                          IT & Consulting
                        </p>
                      </div>
                      <div className="mb-6">
                        <p className="text-[#626262] text-sm font-medium">
                          Location
                        </p>
                        <a
                          href="https://www.linkedin.com/in/nylah"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#141414] text-base font-semibold mt-1 "
                        >
                          9 Golden Wattle Avenue, Melbourne, Australia
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-sm font-medium mb-2">About</h3>
                  <p className="text-[#141414] text-base">
                    At Vertex IT Systems, we don’t just offer IT solutions; we
                    empower businesses with technology that drives growth,
                    efficiency, and innovation. From custom software development
                    to cloud solutions, we deliver tailored strategies that
                    address your unique needs, ensuring technology becomes a
                    strategic asset for your organization. Our comprehensive
                    services also include advanced cybersecurity measures to
                    safeguard your operations and data analytics to unlock
                    valuable insights for informed decision-making.
                  </p>
                </div>

                {/* Interests */}
                <div className="bg-white rounded-2xl  p-6">
                  <h3 className="text-sm font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Startups",
                      "E-commerce",
                      "Technology",
                      "Networking",
                      "Investments",
                      "Leadership",
                      "Productivity",
                      "Market Research",
                      "Optimisation",
                      "Collaboration",
                      "Disruption",
                      "Efficiency",
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="text-white bg-violet-800 text-sm px-2.5 py-[5px] rounded-full font-semibold"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </main>
            )}
            {/* Reported Users Section */}
            {activeSection === "reportedUsers" && (
              <main className="flex-1 space-y-6 pb-5">
                <ReportedUsersTable />
              </main>
            )}
            {/* Reported Content Section */}
            {activeSection === "reportedContent" && (
              <main className="flex-1 space-y-6 pb-5">
                <ReportedContentTable />
              </main>
            )}
            {/* Blocked Users Section */}
            {activeSection === "blockedUsers" && (
              <main className="flex-1 space-y-6 pb-5">
                <BlockedUsersTable />
              </main>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetails;
