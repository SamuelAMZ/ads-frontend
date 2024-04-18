import { useEffect, useState } from "react";

// helper
import notif from "../../helpers/notif";
// context
// navigation hook
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { updateUserPassword } from "../../firebase/updatePassword";
import { logoutFirebase } from "../../firebase/credentialsAuth";
import { delay } from "../../helpers/delay";
// components
import Header from "../../components/Header/Header";

const ChangePassword = () => {
  const [data, setData] = useState({});
  const [pwdMatchedWarnings, setPwdMatchedWarnings] = useState({
    matched: false,
    notify: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useCurrentUser();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      notif("You are not logged in", "error");
      setIsLoading(false);
      return;
    }

    if (!pwdMatchedWarnings.matched) {
      notif("Passwords do not match", "error");
      setIsLoading(false);
      return;
    }

    const res = await updateUserPassword(data.new_password);
    if (res) {
      notif("Password updated successfully", "success");
      setIsLoading(false);
      await delay(1000);
      await logoutFirebase();
      return;
    }
  };

  // handling registration function
  const handleInputChange = (e, input_name) => {
    if (input_name === "password") {
      setData({
        ...data,
        ["password"]: e.target.value,
      });
    }
    if (input_name === "new_password") {
      setData({
        ...data,
        ["new_password"]: e.target.value,
      });
    }
    if (input_name === "repeat_new_password") {
      setData({
        ...data,
        ["repeat_new_password"]: e.target.value,
      });
    }
  };

  // check if password match
  useEffect(() => {
    const { new_password, repeat_new_password, password } = data;

    if (!new_password && !repeat_new_password && !password) {
      setPwdMatchedWarnings({ matched: false, notify: false });
      return;
    }
    if (!new_password || !repeat_new_password) {
      setPwdMatchedWarnings({ matched: false, notify: false });
      return;
    }
    if (!new_password && !repeat_new_password) {
      setPwdMatchedWarnings({ matched: false, notify: false });
      return;
    }
    if (new_password === repeat_new_password) {
      setPwdMatchedWarnings({ matched: true, notify: false });
    } else {
      setPwdMatchedWarnings({ matched: false, notify: true });
    }
  }, [data?.new_password, data?.repeat_new_password]);

  return (
    <>
      <Header page={"Change Password"} />

      <div className="your-account">
        {/* create user */}
        <div className="change change-name">
          <label htmlFor="keyword">Change password</label>
          <form onSubmit={handlePasswordChange}>
            <input
              id="password"
              type="password"
              placeholder="Actual Password"
              className="input input-bordered input-primary w-full"
              required
              onChange={(e) => handleInputChange(e, "password")}
            />

            <input
              id="new-password"
              type="password"
              placeholder="Your New Password"
              className="input input-bordered input-primary w-full"
              required
              onChange={(e) => handleInputChange(e, "new_password")}
            />
            <input
              id="repeat-new-password"
              type="password"
              placeholder="Repeat New Password"
              className="input input-bordered input-primary w-full"
              required
              onChange={(e) => handleInputChange(e, "repeat_new_password")}
            />

            {!pwdMatchedWarnings.matched && pwdMatchedWarnings.notify && (
              <span className="error-input">New Password do not match</span>
            )}
            {isLoading && (
              <button className="btn btn-primary loading">processing...</button>
            )}
            {!isLoading && (
              <button
                disabled={
                  !pwdMatchedWarnings.matched && pwdMatchedWarnings.notify
                }
                className="btn"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
