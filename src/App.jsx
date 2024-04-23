import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Login from "./pages/Auth/Login/Login";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import Logout from "./pages/Auth/Logout/Logout";
import Account from "./pages/Account/Account";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import AccountList from "./pages/Account/ListOfAccounts";
import ChangePassword from "./pages/Account/ChangePassword";
// subpages
import CreateNewAccount from "./pages/Account/CreateNew/CreateNewAccount";
// Modal
// contexts
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";
// helpers
import { toggleMobileView } from "./helpers/toggleMobileView";

const App = () => {
  // react query
  const client = new QueryClient();

  // hide sidebar on mobile
  window.addEventListener("resize", toggleMobileView);
  useEffect(toggleMobileView, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          {/* component code */}
          <div className="site-container">
            <div className="notif"></div>

            <UserProvider>
              {/* sidebar */}
              <Sidebar />
              {/* main */}
              <div className="main">
                <Routes>
                  {/* auth pages */}
                  <Route path="/" exact element={<Login />} />

                  {/* dashboad pages */}
                  <Route path="/home" element={<Home />} />
                  <Route exact path="/account" element={<Account />}>
                    <Route
                      path="/account/new-account"
                      element={<CreateNewAccount />}
                    />
                    <Route
                      path="/account/list-of-accounts"
                      element={<AccountList />}
                    />
                  </Route>
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/auth/logout" element={<Logout />} />
                  <Route path="/account-details" element={<AccountDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </UserProvider>
          </div>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
