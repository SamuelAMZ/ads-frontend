import { deleteUser } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

export const deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    const res = await deleteUser(user);
    return res || true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
