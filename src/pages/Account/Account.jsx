import { Link, useLocation } from "react-router-dom";

// componenets
import Header from "../../components/Header/Header";
// env file

// icons
import { AiOutlineSetting } from "react-icons/ai";

// icons
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
// Component children
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Account = () => {
  const location = useLocation();
  const [user] = useCurrentUser();

  const name = user?.displayName;
  const email = user?.email;
  const role = "admin";
  const createdAt =
    new Date(user?.metadata.creationTime).toLocaleString() || "18/04/2024";

  return (
    <>
      <Header page={"Account"} />
      <div className="centerer account-container">
        {/* your account  */}
        {location.pathname === "/account" && (
          <div className="account">
            <div className="quick-links stats-container-jd account-quick-links">
              <Link to="/change-password">
                <div className="stat-jd">
                  <div>
                    <p>Reset Password</p>
                    <p className="desc">Change your password</p>
                  </div>
                  <AiOutlineSetting />
                </div>
              </Link>
              <Link to="/account/list-of-accounts">
                <div className="stat-jd">
                  <div>
                    <p>Accounts</p>
                    <p className="desc">List of dashboard users</p>
                  </div>
                  <AiOutlineUser />
                </div>
              </Link>
              <Link to="/auth/logout">
                <div className="stat-jd">
                  <div>
                    <p>Logout</p>
                    <p className="desc">Logout from your current session</p>
                  </div>
                  <HiOutlineLogout />
                </div>
              </Link>
            </div>

            <div className="account-details">
              {/* {login && ( */}
              <ul>
                {name && (
                  <li>
                    <span>Name:</span> {name}
                  </li>
                )}
                <li>
                  <span>Email:</span> {email}
                </li>
                <li>
                  <span>Role:</span> {role}
                </li>
                <li>
                  <span>Registration Date:</span> {createdAt}
                </li>
              </ul>
              {/* )} */}
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export default Account;
