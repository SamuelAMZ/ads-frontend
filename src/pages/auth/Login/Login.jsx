import { useEffect, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
// firebase utils
import { loginWithCredentials } from "../../../firebase/credentialsAuth";

// custom hooks
import notif from "../../../helpers/notif";
import { delay } from "../../../helpers/delay";

import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const Login = () => {
  const pwdTarget = useRef(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [makeRedirection, setMakeRedirection] = useState(true);
  // login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // display password
  const togglePassword = () => {
    if (pwdTarget.current) {
      pwdTarget.current.type =
        pwdTarget.current.type == "text" ? "password" : "text";
    }
    setIsHidden((prev) => !prev);
  };

  // login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setMakeRedirection(false);

    // chgeck if all inputs are filled
    if (loginData.email === "") {
      notif("Email is required");
      return;
    }

    if (loginData.password === "") {
      notif("Password is required");
      return;
    }

    // loader
    setIsLoading(true);

    // register the user
    try {
      const credentials = await loginWithCredentials(
        loginData.email,
        loginData.password
      );

      if (credentials) {
        notif("login successfully");
        setIsLoading(false);
        delay(1500).then(() => {
          // redirect to profile
          window.location.href = "/account";
        });
      }
    } catch (error) {
      console.log(error.message);
      notif(
        error.message
          .replace("Firebase:", "")
          .replace("Error", "")
          .replace("(", "")
          .replace(")", "")
          .replace("auth", "")
          .replace("/", "")
          .replaceAll("-", " ")
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // check if user is logged in
  const [user, loading, error] = useCurrentUser();
  useEffect(() => {
    // check backward navigation
    // if already login, redirect  to the dashboard
    if (
      makeRedirection &&
      !loading &&
      user &&
      window.location.pathname === "/auth/login"
    ) {
      notif("Already logged in. Redirecting to the dashboard...");
      delay(1500).then(() => {
        window.location.href = "/";
      });
    }
    if (error) {
      // send notificaiton
      console.log(error);
    }
  });

  return (
    <div className="login-f">
      <div className="login-container">
        <div className="heading">
          {/* logo */}
          <h1>Admin</h1>

          {/* login text */}
          <h2>Log in to the dashboard</h2>
        </div>

        {/* form */}
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
              value={loginData.email}
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="relative inputs">
            <label htmlFor="password">Password</label>
            <input
              ref={pwdTarget}
              id="password"
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full pr-9"
              value={loginData.password}
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />

            {isHidden && loginData.password ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-10 cursor-pointer text-black"
                onClick={togglePassword}
              />
            ) : null}

            {!isHidden && loginData.password ? (
              <AiOutlineEye
                className="absolute right-3 top-10 cursor-pointer text-black"
                onClick={togglePassword}
              />
            ) : null}
          </div>

          {isLoading && (
            <button className="btn btn-primary loading">loading...</button>
          )}
          {!isLoading && <button className="btn btn-primary">Login</button>}
        </form>

        <div className="mt-4 flex items-center gap-2">
          <span> Do not have an account?</span>
          <Link to="/auth/register" className="hover:text-[#5ecac3]">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
