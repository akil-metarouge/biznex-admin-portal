import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import bgImage from "../images/login-bg-image.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiURL = import.meta.env.VITE_BASE_URL;

    fetch(`${apiURL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data?.status === 1) {
          // Save to localStorage
          console.log("Login successful:", data);
          localStorage.setItem("token", data?.token);
          setError("");
          navigate("/");
        } else {
          console.error("Login failed:", data);
          setError(data?.error);
        }
      })
      .catch((error) => {
        setError("An error occurred while logging in.");
      });
  };

  return (
    <main className="bg-gray-100">
      {/* Content */}
      <div className="h-[100dvh] w-full flex">
        <div className="max-w-[1072px] max-h-[539px] mx-auto my-auto h-full w-full rounded-2xl grid grid-cols-1 md:grid-cols-2 relative">
          <div className="z-10 bg-gray-50 px-14 py-16 rounded-l-2xl">
            <div>
              <img src={logo} alt="" />
              <h2 className="text-3xl text-gray-950 font-bold mt-6">Login</h2>
              <p className="my-3 text-md text-gray-950">
                Login to continue with your account.
              </p>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    id="email"
                    className="form-input w-full bg-gray-50 border-2 border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-14"
                    type="email"
                    placeholder="Email ID"
                    autoComplete="on"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    className="form-input w-full bg-gray-50 border-2 border-gray-300 focus:border-violet-500 focus:ring-violet-500 h-14"
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-1">
                <div className="mb-6 flex justify-end">
                  <Link
                    className="text-sm text-purple-800 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  className="w-full h-16 bg-violet-800 text-gray-50 text-md font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
          <div className="z-10 bg-[#885CC1CC] px-4 py-8 rounded-r-2xl flex flex-col items-center justify-center text-center text-gray-50 px-24">
            <h2 className="text-3xl font-bold">
              Welcome to Biznex Admin Panel
            </h2>
            <p className="mt-3 text-md">
              Seamlessly manage and oversee all your business operations in one
              place.
            </p>
          </div>
          <img
            className="absolute top-0 w-full h-full object-cover object-center"
            src={bgImage}
            alt="bg-image"
          />
        </div>
      </div>
    </main>
  );
}

export default Login;
