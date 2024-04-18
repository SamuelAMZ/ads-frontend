import { updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    const res = await updatePassword(user, newPassword);
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendPasswordResetEmailToUser = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
