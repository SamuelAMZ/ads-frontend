import { updateEmail, sendEmailVerification } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

export const updateEmailAddress = async (newMail) => {
  try {
    const res = await updateEmail(auth.currentUser, newMail);
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendEmailVerificationToUser = async () => {
  try {
    const res = await sendEmailVerification(auth.currentUser);
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
