import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PinInput } from "react-input-pin-code";

// custom styles for PinInput
import "../css/additional-styles/pin-input.css";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(true);
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(5);

  // useEffect(() => {
  //   let interval;
  //   if (emailSent && timer > 0) {
  //     interval = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);
  //   } else if (timer === 0) {
  //     setEmailSent(false);
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [emailSent, timer]);

  return (
    <main className="bg-gray-100">
      {/* Content */}
      <div className="h-[100dvh] w-full flex">
        <div className="max-w-[544px] max-h-[414px] m-auto h-full w-full rounded-2xl grid relative">
          <div className="z-10 bg-gray-50 px-14 py-16 rounded-2xl">
            {!emailSent ? (
              <div
                // appear in slow motion
                className="transition-opacity duration-500 ease-in-out opacity-100"
              >
                <div>
                  <h2 className="text-3xl text-gray-950 font-bold mt-6">
                    Forgot Password
                  </h2>
                  <p className="my-3 text-md text-gray-950">
                    No worries, we will send you the reset instructions.
                  </p>
                </div>
                {/* Email Form */}
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
                  </div>
                  <div className="mt-6">
                    <button
                      className="w-full h-16 bg-violet-800 text-gray-50 text-md font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setEmailSent(true);
                        setTimer(5);
                      }}
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
                <div className="mt-10 text-sm text-center text-gray-400">
                  <span>Back to </span>
                  <Link className="text-purple-800 hover:underline" to="/login">
                    Login
                  </Link>
                </div>
              </div>
            ) : (
              <div className="transition-opacity duration-500 ease-in-out opacity-100">
                <div>
                  <h2 className="text-3xl text-gray-950 font-bold mt-6">
                    Enter OTP
                  </h2>
                  <p className="my-3 text-md text-gray-950">
                    Enter the OTP you received to Laylaever12@hash.com
                  </p>
                </div>
                {/* OTP Form */}
                <form>
                  <div className="space-y-4">
                    <PinInput
                      values={values}
                      onChange={(value, index, values) => setValues(values)}
                      size="lg"
                      type="number"
                      autoFocus
                      autoTab
                      inputClassName="custom-pin-input"
                      // inputStyle={{
                      //   width: "4.2rem",
                      //   height: "4rem",
                      //   "&:focus": {
                      //     borderColor: "red",
                      //   },
                      // }}
                    />
                  </div>
                  <div className="mt-6">
                    <button className="w-full h-16 bg-violet-800 text-gray-50 text-md font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      Verify
                    </button>
                  </div>
                </form>
                {/* timer */}
                <p className="text-center text-gray-500 mt-8">0:{timer} sec</p>
                <div className="mt-8 text-sm text-center text-gray-400">
                  <span>Didn’t receive the OTP? </span>
                  <Link className="text-purple-800 hover:underline">
                    Click to Resend
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
