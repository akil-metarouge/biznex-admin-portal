import avatar from "../../images/avatar-04.jpg";

const userInfo = {
  name: "Nylah Whitehead",
  email: "nylahwhitehead@gmail.com",
  phone: "+91 9946494599",
  location: "Melbourne, Australia",
  linkedin: "https://www.linkedin.com/in/nylah",
  connection: 356,
  about: `Hi, I'm Nylah Whitehead. I am deeply committed to fostering
          innovation, driving sustainable growth, and nurturing a culture of
          continuous improvement and excellence. With a strategic mindset, I
          focus on delivering exceptional value and empowering teams to excel in
          dynamic environments. My leadership philosophy revolves around
          inspiring others to achieve their best, fostering collaboration, and
          building resilient, high-performing teams.`,
  Interests: [
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
  ],
  events: [
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
  ],
  communities: [
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
  ],
};

const UserPersonalDetails = ({
  openSuspendUserModal,
  //   openActivateUserModal,
}) => {
  return (
    <main className="flex-1 space-y-6 pb-5">
      {/* Card: User Info + Details */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row lg:flex-col xl:flex-row">
        <div className="relative bg-[linear-gradient(108.61deg,_rgba(10,14,26,0.91)_-102.86%,_#885CC1_100%)] text-white py-11 px-16 md:w-1/3 lg:w-full xl:w-1/3  flex flex-col items-center justify-center">
          <img
            src={avatar}
            alt="User"
            className="w-28 h-28 rounded-full border-2 border-white mb-5 object-cover"
          />
          <h2 className="text-lg font-bold mb-3 text-center">
            {userInfo.name}
          </h2>
          <p className="text-sm font-semibold mb-3.5 text-center">
            {userInfo.connection} Connections
          </p>

          <div className="absolute top-4 right-4">
            <span className="bg-white text-violet-800  px-4 py-1.5 rounded-full text-sm font-semibold">
              Active
            </span>
          </div>

          <button
            onClick={openSuspendUserModal}
            className=" bg-transparent border border-white text-white  font-semibold px-9 py-2 rounded-lg hover:bg-white/35 transition-all cursor-pointer text-nowrap"
          >
            Suspend User
          </button>
          {/* <button
            onClick={openActivateUserModal}
            className=" bg-transparent border border-white text-white  font-semibold px-9 py-2 rounded-lg hover:bg-white/35 transition-all cursor-pointer"
          >
            Activate User
          </button> */}
        </div>

        {/* Details Grid */}
        <div className="w-full bg-white rounded-2xl px-11 py-16 flex flex-col xl:flex-row">
          <div className="flex flex-col justify-between pr-0">
            <div>
              <p className="text-[#626262] text-sm font-medium">Email ID</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {userInfo.email}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-[#626262] text-sm font-medium">Phone Number</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {userInfo.phone}
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px bg-[#E1E1E1] mx-11"></div>

          <div className="flex flex-col justify-between pt-12 sm:pt-0 ">
            <div>
              <p className="text-[#626262] text-sm font-medium">Location</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {userInfo.location}
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
                {userInfo.location}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-sm font-medium mb-2">About</h3>
        <p className="text-[#141414] text-base">{userInfo?.about}</p>
      </div>

      <div className="bg-white rounded-2xl  p-6">
        <h3 className="text-sm font-medium mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {userInfo?.Interests?.map((interest) => (
            <span
              key={interest}
              className="text-white bg-violet-800 text-sm px-2.5 py-[5px] rounded-full font-semibold"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 h-fit">
          <h2 className="text-sm font-medium mb-3.5">
            Communities Joined ({userInfo?.communities?.length})
          </h2>

          <div className="space-y-4">
            {userInfo?.communities?.map((community, index) => (
              <div key={index}>
                <div className="flex items-center gap-4">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-black font-semibold">{community.name}</p>
                    <p className="text-gray-500 text-sm">{community.members}</p>
                  </div>
                </div>

                {index !== userInfo?.communities?.length - 1 && (
                  <hr className="mt-4 border-t border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6  h-fit">
          <h2 className="text-gray-600 text-sm font-medium mb-4">
            Events RSVP ({userInfo?.events?.length})
          </h2>

          <div className="space-y-4">
            {userInfo?.events?.map((event, index) => (
              <div key={index}>
                <div className="flex items-center gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-11 h-[52px] rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-black font-semibold">{event.title}</p>
                    <p className="text-gray-500 text-sm">{event.status}</p>
                  </div>
                </div>
                {index !== userInfo?.events?.length - 1 && (
                  <hr className="mt-4 border-t border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPersonalDetails;
