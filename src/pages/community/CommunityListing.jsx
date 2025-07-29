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
  const [communityOption, setCommunityOption] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accessibility: "public",
    coverImage: null,
    profileImage: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState({
    cover: null,
    profile: null,
  });

  const openCreatePostModal = (e) => {
    e.stopPropagation();
    setCreatePostModal(true);
    // Reset form when opening modal
    setFormData({
      name: "",
      description: "",
      accessibility: "public",
      coverImage: null,
      profileImage: null,
    });
    setFormErrors({});
    setImagePreview({ cover: null, profile: null });
    setCommunityOption("public");
  };

  const closeModal = () => {
    setCreatePostModal(false);
    setFormData({
      name: "",
      description: "",
      accessibility: "public",
      coverImage: null,
      profileImage: null,
    });
    setFormErrors({});
    setImagePreview({ cover: null, profile: null });
    setCommunityOption("public");
  };

  // Handle image upload
  const handleImageUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({
          ...prev,
          [type]: "Please select a valid image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          [type]: "Image size should be less than 5MB",
        }));
        return;
      }

      // Clear any previous errors for this field
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });

      // Update form data
      setFormData((prev) => ({
        ...prev,
        [type === "cover" ? "coverImage" : "profileImage"]: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview((prev) => ({
          ...prev,
          [type]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle accessibility change
  const handleAccessibilityChange = (value) => {
    setCommunityOption(value);
    setFormData((prev) => ({
      ...prev,
      accessibility: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Community name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      submitData.append("description", formData.description.trim());
      submitData.append("accessibility", formData.accessibility);

      if (formData.coverImage) {
        submitData.append("coverImage", formData.coverImage);
      }

      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage);
      }

      // TODO: Replace with your actual API endpoint
      // const response = await fetch('/api/communities', {
      //   method: 'POST',
      //   body: submitData,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to create community');
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Community created:", {
        name: formData.name,
        description: formData.description,
        accessibility: formData.accessibility,
        coverImage: formData.coverImage?.name,
        profileImage: formData.profileImage?.name,
      });

      // Success - close modal and reset form
      closeModal();
    } catch (error) {
      console.error("Error creating community:", error);
      setFormErrors({
        submit: "Failed to create community. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
          setModalOpen={setCreatePostModal}
          modalWidth={"min-w-[618px]"}
        >
          <div className="fixed inset-0  flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-8 w-full max-w-[618px] max-h-[90vh] overflow-y-auto">
              <h2 className="text-center text-2xl font-bold mb-6 text-[#1F1F1F]">
                Create Community
              </h2>

              {/* Error Message */}
              {formErrors.submit && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {formErrors.submit}
                </div>
              )}

              {/* Cover Image Upload */}
              <div className="relative bg-[#F5F5F5] rounded-xl h-[200px] mb-6 flex items-center justify-center overflow-hidden">
                {imagePreview.cover ? (
                  <img
                    src={imagePreview.cover}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center relative">
                      <img
                        src={ImagePlaceholder}
                        alt=""
                        className="w-[60px] opacity-70"
                      />
                      <div className="absolute -bottom-1 -right-2 w-5 h-5 bg-violet-800 rounded-full text-white text-xs flex items-center justify-center">
                        <Add size="16" color="#FFFFFF" />
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      Upload Cover Image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("cover", e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {formErrors.cover && (
                <p className="text-red-500 text-sm -mt-4 mb-4">
                  {formErrors.cover}
                </p>
              )}

              {/* Profile Image Circle */}
              <div className="relative w-[130px] h-[130px] -mt-[90px] mb-6 ml-4">
                <div className="absolute w-full h-full rounded-full bg-[#EEEEEE] flex items-center justify-center ">
                  {imagePreview.profile ? (
                    <img
                      src={imagePreview.profile}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img src={ImagePlaceholder} alt="" className="w-12 h-12" />
                  )}
                  <div className="absolute bottom-1 right-1 w-7 h-7 bg-violet-800 rounded-full text-white text-xs flex items-center justify-center cursor-pointer z-10">
                    <Add size="22" color="#FFFFFF" />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("profile", e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
              </div>
              {formErrors.profile && (
                <p className="text-red-500 text-sm -mt-4 mb-4">
                  {formErrors.profile}
                </p>
              )}

              {/* Community Name Input */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Community Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-800 ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={50}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Public / Private Radio */}
              <div className="flex items-center gap-8 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accessibility"
                    value="public"
                    checked={communityOption === "public"}
                    onChange={() => handleAccessibilityChange("public")}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                    <div className="w-4 h-4 rounded-full border-[3px] peer-checked:border-[3px] border-white peer-checked:bg-violet-800" />
                  </div>
                  <span className="text-[16px] font-semibold">Public</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accessibility"
                    value="private"
                    className="peer hidden"
                    checked={communityOption === "private"}
                    onChange={() => handleAccessibilityChange("private")}
                  />
                  <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                    <div className="w-4 h-4 rounded-full border-[3px] peer-checked:border-[3px] border-white peer-checked:bg-violet-800" />
                  </div>
                  <span className="text-[16px] font-semibold">Private</span>
                </label>
              </div>

              {/* About Community */}
              <div className="mb-6">
                <textarea
                  placeholder="About Community"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={`w-full border rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-violet-800 ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  maxLength={500}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.description}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="bg-violet-800/20 text-violet-800 px-6 py-2 rounded-lg hover:bg-purple-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-violet-800 text-white px-6 py-2 rounded-lg hover:bg-violet-800/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
      </div>
    </div>
  );
}

export default CommunityListing;
