import { Link } from "react-router-dom";

// toggle upload file modal
import { useEffect } from "react";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  toggleMobileViewBtn,
  toggleSideBar,
} from "../../helpers/toggleMobileView";

const Header = ({ page }) => {
  const handleClick = () => {
    toggleSideBar();
  };

  window.addEventListener("resize", toggleMobileViewBtn);
  useEffect(toggleMobileViewBtn, []);

  return (
    <div className="header-container">
      <div className="header-elm">
        <div className="page-title">
          <label
            onClick={handleClick}
            htmlFor="openSidebar"
            id="openSidebar"
            className="btn drawer-button"
          >
            <HiOutlineMenuAlt2 />
          </label>
          <h2 className="title">{page}</h2>
        </div>
        {/* new btn */}
        <div className="right-side">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label className="user-icon m-1" tabIndex={0}>
              <div className="user-img">
                <img src="/img/default-user.png" alt="user image" />
              </div>

              <MdKeyboardArrowDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/account"}>My Account</Link>
              </li>
              <li>
                <a href="/auth/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
