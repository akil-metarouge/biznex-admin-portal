import { Calendar2, Category, Global, User } from "iconsax-react";
import { avatar, clockIcon, locationIcon } from "../../assets";
import DropdownSortSelected from "../../components/DropdownSortSelected";
import { Trash2 } from "lucide-react";
import SearchForm from "../../partials/actions/SearchForm";

const EventDetailsPage = () => {
  const attendees = Array(10).fill({
    name: "Thomas John Brown",
    avatar,
  });

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left section */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden p-4 md:p-6">
          <img
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6"
            alt="Event"
            className="w-full aspect-[1070/580] object-cover rounded-xl"
          />
          <div className="pt-6 space-y-4">
            <h1 className="text-xl font-semibold text-[#1B1B1F]">
              Beyond Boundaries 2024
            </h1>
            <div className="flex items-baseline gap-4 text-sm text-[#5F5D6B]">
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#5F5D6B]">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <img src={locationIcon} alt="location-Icon" />
                  International Convention Centre (ICC) Sydney, Australia
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <img src={clockIcon} alt="clock-Icon" />
                  9:00 PM - 12:30 AM IST
                </span>
              </div>
              <button className="ml-auto">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="2" />
                  <circle cx="10" cy="16" r="2" />
                  <circle cx="22" cy="16" r="2" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-4">
              <div className="space-y-1.5 border-r border-gray-200 pr-4">
                <Calendar2 size="20" color="#885cc1" />
                <p className="text-xs text-[#6B6B6B]">Date</p>
                <p className="text-sm font-semibold text-black">
                  12 Aug 2024 - 13 Aug 2024
                </p>
              </div>
              <div className="space-y-1.5 border-r border-gray-200 pr-4">
                <User size="20" color="#885cc1" />
                <p className="text-xs text-[#6B6B6B]">Attendees</p>
                <p className="text-sm font-medium text-black">78/120</p>
              </div>
              <div className="space-y-1.5 border-r border-gray-200 pr-4">
                <Category size="20" color="#885cc1" />
                <p className="text-xs text-[#6B6B6B]">Community</p>
                <p className="text-sm font-medium text-black">
                  Crucible of Creativity
                </p>
              </div>
              <div className="space-y-1.5">
                <Global size="20" color="#885cc1" />
                <p className="text-xs text-[#6B6B6B]">Status</p>
                <p className="text-sm font-medium text-black">Upcoming</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-sm font-normal text-[##626262] mb-2">
                About
              </h2>
              <p className="text-md text-[#5F5D6B] leading-relaxed">
                The Beyond Boundaries 2024 in Sydney is a prestigious event that
                celebrates excellence, innovation, and leadership in the
                business community. This annual event brings together top
                entrepreneurs, business leaders, and industry professionals from
                across Australia to honor outstanding achievements in various
                sectors.
                <br />
                <br />
                Held at the iconic International Convention Centre (ICC) Sydney,
                the awards ceremony recognizes companies and individuals who
                have demonstrated exceptional success, creativity, and
                resilience in the face of evolving market challenges. Categories
                span across industries, including technology, finance, retail,
                healthcare, and more, ensuring a diverse representation of
                Australia’s thriving business. This prestigious event brings
                together visionaries and trailblazers from across Australia,
                celebrating remarkable achievements that push the boundaries of
                innovation and redefine industry standards. From groundbreaking
                startups to established market leaders, the awards highlight
                those who have made an extraordinary impact on their sectors and
                inspired progress within their communities.
              </p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#1B1B1F]">
              Attendees (78)
            </h2>
          </div>

          <div className="mb-4">
            <SearchForm placeholder={"Search Attendee"} fullWidth={true} />
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {attendees.map((attendee, index) => (
              <div
                key={index}
                className={`flex justify-between items-center ${
                  index === attendees.length - 1 && "mb-16"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={attendee.avatar}
                    alt={attendee.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-medium text-[#1B1B1F]">
                    {attendee.name}
                  </span>
                </div>
                <DropdownSortSelected
                  align="right"
                  label=""
                  selectedValue={"view-details"}
                  menuIcon={true}
                  items={[
                    {
                      label: "Remove User",
                      value: "remove-user",
                      icon: (
                        <Trash2
                          className="w-5 h-5 text-blue-600"
                          size="32"
                          color="#FF6D5D"
                        />
                      ),
                      textColor: "#FF6D5D",
                      onClick: () => console.log("user removed"),
                    },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
