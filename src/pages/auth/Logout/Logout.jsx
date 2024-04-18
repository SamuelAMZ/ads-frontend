import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// firebase auth comps
import { logoutFirebase } from "../../../firebase/credentialsAuth";

import { delay } from "../../../helpers/delay";
import notif from "../../../helpers/notif";

import { FirebaseAuth as auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    // logout
    const isLogout = await logoutFirebase();

    if (isLogout) {
      setIsLoading(false);
      notif("You have been logged out successfully");
      await delay(1500);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
      else if (!user) navigate("/auth/login");
    });
  }, []);

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
