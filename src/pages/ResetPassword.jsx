import { Eye, EyeSlash } from "iconsax-reactjs";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  return (
    <main className="bg-gray-100">
      {/* Content */}
      <div className="h-[100dvh] w-full flex">
        <div className="max-w-[544px] max-h-[414px] m-auto h-full w-full rounded-2xl grid relative">
          <div className="z-10 bg-gray-50 px-14 py-16 rounded-2xl">
            <div>
              <h2 className="text-3xl text-gray-950 font-bold mt-6">
                Reset Password
              </h2>
              <p className="my-4 text-md text-gray-950">
                Set your new password to login
              </p>
            </div>
            {/* Form */}
            <form>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    className="py-2.5 sm:py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer"
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  >
                    {newPasswordVisible ? (
                      <EyeSlash size="20" color="#404040" />
                    ) : (
                      <Eye size="20" color="#404040" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="py-2.5 sm:py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? (
                      <EyeSlash size="20" color="#404040" />
                    ) : (
                      <Eye size="20" color="#404040" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  className="btn w-full h-16 bg-violet-800 text-gray-50 text-md font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  //   to="/"
                >
                  Reset
                </Link>
              </div>
            </form>
            <div className="mt-10 text-sm text-center text-gray-400">
              <span>Back to </span>
              <Link className="text-purple-800 hover:underline" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
