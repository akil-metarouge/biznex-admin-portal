import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { ArrowRight2 } from "iconsax-reactjs";
import avatar from "../../images/avatar-04.jpg";
import ReportedUsersTable from "../../partials/users/ReportedUsersTable";
import ReportedContentTable from "../../partials/users/ReportedContentTable";
import BlockedUsersTable from "../../partials/users/BlockedUsersTable";
import ModalBlank from "../../components/ModalBlank";
import CompanyDetails from "./CompanyDetails";
import UserPersonalDetails from "./UserPersonalDetails";

const sidebarItems = [
  { id: 1, name: "Personal Details", section: "personal" },
  { id: 2, name: "Company Details", section: "company" },
  { id: 3, name: "Reported Users", section: "reportedUsers" },
  { id: 4, name: "Reported Content", section: "reportedContent" },
  { id: 5, name: "Blocked Users", section: "blockedUsers" },
];

const companies = [
  { name: "Nebula Network Services", image: avatar },
  { name: "Onyx Core", image: avatar },
  { name: "Zen Sphere", image: avatar },
];

function UserDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [suspendUserModal, setSuspendUserModal] = useState(false);
  const [activateUserModal, setActivateUserModal] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();

  const getActiveSectionId = () => {
    const path = location.pathname.split("/")[3]; // after /user-details/:id/
    const item = sidebarItems.find((s) => s.section === path);
    return item?.id || 1;
  };

  useEffect(() => {
    const sectionId = getActiveSectionId();
    setActiveSection(sectionId);
  }, [location]);

  const openSuspendUserModal = (e) => {
    e.stopPropagation();
    setSuspendUserModal(true);
  };
  const openActivateUserModal = (e) => {
    e.stopPropagation();
    setActivateUserModal(true);
  };

  return (
    <>
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            title="Nylah Whitehead" // user name
            backButton={true}
            actionButton={false}
          />

          <main className="grow">
            <div className="bg-[#f6f4fa] pr-5 flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full h-fit min-w-72 max-w-80 bg-white rounded-2xl p-6 text-gray-800">
                {sidebarItems.map((item, idx) => (
                  <div key={idx}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        // setActiveSection(item.id);
                        navigate(`/user-details/${userId}/${item.section}`);
                      }}
                      className={`flex items-center text-base justify-between cursor-pointer py-4 transition-all duration-200 ${
                        idx !== sidebarItems.length - 1
                          ? "border-b border-[#D4D4D4]"
                          : "pb-0"
                      } ${
                        activeSection === item.id
                          ? "text-violet-800 font-bold"
                          : ""
                      }`}
                    >
                      <span>{item.name}</span>
                      <ArrowRight2
                        color={
                          activeSection === item.id ? "#885cc1" : "#6A6A6A"
                        }
                        className="h-4.5 w-4.5"
                      />
                    </div>

                    {item.id === 2 && activeSection === 2 && (
                      <div className="pl-2">
                        {companies.map((company, id) => (
                          <div
                            key={id}
                            className="flex items-center justify-between cursor-pointer transition-all duration-200 py-4 border-b border-[#E1E1E1] last:border-[#D4D4D4]"
                          >
                            <div className="flex items-center gap-3 text-sm">
                              <img
                                src={company.image}
                                alt={company.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="font-medium">
                                {company.name}
                              </span>
                            </div>
                            <ArrowRight2
                              color="#6A6A6A"
                              className="h-4.5 w-4.5"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              {activeSection === 1 && (
                <UserPersonalDetails
                  openSuspendUserModal={openSuspendUserModal}
                />
              )}
              {activeSection === 2 && <CompanyDetails />}
              {activeSection === 3 && (
                <main className="flex-1 space-y-6 pb-5">
                  <ReportedUsersTable />
                </main>
              )}
              {activeSection === 4 && (
                <main className="flex-1 space-y-6 pb-5">
                  <ReportedContentTable />
                </main>
              )}
              {activeSection === 5 && (
                <main className="flex-1 space-y-6 pb-5">
                  <BlockedUsersTable />
                </main>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <div className="m-1.5">
        {/* Suspend User Modal */}
        <ModalBlank
          id="suspend-user-modal"
          modalOpen={suspendUserModal}
          setModalOpen={setSuspendUserModal}
        >
          <div className="text-center flex flex-col items-center gap-2.5">
            <h3 className="text-[20px] font-bold text-[#0A0A0A]">
              Suspend User
            </h3>
            <p className="max-w-[240px] text-base font-medium text-[#0A0A0A]">
              Are you sure you want to suspend this user?
            </p>
            <div className="w-full flex justify-between gap-3">
              <button
                onClick={() => setSuspendUserModal(false)}
                className="w-1/2 p-6 py-3.5 text-base font-semibold btn border border-violet-800 text-violet-800 cursor-pointer rounded-lg"
              >
                Cancel
              </button>
              <button className="w-1/2 py-3.5 text-base font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 cursor-pointer rounded-lg">
                Suspend
              </button>
            </div>
          </div>
        </ModalBlank>

        {/* Activate User Modal */}
        <ModalBlank
          id="activate-user-modal"
          modalOpen={activateUserModal}
          setModalOpen={setActivateUserModal}
        >
          <div className="text-center flex flex-col items-center gap-2.5">
            <h3 className="text-[20px] font-bold text-[#0A0A0A]">
              Activate User
            </h3>
            <p className="max-w-[240px] text-base font-medium text-[#0A0A0A]">
              Are you sure you want to activate this user?
            </p>
            <div className="w-full flex justify-between gap-3">
              <button
                onClick={() => setActivateUserModal(false)}
                className="w-1/2 p-6 py-3.5 text-base font-semibold btn border border-violet-800 text-violet-800 cursor-pointer rounded-lg"
              >
                Cancel
              </button>
              <button className="w-1/2 py-3.5 text-base font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 cursor-pointer rounded-lg">
                Activate
              </button>
            </div>
          </div>
        </ModalBlank>
      </div>
    </>
  );
}

export default UserDetails;
