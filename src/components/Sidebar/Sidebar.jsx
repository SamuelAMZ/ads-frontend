import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
// icons
import { AiOutlineHome } from "react-icons/ai";
("react-icons/tb");
import { HiOutlineLogout } from "react-icons/hi";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useCurrentUser } from "../../hooks/useCurrentUser";
//helper
import { closeSideBar } from "../../helpers/toggleMobileView";

// context

const Sidebar = () => {
  // loaction
  const location = useLocation();
  const [user] = useCurrentUser();

  // current user

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/auth/") ||
      location.pathname.includes("/404")
    ) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/"}>Logo</Link>
              <button onClick={closeSideBar} className="btn close-sidebar">
                <BsBoxArrowLeft />
              </button>
            </div>

            {/* menu elements */}
            <ul className="menu-container">
              {/* login user box */}
              <Link to={"/account"}>
                <li className="user-box">
                  <div className="user-img">
                    <img
                      src={user?.photoURL ? user.photoURL : "/img/default-user.png"}
                      alt="user image"
                    />
                  </div>
                  <div className="user-details">
                    <h3 className="truncate max-w-[170px]">{user?.displayName || user?.email}</h3>
                    <p>Admin</p>
                  </div>
                </li>
              </Link>
              {/* separator
              <span className="seperator-element"></span> */}
              <Link to={"/"}>
                <li className={location.pathname === "/" ? "active-menu" : ""}>
                  <AiOutlineHome />
                  <p>Dashboard</p>
                </li>
              </Link>

              {/* logout */}
              <Link to={"/auth/logout"}>
                <li>
                  <HiOutlineLogout />
                  <p>Logout</p>
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
