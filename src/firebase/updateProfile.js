import { updateProfile } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

export const updateUserPassword = async (data) => {
  try {
    const res = await updateProfile(auth.currentUser, { ...data });
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
