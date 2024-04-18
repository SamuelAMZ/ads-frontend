import { useState } from "react";
// import { SubmitBtn } from "../../../components/SubmitBtn/Btn";
import { Link } from "react-router-dom";

// firebase auth comps
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseAuth as auth } from "../../../firebase/config";

// custom hooks
import notif from "../../../helpers/notif";

export const ResetPassword = () => {
  const [userRegistrationData, setUserRegistrationData] = useState({
    email: "",
  });
  const [operationLoading, setOperationLoading] = useState(false);

  // reset password func
  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    // check if all inputs are filled
    if (!userRegistrationData.email) {
      console.log("email input is empty");
      // return notif("email input is empty");
    }

    setOperationLoading(true);

    try {
      const result = await sendPasswordResetEmail(
        auth,
        userRegistrationData.email
      );

      console.log(result, "result");

      // notif("reset email sent successfully");
      setOperationLoading(false);

      // redirect to login page
      notif("Password reset successfully");
      window.location.href = "/auth/login";
    } catch (error) {
      console.log(error.message);
      notif(
        error.message
          .replace("Firebase:", "")
          .replace("Error", "")
          .replace("(", "")
          .replace(")", "")
          .replace("auth", "")
          .replace("/", "")
          .replaceAll("-", " ")
      );
      setOperationLoading(false);
    }
  };

  return (
    <div className="text-kalami-dark-white-100 clonegpt-login-container auth">
      {/* clone-auth-header */}
      <div className="clonegpt-form-wrapper max-w-[95%]">
        {/* header */}
        <div className="auth-header flex flex-col gap-5 items-center">
          <div className="text-center flex flex-col items-center gap-2">
            <Link to="/">
              <img src="/assets/logo.png" />
            </Link>
            <h2>Reset Password</h2>
          </div>
        </div>

        {/* form */}
        <form onSubmit={resetPasswordHandler}>
          <div className="clone-form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              id="email"
              type="text"
              className="input input-bordered w-full"
              placeholder="email"
              value={userRegistrationData.email}
              onChange={(e) =>
                setUserRegistrationData({
                  ...userRegistrationData,
                  email: e.target.value,
                })
              }
            />
          </div>

          {operationLoading ? (
            <button className="opacity-80	hover:opacity-40 cursor-not-allowed transition-all ease-in duration-300">
              Processing...
            </button>
          ) : (
            <button className="hover:opacity-70 text-[#000] transition-all ease-in duration-300">
              Reset Password
            </button>
          )}
          <Link to="/auth/login" className=" w-full mt-1">
            <div className="text-center  text-[#fdc101] w-full">
              Back to login
            </div>
          </Link>
        </form>

        <div className="clone-more-options">
          <div>
            Do not have an account?{" "}
            <p className="text-primary">
              <Link to="/auth/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
