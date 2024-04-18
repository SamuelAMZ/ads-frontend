import { useState, useEffect, useRef } from "react";

// navigation hook

// helpers
import notif from "../../../helpers/notif";
import { delay } from "../../../helpers/delay";

// react query

import { loginWithCredentials } from "../../../firebase/credentialsAuth";
import { signinWithGoogle } from "../../../firebase/googleAuth";
import { useCurrentUser } from "../../../hooks/useCurrentUser";


// env file

const CreateNewAccount = () => {
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

  // login with google
  const googleLogin = async () => {
    setMakeRedirection(false);
    try {
      const serverAnswer = await signinWithGoogle();

      if (serverAnswer.code === "bad") {
        notif(serverAnswer.message);
      }

      if (serverAnswer.message === "ok") {
        notif("log in successfully");
      }

      // redirect to profile
      notif("login successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  // login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setMakeRedirection(false);

    // chgeck if all inputs are filled
    if (!loginData.email || !loginData.password) {
      return notif("some inputs are empty");
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
        delay(1500).then(() => {
          // redirect to profile
          window.location.href = "/account";
        });
      }
      
      setIsLoading(false);
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
      window.location.href = "/dashboard";
    }
    if (error) {
      // send notificaiton
      console.log(error);
    }
  });

  return (
    <div className="your-account">
      {/* create user */}
      <div className="change change-name">
        <label htmlFor="keyword">Create New Admin User</label>
        <form onSubmit={handleLogin}>
          <input
            id="username"
            type="text"
            placeholder="username"
            className="input input-bordered w-full"
            value={loginData.email}
            required
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />
          <input
            id="email"
            type="email"
            placeholder="email"
            className="input input-bordered w-full"
            value={loginData.email}
            required
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />
          {isLoading && (
            <button className="btn btn-primary loading">processing...</button>
          )}
          {!isLoading && <button className="btn btn-primary">Create</button>}
        </form>
      </div>
    </div>
  );
};

export default CreateNewAccount;
