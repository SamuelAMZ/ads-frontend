import { useState, useEffect } from "react";
// import { SubmitBtn } from "../../../components/SubmitBtn/Btn";
import { Link } from "react-router-dom";

// firebase auth comps
import { logoutFirebase } from "../../../firebase/credentialsAuth";

import { useCurrentUser } from "../../../hooks/useCurrentUser";

import { delay } from "../../../helpers/delay";
import notif from "../../../helpers/notif";

export const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    // logout
    const isLogout = await logoutFirebase();

    if (isLogout) {
      setIsLoading(false);
      notif("You have been logged out successfully");
      delay(2000).then(() => {
        window.location.href = "/auth/login";
      });
    }
  };

  // check if user is logged in
  const [user, loading, error] = useCurrentUser();
  useEffect(() => {
    // check backward navigation
    // login before logout
    if (!user && !loading && window.location.pathname === "/auth/logout") {
      window.location.href = "/auth/login";
    }
    if (error) {
      // send notificaiton
      console.log(error);
    }
  });

  return (
    <div className="login-f">
      {/* clone-auth-header */}
      <div className="login-container">
        {/* header */}
        <div className="heading">
          {/* logo */}
          <h1>Admin</h1>

          <p className="mt-1.5 text-center">
            Are you sure you want to log out? Logging out will end your current
            session.
          </p>
          {/* login text */}
        </div>

        {isLoading ? (
          <button
            onClick={handleLogout}
            className="cursor-not-allowed opacity-80 btn btn-primary"
          >
            Processing...
          </button>
        ) : (
          <button onClick={handleLogout} className="btn btn-primary w-full">
            Logout
          </button>
        )}
        <div className="mt-4 w-full mx-auto text-center flex items-center gap-2">
          <Link
            to="/"
            className="hover:text-[#5ecac3] w-full mx-auto text-center"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
