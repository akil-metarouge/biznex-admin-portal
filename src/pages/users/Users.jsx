import { useRef, useState, useEffect } from "react";
import ModalBasic from "../../components/ModalBasic";
import { Add, AddCircle, Edit2, Trash } from "iconsax-reactjs";
import UploadFileIcon from "../../assets/icons/upload-file.svg";
import DocumentIcon from "../../assets/icons/document.svg";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import InvitedUsersTable from "../../partials/users/InvitedUsersTable";
import SuspendedUsersTable from "../../partials/users/SuspendedUsersTable";
import ActiveUsersTable from "../../partials/users/ActiveUsersTable";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [userAddOption, setUserAddOption] = useState("manual"); // 'manual' or 'csv'
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("active");

  const tabs = [
    { id: "active", label: "Active Users", count: 2534 },
    { id: "invited", label: "Invited Users", count: 673 },
    { id: "suspended", label: "Suspended Users", count: 50 },
  ];

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
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(csvFile);
    }
  }, [csvFile]);

  const handleFileRead = (e) => {
    const content = e.target.result;
    const rows = content.split("\n").map((row) => row.split(","));

    // Check for required headers
    const requiredHeaders = ["First Name", "Last Name", "Email"];
    const headers = rows[0].map((header) => header.trim());

    // Find indexes of important headers
    const headerIndexes = requiredHeaders.reduce((acc, header) => {
      const index = headers.findIndex(
        (h) => h.toLowerCase() === header.toLowerCase()
      );
      if (index !== -1) {
        acc[header] = index;
      }
      return acc;
    }, {});

    // Check if all required headers are present
    if (Object.keys(headerIndexes).length !== requiredHeaders.length) {
      alert("Wrong CSV file format, please take a look at the sample CSV file");
      return;
    }

    // Validate row lengths and collect valid rows
    const validRows = rows.slice(1).filter((row) => {
      return row[headerIndexes["Email"]];
    });

    if (validRows.length === 0) {
      alert(
        "Wrong CSV file format, please take a look at the sample CSV file",
        "error"
      );
      return;
    }

    // Limit to the specified number of rows and map data to the desired format
    const formattedData = validRows.slice(0, 500).map((row) => ({
      first_name: row[headerIndexes["First Name"]]?.trim(),
      last_name: row[headerIndexes["Last Name"]]?.trim(),
      email: row[headerIndexes["Email"]].trim(),
    }));

    setUsers(formattedData);
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCsvFile(null);
    setUsers([]);
    fileInputRef.current.value = null;
  };

  // ***************** Invite ******************
  const handleInvite = () => {
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
          // setError("");
          setInviteUserModalOpen(false);
          setUsers([]); // Clear the users list
        } else {
          console.error("Invitation failed:", data);
          // setError(data?.error);
        }
      })
      .catch((error) => {
        console.log("error from catch block: ", error);
        // setError("An error occurred");
      });
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-5 lg:pl-0">
        {/*  Site header */}
        <Header
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
          <div className="pr-5 w-full mx-auto mb-5">
            <div className="bg-white p-4 rounded-2xl mb-4">
              <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg transition font-bold cursor-pointer ${
                        isActive
                          ? "bg-[#E7DEF3] text-violet-800"
                          : "text-[#1F1F1F] hover:bg-[#E7DEF3] hover:text-violet-800"
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pr-5  w-full max-w-[96rem] mx-auto mb-5">
            <div>
              {activeTab === "active" && <ActiveUsersTable data={[]} />}
              {activeTab === "invited" && <InvitedUsersTable />}
              {activeTab === "suspended" && <SuspendedUsersTable data={[]} />}
            </div>
          </div>
        </main>

        {/* =================================== Invite User Moda =================================== */}
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
                      onChange={() => {
                        setUserAddOption("manual");
                        setCsvFile(null);
                        setUsers([]);
                      }}
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
                      onChange={() => {
                        setUserAddOption("csv");
                        setCsvFile(null);
                        setUsers([]);
                      }}
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
                      accept=".csv"
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

                  {csvFile && (
                    <div className="mt-5 flex items-center justify-between bg-violet-800/5 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-violet-800/15 rounded-full h-11 w-11 flex items-center justify-center">
                          <img src={DocumentIcon} className="h-6 w-6" alt="" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {csvFile?.name}
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
                  className="w-full  py-3.5 text-[16px] font-semibold btn bg-violet-800 text-white hover:bg-violet-800/90 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer rounded-lg disabled:bg-[#A6A6A6]"
                  disabled={users.length === 0}
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
