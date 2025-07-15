import { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { More } from "iconsax-reactjs";
import PeopleIcon from "../../assets/icons/people.svg";
import LikeIcon from "../../assets/icons/like.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ModalBlank from "../../components/ModalBlank";

const ReportCard = ({ name, date, reason, avatar }) => (
  <div className="flex items-center justify-between py-4 border-b last:border-none">
    <div className="flex items-center gap-3 w-1/2">
      <img
        src={avatar}
        alt={name}
        className="w-[42px] h-[42px]  rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-base text-black">{name}</div>
        <div className="text-xs text-[#686868] font-medium">On {date}</div>
      </div>
    </div>
    <div className="text-base text-black font-medium w-1/2">{reason}</div>
  </div>
);

const Comment = ({ name, title, comment, avatar }) => (
  <div className="bg-[#F7F6FC] p-4 rounded-xl mt-4">
    <div className="flex justify-between items-start">
      <div className="flex gap-3 items-start">
        <img
          src={avatar}
          alt={name}
          className="w-[42px] h-[42px] rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm text-[#272838]">{name}</div>
          <div className="text-xs text-[#707070] mb-2">{title}</div>
          <p className="text-sm text-[#272838]">{comment}</p>
          <hr className="my-3 border-[#EAEAEA]" />
          <div className="flex gap-3 text-xs text-[#363636] ">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={LikeIcon} className="h-5 w-5" alt="" />
              <span>10 Likes</span>
            </div>
            <div className="w-px h-5 bg-[#EAEAEA] self-center" />
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={CommentIcon} className="h-5 w-5" alt="" />
              <span>Reply</span>{" "}
              <div className="h-1 w-1 rounded-full bg-[#B9B8B8]"></div>{" "}
              <span>2 Replies</span>
            </div>
          </div>
        </div>
      </div>
      <More
        className="text-gray-400 cursor-pointer rotate-90"
        size={24}
        variant="Outline"
      />
    </div>
  </div>
);

function UserReportedPostDetails() {
  const [removePostModal, setRemovePostModal] = useState(false);
  const [removePostAndSuspendUserModal, setRemovePostAndSuspendUserModal] =
    useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openRemovePostModal = (e) => {
    e.stopPropagation();
    setRemovePostModal(true);
  };
  const openRemovePostAndSuspendUserModal = (e) => {
    e.stopPropagation();
    setRemovePostAndSuspendUserModal(true);
  };

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
          title="Report Post"
          backButton={true}
          actionButton={false}
          removeButtons={true}
          removePostAction={openRemovePostModal}
          removePostAndSuspendUserAction={openRemovePostAndSuspendUserModal}
        />

        <main className="grow">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pr-5 pb-5 bg-[#F5F6FA] min-h-screen">
            {/* Post Section */}
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
                <div className="ml-16">
                  <Comment
                    name="Liam Anderson"
                    title="CEO at Vertex IT Systems"
                    comment="Absolutely! Staying current with the latest trends in app development is essential for creating innovative and competitive applications."
                    avatar="https://randomuser.me/api/portraits/men/76.jpg"
                  />
                </div>

                <button className="text-violet-800 mt-5 cursor-pointer font-semibold  transition text-sm">
                  Show More Comments
                </button>
              </div>
            </div>

            {/* Reported By Section */}
            <div className="md:col-span-2  p-6 bg-white rounded-2xl h-fit">
              <h3 className="text-lg font-semibold text-gray-800">
                Reported By
              </h3>
              <div className="flex items-center justify-between text-[#545454] py-4 border-b last:border-none">
                <div className="flex items-center gap-3 w-1/2">Name</div>
                <div className="text-base  font-medium w-1/2">Reason</div>
              </div>
              <ReportCard
                name="Angel Best"
                date="02 Dec 2024"
                reason="Pretending to be Someone"
                avatar="https://randomuser.me/api/portraits/women/77.jpg"
              />
              <ReportCard
                name="Nola Decker"
                date="26 Nov 2024"
                reason="Posting Inappropriate Things"
                avatar="https://randomuser.me/api/portraits/women/78.jpg"
              />
              <ReportCard
                name="Adolyn Ferguson"
                date="20 Nov 2024"
                reason="Harassment or Bullying"
                avatar="https://randomuser.me/api/portraits/women/79.jpg"
              />
              <ReportCard
                name="Mayson Gonzalez"
                date="18 Nov 2024"
                reason="Violation of Community Guidelines"
                avatar="https://randomuser.me/api/portraits/women/80.jpg"
              />
              <ReportCard
                name="Edward Edwards"
                date="10 Nov 2024"
                reason="Something Else"
                avatar="https://randomuser.me/api/portraits/men/80.jpg"
              />
              <ReportCard
                name="Efrain Soto"
                date="10 Nov 2024"
                reason="Something Else"
                avatar="https://randomuser.me/api/portraits/men/81.jpg"
              />
            </div>
          </div>
        </main>
        <div className="m-1.5">
          {/* Start */}
          {/* Remove Post Modal */}
          <ModalBlank
            id="remove-post-modal"
            modalOpen={removePostModal}
            setModalOpen={setRemovePostModal}
          >
            <div className="text-center flex flex-col items-center gap-2.5">
              <h3 className="text-[20px] font-bold text-[#0A0A0A]">
                Remove Post Only
              </h3>
              <p className="max-w-[240px] text-base font-medium text-[#0A0A0A]">
                Are you sure you want to remove this post?
              </p>
              <div className="w-full flex justify-between gap-3">
                <button
                  onClick={() => setRemovePostModal(false)}
                  className="w-1/2 p-6 py-3.5 text-base font-semibold btn border border-violet-800 text-violet-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
                <button className="w-1/2 py-3.5 text-base font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                  Remove
                </button>
              </div>
            </div>
          </ModalBlank>
          {/* Remove Post and Suspend User Modal */}
          <ModalBlank
            id="remove-post-and-suspend-user-modal"
            modalOpen={removePostAndSuspendUserModal}
            setModalOpen={setRemovePostAndSuspendUserModal}
            modalWidth="min-w-[489px]"
          >
            <div className="text-center flex flex-col items-center gap-2.5">
              <h3 className="text-[20px] font-bold text-[#0A0A0A]">
                Remove Post
              </h3>
              <p className="max-w-[287px] text-base font-medium text-[#0A0A0A]">
                Are you sure you want to remove this post and suspend user?
              </p>
              <div className="w-full flex justify-between gap-3">
                <button
                  onClick={() => setRemovePostAndSuspendUserModal(false)}
                  className="w-1/2 p-6 py-3.5 text-base font-semibold btn border border-violet-800 text-violet-800  dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
                <button className="w-1/2 py-3.5 text-base font-semibold btn bg-orange-800 text-white hover:bg-orange-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg">
                  Remove & Suspend User
                </button>
              </div>
            </div>
          </ModalBlank>
        </div>
      </div>
    </div>
  );
}

export default UserReportedPostDetails;
