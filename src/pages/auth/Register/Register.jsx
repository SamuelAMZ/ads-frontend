import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// firebase utils
import { signInWithCredentials } from "../../../firebase/credentialsAuth";

// custom hooks
import notif from "../../../helpers/notif";
import { delay } from "../../../helpers/delay";
import { FirebaseAuth as auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const pwdTarget = useRef(null);

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

      if (userCredential) {
        notif("signin successfully");
        setIsLoading(false);
        await delay(1500);
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
  }, []);

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
