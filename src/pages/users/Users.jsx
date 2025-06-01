import { useRef, useState, useEffect } from "react";
import Sidebar1 from "../../partials/Sidebar1";
import Header1 from "../../partials/Header1";
import ActiveUsersTable from "../../partials/users/ActiveusersTable";
import ModalBasic from "../../components/ModalBasic";
import { Add, AddCircle, Edit2, Trash } from "iconsax-reactjs";
import UploadFileIcon from "../../assets/icons/upload-file.svg";
import DocumentIcon from "../../assets/icons/document.svg";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [userAddOption, setUserAddOption] = useState("manual"); // 'manual' or 'csv'

  const [users, setUsers] = useState([]);

  console.log("error -> ", error);

  const openModal = (e) => {
    e.stopPropagation();
    setInviteUserModalOpen(true);
  };

  const handleAddUser = (e) => {
    if (!firstName || !lastName || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (editMode && editingIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };
      setUsers(updatedUsers);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      // Add new user
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };
      setUsers([...users, newUser]);
    }

    // Clear form
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleEditUser = (index) => {
    const user = users[index];
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setEditMode(true);
    setEditingIndex(index);
  };

  const handleDeleteUser = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  };

  // ******************** for csv part ********************
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileName(null);
    fileInputRef.current.value = null;
  };

  // ***************** Invite ******************
  const handleInvite = () => {
    if (userAddOption === "manual" && users.length === 0) {
      alert("Please add at least one user manually.");
      return;
    }
    const readyToSend = { users: users };

    const apiURL = import.meta.env.VITE_BASE_URL;

    fetch(`${apiURL}/api/admin/invite-multiple-users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(readyToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 1) {
          console.log("Invited successfully: ", data);
          setError("");
          setInviteUserModalOpen(false);
          setUsers([]); // Clear the users list
          fetchInvitedUsers(); // Refresh the invited users list
        } else {
          console.error("Invitation failed:", data);
          setError(data?.error);
        }
      })
      .catch((error) => {
        console.log("error from catch block: ", error);
        setError("An error occurred");
      });
  };

  const fetchInvitedUsers = async () => {
    setIsLoading(true);
    const apiURL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/admin/users/invited?limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("Fetched invited users:", data);
      if (data?.status === 1) {
        setInvitedUsers(data.data || []);
      } else {
        console.error("Failed to fetch invited users:", data);
        setError("Failed to fetch invited users");
      }
    } catch (error) {
      console.error("Error fetching invited users:", error);
      setError("An error occurred while fetching invited users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitedUsers();
  }, []);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar1 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-5 lg:pl-0">
        {/*  Site header */}
        <Header1
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title={"Users"}
          count={3257}
          actionButton={true}
          actionButtonText={"Invite User"}
          actionButtonOnClick={openModal}
          searchField={true}
          placeholder="Search Event"
        />

        <main className="grow">
          <div className="pr-5  w-full max-w-[96rem] mx-auto mb-5">
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <ActiveUsersTable
                data={invitedUsers}
                selectedItems={(selectedItem) => {
                  // console.log(selectedItem);
                }}
              />
            )}
          </div>
        </main>

        <div className="m-1.5">
          {/* Start */}
          <ModalBasic
            id="invite-user-modal"
            modalOpen={inviteUserModalOpen}
            setModalOpen={setInviteUserModalOpen}
            title="Invite User"
          >
            {/* Modal content */}
            <div className="py-9">
              {/* Modal Header Part  */}
              <div className="text-sm px-10">
                <h2 className="text-[20px] font-bold text-center text-black mb-4">
                  Invite User
                </h2>
                <div className="font-medium text-[16px] text-center text-black dark:text-gray-100 mb-6">
                  Add users by entering their details or uploading a CSV file
                </div>
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="manual"
                      checked={userAddOption === "manual"}
                      onChange={() => setUserAddOption("manual")}
                      className="peer hidden"
                    />
                    <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                      <div className="w-4 h-4 rounded-full  border-[3px] peer-checked:border-[3px] border-white  peer-checked:bg-violet-800" />
                    </div>
                    <span className="text-[16px] font-semibold">
                      Add Manually
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="csv"
                      className="peer hidden"
                      checked={userAddOption === "csv"}
                      onChange={() => setUserAddOption("csv")}
                    />
                    <div className="w-5 h-5 rounded-full border-[2px] border-violet-800 flex items-center justify-center peer-checked:bg-violet-800">
                      <div className="w-4 h-4 rounded-full  border-[3px] peer-checked:border-[3px] border-white  peer-checked:bg-violet-800" />
                    </div>
                    <span className="ext-[16px] font-semibold">CSV Upload</span>
                  </label>
                </div>
              </div>
              {/* ************************************ CSV Upload Part ************************************ */}
              {userAddOption === "csv" && (
                <div className="w-full px-10 mt-5">
                  <div
                    className="border border-dashed border-violet-800 rounded-lg py-14 text-center bg-violet-800/5 cursor-pointer hover:bg-violet-800/10 transition"
                    onClick={handleClickUpload}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".csv, .xls, .xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-2">
                      <img src={UploadFileIcon} alt="" />
                      <p className="text-sm font-semibold text-[#1F1F1F]">
                        Upload your file
                      </p>
                      <p className="text-sm font-semibold text-violet-800 underline">
                        Click here
                      </p>
                    </div>
                  </div>

                  {fileName && (
                    <div className="mt-5 flex items-center justify-between bg-violet-800/5 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-violet-800/15 rounded-full h-11 w-11 flex items-center justify-center">
                          <img src={DocumentIcon} className="h-6 w-6" alt="" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {fileName}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveFile}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <AddCircle
                          size="24"
                          color="#ABABAB"
                          variant="Bold"
                          style={{ transform: "rotate(45deg)" }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ************************************ Manuallay Add Users Part ************************************ */}
              {userAddOption === "manual" && (
                <div>
                  {/* Modal Form Part  */}
                  <div className="space-y-3 px-10">
                    <div>
                      <div className="flex justify-between items-center space-x-4">
                        <div className="relative w-[50%] mt-6">
                          <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="peer block w-full h-[50px] appearance-none border border-[#B5B5B5] bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-0 rounded-md text-black cursor-text"
                          />
                          <label
                            htmlFor="firstName"
                            className={`absolute left-4 top-3 z-10 origin-[0]  transform text-sm text-[#414141] duration-150  peer-focus:scale-75 peer-focus:-translate-y-6  peer-focus:bg-white peer-focus:px-1 -ml-0.5 cursor-text ${
                              firstName.length
                                ? "-translate-y-6 scale-75 bg-white px-1 "
                                : ""
                            }`}
                          >
                            First Name
                          </label>
                        </div>
                        <div className="relative w-[50%] mt-6">
                          <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="peer block w-full h-[50px] appearance-none border border-[#B5B5B5] bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-0 rounded-md text-black cursor-text"
                          />
                          <label
                            htmlFor="lastName"
                            className={`absolute left-4 top-3 z-10 origin-[0]  transform text-sm text-[#414141] duration-150  peer-focus:scale-75 peer-focus:-translate-y-6  peer-focus:bg-white peer-focus:px-1 -ml-0.5 cursor-text ${
                              lastName.length
                                ? "-translate-y-6 scale-75 bg-white px-1 "
                                : ""
                            }`}
                          >
                            Last Name
                          </label>
                        </div>
                      </div>
                      <div className="relative w-full mt-6">
                        <input
                          type="email"
                          id="emali"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="peer block w-full h-[50px] appearance-none border border-[#B5B5B5] bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-0 rounded-md text-black cursor-text"
                        />
                        <label
                          htmlFor="emali"
                          className={`absolute left-4 top-3 z-10 origin-[0]  transform text-sm text-[#414141] duration-150  peer-focus:scale-75 peer-focus:-translate-y-6  peer-focus:bg-white peer-focus:px-1 -ml-0.5 cursor-text ${
                            email.length
                              ? "-translate-y-6 scale-75 bg-white px-1 "
                              : ""
                          }`}
                        >
                          Email
                        </label>
                      </div>
                      <button
                        type="submit"
                        onClick={(e) => handleAddUser(e)}
                        className="h-10 mt-6 px-4 py-3.5 text-sm font-semibold btn border border-violet-800 bg-white hover:bg-violet-50/50 text-violet-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg transition duration-200 flex items-center shadow-none"
                      >
                        {!editMode && <Add size="24" color="#885CC1" />}

                        <span className="ml-1">
                          {editMode ? "Update" : "Add"}
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* Manuallay added users data */}
                  {users.length > 0 && (
                    <div className="pt-6">
                      <hr className="border-t border-[#D9D9D9] w-full mb-6" />
                      <div className="px-10">
                        <h3 className="text-lg font-bold text-black mb-4">
                          Users Count ({users.length})
                        </h3>
                        <ul className="space-y-3.5">
                          {users.map((user, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 bg-violet-800/10 rounded-lg"
                            >
                              <div>
                                <h6 className="text-base font-semibold text-[#252525] mb-1">
                                  {user.first_name} {user.last_name}
                                </h6>
                                <p className="text-sm font-semibold text-[#4E4E4E]">
                                  {" "}
                                  {user.email}
                                </p>
                              </div>
                              <div className="flex place-items-center space-x-4">
                                {/* Edit user button  */}
                                <button
                                  className=" bg-transparent dark:hover:border-gray-600 cursor-pointer"
                                  onClick={() => handleEditUser(index)}
                                >
                                  <Edit2
                                    size="24"
                                    color="#363636"
                                    style={{ fontWeight: 800 }}
                                  />
                                </button>
                                {/* Delete user button  */}
                                <button
                                  className=" bg-transparent dark:hover:border-gray-600 cursor-pointer"
                                  onClick={(e) => handleDeleteUser(e, index)}
                                >
                                  <Trash size="24" color="#FF6D5D" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="px-10 pt-6">
                <button
                  onClick={handleInvite}
                  className="w-full  py-3.5 text-[16px] font-semibold btn bg-violet-800 text-white hover:bg-violet-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg"
                >
                  Invite
                </button>
              </div>
            </div>
          </ModalBasic>
          {/* End */}
        </div>
      </div>
    </div>
  );
}

export default Users;
