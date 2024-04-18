import { FirebaseAuth as auth } from "./config";

export const getProfileData = () => {
  const user = auth.currentUser;
  if (user !== null) {
    // console.log("User data: ", user);
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const phoneNumber = user.phoneNumber;
    const formatDate = new Date(user.metadata.creationTime).toLocaleString();

    const data = {
      displayName,
      email,
      photoURL,
      emailVerified,
      phoneNumber,
      ...user.metadata,
      formatDate,
    };

    return data;
  }
};
