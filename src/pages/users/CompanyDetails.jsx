import avatar from "../../images/avatar-04.jpg";
const companyInfo = {
  name: "Nylah Whitehead",
  jobTitle: "Chief Executive Officer",
  industry: "IT & Consulting",
  website: "www.nebulanetworks.com",
  location: "9 Golden Wattle Avenue, Melbourne, Australia",
  about: `At Vertex IT Systems, we don’t just offer IT solutions; we empower
          businesses with technology that drives growth, efficiency, and
          innovation. From custom software development to cloud solutions, we
          deliver tailored strategies that address your unique needs, ensuring
          technology becomes a strategic asset for your organization. Our
          comprehensive services also include advanced cybersecurity measures to
          safeguard your operations and data analytics to unlock valuable
          insights for informed decision-making.`,
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
};
const CompanyDetails = () => {
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
            {companyInfo.name}
          </h2>
        </div>

        {/* Details Grid */}
        <div className="w-full bg-white rounded-2xl px-11 py-16 flex flex-col xl:flex-row">
          <div className="flex flex-col xl:gap-16 pr-0">
            <div>
              <p className="text-[#626262] text-sm font-medium">Job Title</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {companyInfo.jobTitle}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-[#626262] text-sm font-medium">Website</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {companyInfo.website}
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px bg-[#E1E1E1] mx-11"></div>

          <div className="flex flex-col xl:gap-16 pt-12 sm:pt-0">
            <div>
              <p className="text-[#626262] text-sm font-medium">Industry</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {companyInfo.industry}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-[#626262] text-sm font-medium">Location</p>
              <p className="text-[#141414] text-base font-semibold mt-1">
                {companyInfo.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-sm font-medium mb-2">About</h3>
        <p className="text-[#141414] text-base">{companyInfo.about}</p>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl  p-6">
        <h3 className="text-sm font-medium mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {companyInfo.Interests.map((interest) => (
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
  );
};

export default CompanyDetails;
