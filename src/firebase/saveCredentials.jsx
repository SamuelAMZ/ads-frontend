import postReq from "../helpers/postReq";

export const saveCredentials = async (userData, url) => {
  try {
    const serverAnswer = await postReq(userData, url);

    return serverAnswer;
  } catch (error) {
    console.log(error);
  }
};
