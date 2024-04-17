import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// firebase utils
import { signInWithCredentials } from "../../../firebase/credentialsAuth";

// custom hooks
import notif from "../../../helpers/notif";
import { delay } from "../../../helpers/delay";

// hooks
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const Register = () => {
  const pwdTarget = useRef(null);
  const [makeRedirection, setMakeRedirection] = useState(true);

  // state for password display
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // signin data
  const [registrationData, setRegistrationData] = useState({
    name: "",
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
  const handleRegistration = async (e) => {
    e.preventDefault();
    setMakeRedirection(false);

    // chgeck if all inputs are filled

    if (registrationData.name === "") {
      notif("Name is required");
      return;
    }

    if (registrationData.email === "") {
      notif("Email is required");
      return;
    }

    if (registrationData.password === "") {
      notif("Password is required");
      return;
    }

    // loader
    setIsLoading(true);

    // register the user
    try {
      const userCredential = await signInWithCredentials(
        registrationData.email,
        registrationData.password
      );

      // send request to the server
      const credentials = {
        uid: userCredential.uid,
        email: userCredential.email,
        name: registrationData.name,
      };
      if (credentials) {
        notif("signin successfully");
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
    }
  };

  const [user, loading, error] = useCurrentUser();
  // check if user is logged in and redirect
  useEffect(() => {
    if (
      makeRedirection &&
      user &&
      !loading &&
      window.location.pathname === "/auth/register"
    ) {
      notif("Already logged in.");
      delay(1500).then(() => {
        window.location.href = "/";
      });
    }
    if (error) {
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
          <h2>Sign in to the dashboard</h2>
        </div>

        {/* form */}
        <form onSubmit={handleRegistration}>
          <div className="inputs">
            <label htmlFor="email">Username</label>
            <input
              id="name"
              type="text"
              placeholder="Username"
              className="input input-bordered input-primary w-full"
              value={registrationData.name}
              required
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full"
              value={registrationData.email}
              required
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
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
              value={registrationData.password}
              required
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  password: e.target.value,
                })
              }
            />

            {isHidden && registrationData.password ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-10 cursor-pointer text-black"
                onClick={togglePassword}
              />
            ) : null}

            {!isHidden && registrationData.password ? (
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
          <span> Already have an account?</span>
          <Link to="/auth/login" className="hover:text-[#5ecac3]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
