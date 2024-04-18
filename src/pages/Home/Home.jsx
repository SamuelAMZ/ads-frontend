import { Link } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// icons
import { BsClipboardData } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPersonWorkspace } from "react-icons/bs";
import { GoNumber } from "react-icons/go";

// loading effect
// import {AnalyticsLoadingSkeleton} from "./LoadingEffect";

const Home = () => {

  return (
    <>
      <Header page={"Home"} />
      {/* home */}
      <div className="centerer home-container">
        {/* remove this line */}
        <div className="stats-container-jd">
          <div className="stat-jd">
            <span>
              Admins accounts:{" "}
              5
            </span>
            <AiOutlineUser />
          </div>
          <div className="stat-jd">
            <span>
              Candidates accounts:{" "}
              10
            </span>
            <HiOutlineUserGroup />
          </div>
          <div className="stat-jd">
            <span>
              Candidates work here:{" "}
              55
            </span>
            <BsPersonWorkspace />
          </div>
          <div className="stat-jd">
            <span>
              Number of Company:{" "}
              88
            </span>
            <GoNumber />
          </div>
        </div>

        {/* quick links */}
        <h3 className="quick-link-title">Quick Links</h3>
        <div className="quick-links stats-container-jd">
          <Link to="/user-data">
            <div className="stat-jd">
              <div>
                <p>Users data</p>
                <p className="desc">Visit and manage your user records.</p>
              </div>
              <BsClipboardData />
            </div>
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default Home;
