import { Routes, Route } from "react-router-dom";
// css tailwind
import "./styles/tailwind.css";
// css components
import "./styles/index.min.css";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// auths
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import { Login } from "./pages/auth/Login/Login";
import { Register } from "./pages/auth/Register/Register";
import { Logout } from "./pages/auth/Logout/Logout";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import AccountList from "./pages/Account/ListOfAccounts";
import ChangePassword from "./pages/Account/ChangePassword";
// subpages
import CreateNewAccount from "./pages/Account/CreateNew/CreateNewAccount";

import { useEffect } from "react";
// helpers
import { toggleMobileView } from "./helpers/toggleMobileView";

import { UserProvider } from "./contexts/UserContext";

import { FirebaseAuth as auth } from "./firebase/config";
import { useNavigate } from "react-router-dom";

const App = () => {
  // react query
  const navigate = useNavigate();
  const client = new QueryClient();

  // hide sidebar on mobile
  window.addEventListener("resize", toggleMobileView);
  useEffect(toggleMobileView, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("/auth/login");
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <>
          <UserProvider>
            <div className="site-container">
              <div className="notif"></div>
              <Sidebar />
              <div className="main">
                <Routes>
                  {/* auth pages */}
                  <Route path="/" element={<Home />} />

                  {/* dashboad pages */}
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="auth/logout" element={<Logout />} />
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
                  <Route path="/account-details" element={<AccountDetails />} />
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </UserProvider>
        </>
      </QueryClientProvider>
    </>
  );
};

export default App;
