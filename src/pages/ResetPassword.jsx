import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <main className="bg-gray-100">
      {/* Content */}
      <div className="h-[100dvh] w-full flex">
        <div className="max-w-[544px] max-h-[414px] m-auto h-full w-full rounded-2xl grid relative">
          <div className="z-10 bg-gray-50 px-14 py-16 rounded-2xl">
            <div>
              <h2 className="text-3xl text-gray-950 font-bold mt-6">Login</h2>
              <p className="my-3 text-md text-gray-950">
                Login to continue with your account.
              </p>
            </div>
            {/* Form */}
            <form>
              <div className="space-y-4">
                <div>
                  <input
                    id="email"
                    className="form-input w-full bg-gray-50 border-2 border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-14"
                    type="email"
                    placeholder="Email ID"
                  />
                </div>
                <div>
                  <input
                    id="password"
                    className="form-input w-full bg-gray-50 border-2 border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-14"
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="mt-1">
                <div className="mb-6 flex justify-end">
                  <Link
                    className="text-sm text-purple-800 hover:underline"
                    to="/reset-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Link
                  className="btn w-full h-16 bg-violet-800 text-gray-50 text-md font-semibold"
                  to="/"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
