import { Link } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// icons
import { BsClipboardData } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPersonWorkspace } from "react-icons/bs";
import { GoNumber } from "react-icons/go";

// helpers
import postReq from "../../helpers/postReq";

// react query
import { useQuery } from "react-query";

// loading effect
import {AnalyticsLoadingSkeleton} from "./LoadingEffect";

const Home = () => {

  // get analytics
  const handleAnalyticsLoading = async (e) => {
    // send req
    return await postReq({ home: "home" }, "/api/analytics");
  };

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    isError,
    isSuccess,
  } = useQuery(["analytics"], handleAnalyticsLoading, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  return (
    <>
      {/* <Auth /> */}
      <Header page={"Home"} />
      {/* home */}
      <div className="centerer home-container">
        {/* remove this line */}
        <div className="stats-container-jd">
          <div className="stat-jd">
            <span>
              Admins accounts:{" "}
              {analyticsData?.analytic?.totalAdminsAccounts || (
                <AnalyticsLoadingSkeleton />
              )}
            </span>
            <AiOutlineUser />
          </div>
          <div className="stat-jd">
            <span>
              Candidates accounts:{" "}
              {analyticsData?.analytic?.totalCandidatesAccounts || (
                <AnalyticsLoadingSkeleton />
              )}
            </span>
            <HiOutlineUserGroup />
          </div>
          <div className="stat-jd">
            <span>
              Candidates work here:{" "}
              {analyticsData?.analytic?.totalWorkHereAccounts || (
                <AnalyticsLoadingSkeleton />
              )}
            </span>
            <BsPersonWorkspace />
          </div>
          <div className="stat-jd">
            <span>
              Number of Company:{" "}
              {analyticsData?.analytic?.distinctCompanies || (
                <AnalyticsLoadingSkeleton />
              )}
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
