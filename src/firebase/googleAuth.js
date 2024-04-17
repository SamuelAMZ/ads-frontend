import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { saveCredentials } from "./saveCredentials";

const googleProvider = new GoogleAuthProvider();

export const signinWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    return result.user;
  } catch (e) {
    console.log(e);
    // throw error to the parent component
    throw e;
  }
};
