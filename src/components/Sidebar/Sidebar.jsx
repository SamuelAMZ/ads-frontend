import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";

// component

// icons
import { AiOutlineHome } from "react-icons/ai";
("react-icons/tb");
import { HiOutlineLogout } from "react-icons/hi";
import { BsBoxArrowLeft } from "react-icons/bs";

//helper
import { closeSideBar } from "../../helpers/toggleMobileView";

// context
import UserContext from "../../contexts/UserContext";

const Sidebar = () => {
  // loaction
  const location = useLocation();

  // current user
  const { login } = useContext(UserContext);

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/404")) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* <Auth /> */}
      {allowed && (
        <>
          <div className="sidebar">
            {/* heading */}
            <div className="heading">
              <Link to={"/home"}>
                Logo
              </Link>
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
                    <img src="/img/default-user.png" alt="user image" />
                  </div>
                  <div className="user-details">
                    <h3>{login?.user.name}</h3>
                    <p>Admin</p>
                  </div>
                </li>
              </Link>
              {/* separator
              <span className="seperator-element"></span> */}
              <Link to={"/home"}>
                <li
                  className={location.pathname === "/home" ? "active-menu" : ""}
                >
                  <AiOutlineHome />
                  <p>Dashboard</p>
                </li>
              </Link>

              {/* logout */}
              <Link to={"/logout"}>
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
